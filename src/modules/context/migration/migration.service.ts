import { Injectable } from '@nestjs/common';

import { DomainEmployeeService } from '../../domain/employee/employee.service';
import { DomainDepartmentService } from '../../domain/department/department.service';
import { DomainPositionService } from '../../domain/position/position.service';
import { DomainRankService } from '../../domain/rank/rank.service';
import { DomainEmployeeDepartmentPositionService } from '../../domain/employee-department-position/employee-department-position.service';
import { DomainEmployeeRankHistoryService } from '../../domain/employee-rank-history/employee-rank-history.service';
import { EmployeeResponseDto } from './dto/employee-response.dto';
import axios from 'axios';
import { DepartmentResponseDto } from './dto/department-response.dto';
import { PositionResponseDto } from './dto/position-response.dto';
import { RankResponseDto } from './dto/rank-response.dto';
import { DomainUserService } from '../../domain/user/user.service';
import { EmployeeStatus, Gender } from '../../../../libs/common/enums';

@Injectable()
export class MigrationService {
    constructor(
        private readonly employeeService: DomainEmployeeService,
        private readonly departmentService: DomainDepartmentService,
        private readonly positionService: DomainPositionService,
        private readonly rankService: DomainRankService,
        private readonly employeeDepartmentPositionService: DomainEmployeeDepartmentPositionService,
        private readonly employeeRankHistoryService: DomainEmployeeRankHistoryService,
        private readonly userService: DomainUserService,
    ) {}

    async onApplicationBootstrap() {
        // this.migrate();
    }

    async getEmployees(): Promise<EmployeeResponseDto[]> {
        const response = await axios.get(`${process.env.METADATA_MANAGER_URL}/api/employees?detailed=true`);
        const employees: EmployeeResponseDto[] = response.data.map((employee) => new EmployeeResponseDto(employee));
        return employees;
    }

    async getDepartments(): Promise<DepartmentResponseDto[]> {
        const response = await axios.get(`${process.env.METADATA_MANAGER_URL}/api/departments?hierarchy=true`);
        const departments: DepartmentResponseDto[] = response.data.map(
            (department) => new DepartmentResponseDto(department),
        );
        return departments;
    }

    async getPositions(): Promise<PositionResponseDto[]> {
        const response = await axios.get(`${process.env.METADATA_MANAGER_URL}/api/positions`);
        const positions: PositionResponseDto[] = response.data.map((position) => new PositionResponseDto(position));
        return positions;
    }

    async getRanks(): Promise<RankResponseDto[]> {
        const response = await axios.get(`${process.env.METADATA_MANAGER_URL}/api/ranks`);
        const ranks: RankResponseDto[] = response.data.map((rank) => new RankResponseDto(rank));
        return ranks;
    }

    async migrate(): Promise<void> {
        const employees: EmployeeResponseDto[] = await this.getEmployees();
        const departments: DepartmentResponseDto[] = await this.getDepartments();
        const positions: PositionResponseDto[] = await this.getPositions();
        const ranks: RankResponseDto[] = await this.getRanks();
        // 기본 정보들 입력 후
        for (const rank of ranks) {
            const existingRank = await this.rankService.findByCode(rank.rank_code);
            if (existingRank) {
                console.log(`${rank.rank_name} 직급은 이미 존재합니다.`);
                continue;
            }
            await this.rankService.save({
                rankName: rank.rank_name,
                rankCode: rank.rank_code,
                level: rank.level,
            });
        }

        for (const position of positions) {
            const existingPosition = await this.positionService.findByCode(position.position_code);
            if (existingPosition) {
                console.log(`${position.position_title} 직책은 이미 존재합니다.`);
                continue;
            }
            await this.positionService.save({
                positionTitle: position.position_title,
                positionCode: position.position_code,
                hasManagementAuthority: position.level >= 5,
                level: position.level,
            });
        }

        const insertDepartments = async () => {
            // 저장된 부서 ID를 추적하기 위한 Map (MongoDB ID -> TypeORM UUID)
            const savedDepartmentIds = new Map<string, string>();

            // DFS(깊이우선탐색)로 부서 계층구조를 순회하며 저장
            const saveDepartmentHierarchy = async (
                department: any,
                parentUuid: string | null = null,
            ): Promise<void> => {
                try {
                    const existingDepartment = await this.departmentService.findByCode(department.department_code);
                    if (existingDepartment) {
                        console.log(`${department.department_name} 부서는 이미 존재합니다.`);
                    } else {
                        const savedDepartment = await this.departmentService.save({
                            departmentName: department.department_name,
                            departmentCode: department.department_code,
                            parentDepartmentId: parentUuid,
                            order: department.order || 0,
                        });
                        savedDepartmentIds.set(department._id, savedDepartment.id);
                    }
                    // 현재 부서 저장

                    // MongoDB ID -> TypeORM UUID 매핑 저장

                    console.log(
                        `부서 저장 완료: ${department.department_name} (${department.department_code}) - Parent: ${
                            parentUuid || 'ROOT'
                        }`,
                    );

                    // 하위 부서들을 재귀적으로 저장
                    if (department.child_departments && department.child_departments.length > 0) {
                        for (const childDepartment of department.child_departments) {
                            await saveDepartmentHierarchy(childDepartment, savedDepartmentIds.get(department._id));
                        }
                    }
                } catch (error) {
                    console.error(`부서 저장 실패: ${department.department_name}`, error);
                }
            };

            // 최상위 부서들부터 시작 (parent_department_id가 null인 부서들)
            const rootDepartments = departments;

            for (const rootDepartment of rootDepartments) {
                await saveDepartmentHierarchy(rootDepartment);
            }

            console.log(`총 ${savedDepartmentIds.size}개 부서 저장 완료`);
            return savedDepartmentIds;
        };

        // 부서 저장 실행
        const departmentIdMap = await insertDepartments();

        for (const employee of employees) {
            let existingEmployee = await this.employeeService.findByEmployeeNumber(employee.employee_number);

            let rank = null,
                position = null,
                department = null;

            if (employee.rank) {
                rank = await this.rankService.findByCode(employee.rank.rank_code);
            }

            if (existingEmployee) {
                existingEmployee = await this.employeeService.update(existingEmployee.id, {
                    status: employee.status as EmployeeStatus,
                    currentRankId: rank?.id,
                    hireDate: employee.hire_date,
                    dateOfBirth: employee.date_of_birth,
                    gender: employee.gender as Gender,
                });
            } else {
                existingEmployee = await this.employeeService.save({
                    employeeNumber: employee.employee_number,
                    name: employee.name,
                    email: employee.email,
                    phoneNumber: employee.phone_number || '',
                    status: employee.status as EmployeeStatus,
                    currentRankId: rank?.id,
                    hireDate: employee.hire_date,
                    dateOfBirth: employee.date_of_birth,
                    gender: employee.gender as Gender,
                });
            }

            if (employee.position) {
                position = await this.positionService.findByCode(employee.position.position_code);
            }

            if (employee.department) {
                department = await this.departmentService.findByCode(employee.department.department_code);
            }

            const user = await this.userService.findByEmployeeNumber(employee.employee_number);
            if (!user) {
                console.log(`${employee.name} 직원은 유저 정보가 없습니다.`);
            } else {
                existingEmployee.password = user.password;
                existingEmployee.isInitialPasswordSet = user.isInitialPasswordSet;
            }

            const savedEmployee = await this.employeeService.save(existingEmployee);

            const existingEmployeeDepartmentPosition = await this.employeeDepartmentPositionService.findOne({
                where: {
                    employeeId: existingEmployee.id,
                },
            });

            if (existingEmployeeDepartmentPosition) {
                await this.employeeDepartmentPositionService.update(existingEmployeeDepartmentPosition.id, {
                    departmentId: department?.id,
                    positionId: position?.id,
                });
            }

            if (!existingEmployeeDepartmentPosition && department && position) {
                await this.employeeDepartmentPositionService.save({
                    employeeId: savedEmployee.id,
                    departmentId: department?.id,
                    positionId: position?.id,
                });
            }
        }
    }
}

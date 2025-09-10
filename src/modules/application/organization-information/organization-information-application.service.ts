import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { OrganizationContextService } from '../../context/organization-management/organization-management-context.service';
import {
    EmployeeRequestDto,
    EmployeeResponseDto,
    EmployeesRequestDto,
    EmployeesResponseDto,
    DepartmentDetailDto,
    PositionDetailDto,
    RankDetailDto,
    DepartmentHierarchyRequestDto,
    DepartmentHierarchyResponseDto,
    DepartmentWithEmployeesDto,
} from './dto';
import { Employee, Department, Position, Rank } from '../../../../libs/database/entities';

@Injectable()
export class OrganizationInformationApplicationService {
    constructor(private readonly organizationContextService: OrganizationContextService) {}

    async 직원정보를_조회한다(requestDto: EmployeeRequestDto): Promise<EmployeeResponseDto> {
        const { employeeId, employeeNumber, withDetail } = requestDto;

        // employeeId와 employeeNumber 중 하나는 반드시 있어야 함
        if (!employeeId && !employeeNumber) {
            throw new BadRequestException('직원 ID 또는 사번 중 하나는 반드시 필요합니다.');
        }

        let employee: Employee;

        if (employeeId) {
            employee = await this.organizationContextService.직원_ID값으로_직원정보를_조회한다(employeeId);
        } else if (employeeNumber) {
            employee = await this.organizationContextService.직원_사번으로_직원정보를_조회한다(employeeNumber);
        }
        if (!employee) {
            throw new NotFoundException('해당 직원 정보를 찾을 수 없습니다.');
        }

        // 기본 응답 데이터 구성
        let response: EmployeeResponseDto = {
            id: employee.id,
            name: employee.name,
            email: employee.email,
            employeeNumber: employee.employeeNumber,
            phoneNumber: employee.phoneNumber,
            dateOfBirth: employee.dateOfBirth,
            gender: employee.gender,
            hireDate: employee.hireDate,
            status: employee.status,
        };

        // withDetail이 true인 경우 상세 정보 추가
        if (withDetail) {
            const details = await this.organizationContextService.직원의_부서_직책_직급을_조회한다(employee);
            response.department = this.부서_정보를_매핑한다(details.department);
            response.position = this.직책_정보를_매핑한다(details.position);
            response.rank = this.직급_정보를_매핑한다(details.rank);
        }

        return response;
    }

    async 여러_직원정보를_조회한다(requestDto: EmployeesRequestDto): Promise<EmployeesResponseDto> {
        const { employeeIds, employeeNumbers, withDetail = false, includeTerminated = false } = requestDto;

        let employees: Employee[] = [];

        try {
            // 직원 ID 배열이 제공된 경우
            if (employeeIds && employeeIds.length > 0) {
                employees = await this.organizationContextService.여러_직원_ID값으로_직원정보를_조회한다(
                    employeeIds,
                    includeTerminated,
                );
            }
            // 사번 배열이 제공된 경우
            else if (employeeNumbers && employeeNumbers.length > 0) {
                employees = await this.organizationContextService.여러_직원_사번으로_직원정보를_조회한다(
                    employeeNumbers,
                    includeTerminated,
                );
            }
            // 배열이 비어있거나 제공되지 않은 경우 전체 직원 조회
            else {
                employees = await this.organizationContextService.전체_직원정보를_조회한다(includeTerminated);
            }
        } catch (error) {
            throw new NotFoundException('직원 정보를 조회할 수 없습니다.');
        }

        // 각 직원에 대해 상세 정보를 매핑
        const employeeResponses: EmployeeResponseDto[] = [];

        // withDetail이 true인 경우 모든 직원의 상세 정보를 배치로 조회
        let detailsMap: Map<string, { department: Department; position: Position; rank: Rank }> | undefined;
        if (withDetail && employees.length > 0) {
            try {
                detailsMap = await this.organizationContextService.여러_직원의_부서_직책_직급을_일괄조회한다(employees);
            } catch (error) {
                // 상세 정보 조회 실패 시 기본 정보만 반환
            }
        }

        for (const employee of employees) {
            const response: EmployeeResponseDto = {
                id: employee.id,
                name: employee.name,
                email: employee.email,
                employeeNumber: employee.employeeNumber,
                phoneNumber: employee.phoneNumber,
                dateOfBirth: employee.dateOfBirth,
                gender: employee.gender,
                hireDate: employee.hireDate,
                status: employee.status,
            };

            // withDetail이 true이고 상세 정보가 있는 경우 추가
            if (withDetail && detailsMap) {
                const details = detailsMap.get(employee.id);
                if (details) {
                    response.department = this.부서_정보를_매핑한다(details.department);
                    response.position = this.직책_정보를_매핑한다(details.position);
                    response.rank = this.직급_정보를_매핑한다(details.rank);
                }
            }

            employeeResponses.push(response);
        }

        return {
            employees: employeeResponses,
            total: employeeResponses.length,
        };
    }

    private 부서_정보를_매핑한다(department: Department): DepartmentDetailDto | undefined {
        if (!department) return undefined;

        return {
            id: department.id,
            departmentName: department.departmentName,
            departmentCode: department.departmentCode,
            type: department.type,
            parentDepartmentId: department.parentDepartmentId,
            parentDepartmentName: department.parentDepartment?.departmentName,
            order: department.order,
        };
    }

    private 직책_정보를_매핑한다(position: Position): PositionDetailDto | undefined {
        if (!position) return undefined;

        return {
            id: position.id,
            positionTitle: position.positionTitle,
            positionCode: position.positionCode,
            level: position.level,
            hasManagementAuthority: position.hasManagementAuthority,
        };
    }

    private 직급_정보를_매핑한다(rank: Rank): RankDetailDto | undefined {
        if (!rank) return undefined;

        return {
            id: rank.id,
            rankName: rank.rankName,
            rankCode: rank.rankCode,
            level: rank.level,
        };
    }

    async 부서_계층구조별_직원정보를_조회한다(
        requestDto: DepartmentHierarchyRequestDto,
    ): Promise<DepartmentHierarchyResponseDto> {
        const {
            rootDepartmentId,
            maxDepth,
            withEmployeeDetail = false,
            includeTerminated = false,
            includeEmptyDepartments = true,
        } = requestDto;

        try {
            // Context 서비스를 통해 부서 계층구조와 직원 정보 조회
            const result = await this.organizationContextService.부서_계층구조별_직원정보를_조회한다(
                rootDepartmentId,
                maxDepth,
                withEmployeeDetail,
                includeTerminated,
                includeEmptyDepartments,
            );

            // 응답 DTO로 변환
            const departmentHierarchy = this.부서_계층구조를_응답_DTO로_변환한다(
                result.departments,
                result.employeesByDepartment,
                result.departmentDetails,
                withEmployeeDetail,
            );

            // 통계 계산
            const { totalDepartments, totalEmployees, maxDepthCalculated } =
                this.부서_계층구조_통계를_계산한다(departmentHierarchy);

            return {
                departments: departmentHierarchy,
                totalDepartments,
                totalEmployees,
                maxDepth: maxDepthCalculated,
            };
        } catch (error) {
            throw new NotFoundException('부서 계층구조 정보를 조회할 수 없습니다.');
        }
    }

    private 부서_계층구조를_응답_DTO로_변환한다(
        departments: Department[],
        employeesByDepartment: Map<string, { employees: Employee[]; departmentPositions: Map<string, any> }>,
        departmentDetails?: Map<string, { department: Department; position: Position; rank: Rank }[]>,
        withEmployeeDetail = false,
        currentDepth = 0,
    ): DepartmentWithEmployeesDto[] {
        const result: DepartmentWithEmployeesDto[] = [];

        for (const department of departments) {
            // 해당 부서의 직원 정보 조회
            const departmentEmployeeInfo = employeesByDepartment.get(department.id) || {
                employees: [],
                departmentPositions: new Map(),
            };

            // 직원 정보를 EmployeeResponseDto로 변환
            const employees: EmployeeResponseDto[] = [];
            for (const employee of departmentEmployeeInfo.employees) {
                const employeeResponse: EmployeeResponseDto = {
                    id: employee.id,
                    name: employee.name,
                    email: employee.email,
                    employeeNumber: employee.employeeNumber,
                    phoneNumber: employee.phoneNumber,
                    dateOfBirth: employee.dateOfBirth,
                    gender: employee.gender,
                    hireDate: employee.hireDate,
                    status: employee.status,
                };

                // 🚀 성능 최적화: 상세 정보 매핑 최적화
                if (withEmployeeDetail && departmentDetails) {
                    const deptDetails = departmentDetails.get(department.id);
                    if (deptDetails) {
                        // 해당 직원의 상세 정보 찾기
                        const employeeDetail = deptDetails.find((d) => {
                            // 직원-부서-직책 관계에서 해당 직원 찾기
                            const deptPositions = departmentEmployeeInfo.departmentPositions;
                            return deptPositions.has(employee.id) && d.department.id === department.id;
                        });

                        if (employeeDetail) {
                            employeeResponse.department = this.부서_정보를_매핑한다(employeeDetail.department);
                            employeeResponse.position = this.직책_정보를_매핑한다(employeeDetail.position);
                            employeeResponse.rank = this.직급_정보를_매핑한다(employeeDetail.rank);
                        }
                    }
                }

                employees.push(employeeResponse);
            }

            // 하위 부서 처리
            const childDepartments = this.부서_계층구조를_응답_DTO로_변환한다(
                department.childDepartments || [],
                employeesByDepartment,
                departmentDetails,
                withEmployeeDetail,
                currentDepth + 1,
            );

            const departmentDto: DepartmentWithEmployeesDto = {
                id: department.id,
                departmentName: department.departmentName,
                departmentCode: department.departmentCode,
                type: department.type,
                parentDepartmentId: department.parentDepartmentId,
                parentDepartmentName: department.parentDepartment?.departmentName,
                order: department.order,
                depth: currentDepth,
                employees: employees.sort((a, b) => a.name.localeCompare(b.name)),
                employeeCount: employees.length,
                childDepartments: childDepartments.sort((a, b) => a.order - b.order),
                childDepartmentCount: childDepartments.length,
            };

            result.push(departmentDto);
        }

        return result.sort((a, b) => a.order - b.order);
    }

    private 부서_계층구조_통계를_계산한다(departments: DepartmentWithEmployeesDto[]): {
        totalDepartments: number;
        totalEmployees: number;
        maxDepthCalculated: number;
    } {
        let totalDepartments = 0;
        let totalEmployees = 0;
        let maxDepthCalculated = 0;

        const calculateStats = (depts: DepartmentWithEmployeesDto[]) => {
            for (const dept of depts) {
                totalDepartments++;
                totalEmployees += dept.employeeCount;
                maxDepthCalculated = Math.max(maxDepthCalculated, dept.depth);

                if (dept.childDepartments && dept.childDepartments.length > 0) {
                    calculateStats(dept.childDepartments);
                }
            }
        };

        calculateStats(departments);

        return {
            totalDepartments,
            totalEmployees,
            maxDepthCalculated,
        };
    }
}

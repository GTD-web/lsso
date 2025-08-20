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
} from './dto';
import { Employee } from '../../../../libs/database/entities/employee.entity';
import { Department } from '../../../../libs/database/entities/department.entity';
import { Position } from '../../../../libs/database/entities/position.entity';
import { Rank } from '../../../../libs/database/entities/rank.entity';

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

        try {
            if (employeeId) {
                employee = await this.organizationContextService.직원_ID값으로_직원정보를_조회한다(employeeId);
            } else if (employeeNumber) {
                employee = await this.organizationContextService.직원_사번으로_직원정보를_조회한다(employeeNumber);
            }
        } catch (error) {
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
}

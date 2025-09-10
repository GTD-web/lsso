import { ApiProperty } from '@nestjs/swagger';
import { Employee } from '../../../../../../libs/database/entities';
import { EmployeeStatus, Gender } from '../../../../../../libs/common/enums';

export class UserResponseDto {
    @ApiProperty({ description: '사용자 ID' })
    id: string;

    @ApiProperty({ description: '직원 번호' })
    employeeNumber: string;

    @ApiProperty({ description: '사용자 이름' })
    name: string;

    @ApiProperty({ description: '이메일' })
    email: string;

    @ApiProperty({ description: '전화번호', required: false })
    phoneNumber?: string;

    @ApiProperty({ description: '생년월일', required: false })
    dateOfBirth?: string;

    @ApiProperty({ description: '성별', required: false })
    gender?: string;

    @ApiProperty({ description: '입사일', required: false })
    hireDate?: string;

    @ApiProperty({ description: '재직 상태', required: false })
    status?: string;

    @ApiProperty({ description: '현재 직급', required: false })
    rank?: string;

    @ApiProperty({ description: '부서명', required: false })
    department?: string;

    @ApiProperty({ description: '직위명', required: false })
    position?: string;

    @ApiProperty({ description: '생성일' })
    createdAt: string;

    @ApiProperty({ description: '수정일' })
    updatedAt: string;

    @ApiProperty({ description: '초기 비밀번호 설정 여부', required: false })
    isInitialPasswordSet?: boolean;

    constructor(employee: Employee) {
        this.id = employee.id;
        this.employeeNumber = employee.employeeNumber;
        this.name = employee.name;
        this.email = employee.email;
        this.phoneNumber = employee.phoneNumber;

        // 안전한 날짜 처리
        this.dateOfBirth = employee.dateOfBirth ? String(employee.dateOfBirth).split('T')[0] : undefined;
        this.gender = employee.gender ? employee.gender.toString() : undefined;
        this.hireDate = employee.hireDate ? String(employee.hireDate).split('T')[0] : undefined;
        this.status = employee.status ? employee.status.toString() : undefined;
        this.rank = employee.currentRank?.rankName || undefined;
        this.department = employee.departmentPositions?.[0]?.department?.departmentName || undefined;
        this.position = employee.departmentPositions?.[0]?.position?.positionTitle || undefined;

        this.createdAt = String(employee.createdAt).split('T')[0] || String(employee.createdAt);
        this.updatedAt = String(employee.updatedAt).split('T')[0] || String(employee.updatedAt);
        this.isInitialPasswordSet = employee.isInitialPasswordSet;
    }
}

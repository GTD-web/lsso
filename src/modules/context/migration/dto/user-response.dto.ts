import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../../../../libs/database/entities';

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

    @ApiProperty({ description: '부서', required: false })
    department?: string;

    @ApiProperty({ description: '직위', required: false })
    position?: string;

    @ApiProperty({ description: '직급', required: false })
    rank?: string;

    @ApiProperty({ description: '생성일' })
    createdAt: string;

    @ApiProperty({ description: '수정일' })
    updatedAt: string;

    @ApiProperty({ description: '토큰 정보', required: false })
    hasToken?: boolean;

    @ApiProperty({ description: '초기 비밀번호 설정 여부', required: false })
    isInitialPasswordSet?: boolean;

    constructor(user: User) {
        this.id = user.id;
        this.employeeNumber = user.employeeNumber;
        this.name = user.name;
        this.email = user.email;
        this.phoneNumber = user.phoneNumber;
        this.dateOfBirth = user.dateOfBirth ? user.dateOfBirth.toISOString().split('T')[0] : undefined;
        this.gender = user.gender;
        this.hireDate = user.hireDate ? user.hireDate.toISOString().split('T')[0] : undefined;
        this.status = user.status;
        this.department = user.department;
        this.position = user.position;
        this.rank = user.rank;
        this.createdAt = user.createdAt.toISOString();
        this.updatedAt = user.updatedAt.toISOString();
        this.hasToken = true;
        this.isInitialPasswordSet = user.isInitialPasswordSet;
    }
}

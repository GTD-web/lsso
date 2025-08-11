import { ApiProperty } from '@nestjs/swagger';

class PositionDto {
    @ApiProperty({ description: '직책 ID', example: '67d1436e91e5366c32791be3' })
    _id: string;

    @ApiProperty({ description: '직책명', example: '직원' })
    position_title: string;

    @ApiProperty({ description: '직책 코드', example: '직원' })
    position_code: string;

    @ApiProperty({ description: '직책 레벨', example: 6 })
    level: number;
}

class RankDto {
    @ApiProperty({ description: '직급 ID', example: '67d1081c9af04fc1b2f65c1d' })
    _id: string;

    @ApiProperty({ description: '직급명', example: '연구원' })
    rank_name: string;

    @ApiProperty({ description: '직급 코드', example: '연구원' })
    rank_code: string;

    @ApiProperty({ description: '직급 레벨', example: 9 })
    level: number;
}

class DepartmentDto {
    @ApiProperty({ description: '부서 ID', example: '67d0f1d19af04fc1b2f65af2' })
    _id: string;

    @ApiProperty({ description: '부서명', example: 'RF파트' })
    department_name: string;

    @ApiProperty({ description: '부서 코드', example: '우주-RF' })
    department_code: string;

    @ApiProperty({ description: '부서 순서', example: 4 })
    order: number;

    @ApiProperty({
        description: '상위 부서 ID',
        example: '684bd41148148ddbd9068cd9',
        nullable: true,
    })
    parent_department_id: string | null;
}

export class EmployeeResponseDto {
    constructor(employee: any) {
        this._id = employee._id;
        this.employee_number = employee.employee_number;
        this.name = employee.name;
        this.email = employee.email;
        this.phone_number = employee.phone_number;
        this.date_of_birth = employee.date_of_birth;
        this.gender = employee.gender;
        this.hire_date = employee.hire_date;
        this.manager_id = employee.manager_id;
        this.status = employee.status;
        this.department_history = employee.department_history || [];
        this.position_history = employee.position_history || [];
        this.rank_history = employee.rank_history || [];
        this.created_at = employee.created_at;
        this.updated_at = employee.updated_at;
        this.__v = employee.__v;
        this.position = employee.position;
        this.rank = employee.rank;
        this.department = employee.department;
    }

    @ApiProperty({ description: '직원 ID', example: '67d116b691e5366c3279162c' })
    _id: string;

    @ApiProperty({ description: '사번', example: '25006' })
    employee_number: string;

    @ApiProperty({ description: '이름', example: '홍연창' })
    name: string;

    @ApiProperty({ description: '이메일', example: 'hong.yonchang@lumir.space' })
    email: string;

    @ApiProperty({ description: '전화번호', example: '' })
    phone_number: string;

    @ApiProperty({ description: '생년월일', example: '1976-10-14T00:00:00.000Z' })
    date_of_birth: Date;

    @ApiProperty({ description: '성별', example: 'MALE' })
    gender: string;

    @ApiProperty({ description: '입사일', example: '2025-01-01T00:00:00.000Z' })
    hire_date: Date;

    @ApiProperty({
        description: '관리자 ID',
        example: null,
        nullable: true,
    })
    manager_id: string | null;

    @ApiProperty({ description: '재직 상태', example: '재직중' })
    status: string;

    @ApiProperty({
        description: '부서 이력',
        type: [Object],
        example: [],
    })
    department_history: any[];

    @ApiProperty({
        description: '직책 이력',
        type: [Object],
        example: [],
    })
    position_history: any[];

    @ApiProperty({
        description: '직급 이력',
        type: [Object],
        example: [],
    })
    rank_history: any[];

    @ApiProperty({ description: '생성일', example: '2025-03-12T05:08:06.261Z' })
    created_at: Date;

    @ApiProperty({ description: '수정일', example: '2025-03-12T08:59:32.380Z' })
    updated_at: Date;

    @ApiProperty({ description: 'MongoDB 버전', example: 0 })
    __v: number;

    @ApiProperty({
        description: '현재 직책 정보',
        type: PositionDto,
        nullable: true,
    })
    position: PositionDto | null;

    @ApiProperty({
        description: '현재 직급 정보',
        type: RankDto,
        nullable: true,
    })
    rank: RankDto | null;

    @ApiProperty({
        description: '현재 부서 정보',
        type: DepartmentDto,
        nullable: true,
    })
    department: DepartmentDto | null;
}

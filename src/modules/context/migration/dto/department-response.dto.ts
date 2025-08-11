import { ApiProperty } from '@nestjs/swagger';

export class DepartmentResponseDto {
    constructor(department: any) {
        this._id = department._id;
        this.department_name = department.department_name;
        this.department_code = department.department_code;
        this.manager_id = department.manager_id;
        this.parent_department_id = department.parent_department_id;
        this.order = department.order;
        this.child_departments = department.child_departments || [];
        this.id = department.id;
        this.created_at = department.created_at;
        this.updated_at = department.updated_at;
        this.__v = department.__v;
    }

    @ApiProperty({ description: '부서 MongoDB ID', example: '67d0f1629af04fc1b2f65ad4' })
    _id: string;

    @ApiProperty({ description: '부서명', example: '경영지원실' })
    department_name: string;

    @ApiProperty({ description: '부서코드', example: '경영지원-경지' })
    department_code: string;

    @ApiProperty({
        description: '부서장 ID',
        example: null,
        nullable: true,
    })
    manager_id: string | null;

    @ApiProperty({
        description: '상위 부서 ID',
        example: '67d0f1189af04fc1b2f65ab7',
        nullable: true,
    })
    parent_department_id: string | null;

    @ApiProperty({ description: '부서 순서', example: 0 })
    order: number;

    @ApiProperty({
        description: '하위 부서 목록',
        type: [DepartmentResponseDto],
        example: [],
    })
    child_departments: DepartmentResponseDto[];

    @ApiProperty({ description: '부서 ID (별칭)', example: '67d0f1629af04fc1b2f65ad4' })
    id: string;

    @ApiProperty({ description: '생성일', example: '2025-03-12T02:28:50.885Z' })
    created_at: Date;

    @ApiProperty({ description: '수정일', example: '2025-06-17T16:33:39.394Z' })
    updated_at: Date;

    @ApiProperty({ description: 'MongoDB 버전', example: 0 })
    __v: number;
}

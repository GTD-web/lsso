export declare class DepartmentResponseDto {
    constructor(department: any);
    _id: string;
    department_name: string;
    department_code: string;
    manager_id: string | null;
    parent_department_id: string | null;
    order: number;
    child_departments: DepartmentResponseDto[];
    id: string;
    created_at: Date;
    updated_at: Date;
    __v: number;
}

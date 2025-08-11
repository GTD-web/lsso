declare class PositionDto {
    _id: string;
    position_title: string;
    position_code: string;
    level: number;
}
declare class RankDto {
    _id: string;
    rank_name: string;
    rank_code: string;
    level: number;
}
declare class DepartmentDto {
    _id: string;
    department_name: string;
    department_code: string;
    order: number;
    parent_department_id: string | null;
}
export declare class EmployeeResponseDto {
    constructor(employee: any);
    _id: string;
    employee_number: string;
    name: string;
    email: string;
    phone_number: string;
    date_of_birth: Date;
    gender: string;
    hire_date: Date;
    manager_id: string | null;
    status: string;
    department_history: any[];
    position_history: any[];
    rank_history: any[];
    created_at: Date;
    updated_at: Date;
    __v: number;
    position: PositionDto | null;
    rank: RankDto | null;
    department: DepartmentDto | null;
}
export {};

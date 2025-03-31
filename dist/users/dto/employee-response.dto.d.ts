export declare class EmployeeResponseDto {
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
    department_history: string[];
    position_history: string[];
    rank_history: string[];
    created_at: Date;
    updated_at: Date;
    __v: number;
    department_id: string;
    position_id: string;
    rank_id: string;
}

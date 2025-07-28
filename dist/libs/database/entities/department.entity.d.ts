export declare class Department {
    id: string;
    departmentName: string;
    departmentCode: string;
    location?: string;
    managerId?: string;
    parentDepartmentId?: string;
    order: number;
    parentDepartment?: Department;
    childDepartments: Department[];
    createdAt: Date;
    updatedAt: Date;
}

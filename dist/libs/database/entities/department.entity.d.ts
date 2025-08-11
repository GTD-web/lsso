export declare enum DepartmentType {
    COMPANY = "COMPANY",
    DIVISION = "DIVISION",
    DEPARTMENT = "DEPARTMENT",
    TEAM = "TEAM"
}
export declare class Department {
    id: string;
    departmentName: string;
    departmentCode: string;
    type: DepartmentType;
    parentDepartmentId?: string;
    order: number;
    parentDepartment?: Department;
    childDepartments: Department[];
    createdAt: Date;
    updatedAt: Date;
}

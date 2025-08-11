import { Gender, EmployeeStatus } from '../../common/enums';
import { Rank } from './rank.entity';
import { EmployeeDepartmentPosition } from './employee-department-position.entity';
export declare class Employee {
    id: string;
    employeeNumber: string;
    name: string;
    email: string;
    password?: string;
    phoneNumber?: string;
    dateOfBirth?: Date;
    gender?: Gender;
    hireDate: Date;
    status: EmployeeStatus;
    currentRankId?: string;
    currentRank?: Rank;
    terminationDate?: Date;
    isInitialPasswordSet: boolean;
    departmentPositions?: EmployeeDepartmentPosition[];
    createdAt: Date;
    updatedAt: Date;
}

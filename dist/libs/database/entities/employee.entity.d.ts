import { Gender, EmployeeStatus } from '../../common/enums';
import { Rank } from './rank.entity';
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
    createdAt: Date;
    updatedAt: Date;
}

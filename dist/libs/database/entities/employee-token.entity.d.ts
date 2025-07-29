import { Employee } from './employee.entity';
import { Token } from './token.entity';
export declare class EmployeeToken {
    id: string;
    employeeId: string;
    tokenId: string;
    employee: Employee;
    token: Token;
}

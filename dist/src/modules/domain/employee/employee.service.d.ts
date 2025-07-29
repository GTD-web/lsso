import { DomainEmployeeRepository } from './employee.repository';
import { BaseService } from '../../../../libs/common/services/base.service';
import { Employee } from '../../../../libs/database/entities';
export declare class DomainEmployeeService extends BaseService<Employee> {
    private readonly employeeRepository;
    constructor(employeeRepository: DomainEmployeeRepository);
    findByEmployeeId(employeeId: string): Promise<Employee>;
    findByEmail(email: string): Promise<Employee>;
    findByEmployeeNumber(employeeNumber: string): Promise<Employee>;
    updatePassword(employeeId: string, hashedPassword: string): Promise<Employee>;
}

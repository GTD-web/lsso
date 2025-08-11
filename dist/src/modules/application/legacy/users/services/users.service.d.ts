import { Employee } from '../../../../../../libs/database/entities/employee.entity';
import { IRepositoryOptions } from '../../../../../../libs/common/interfaces/repository.interface';
import { DomainEmployeeService } from '../../../../domain/employee/employee.service';
import { DomainDepartmentService } from '../../../../domain/department/department.service';
import { DomainPositionService } from '../../../../domain/position/position.service';
import { DomainRankService } from '../../../../domain/rank/rank.service';
import { DomainEmployeeDepartmentPositionService } from '../../../../domain/employee-department-position/employee-department-position.service';
export declare class UsersService {
    private readonly employeeService;
    private readonly departmentService;
    private readonly positionService;
    private readonly rankService;
    private readonly employeeDepartmentPositionService;
    constructor(employeeService: DomainEmployeeService, departmentService: DomainDepartmentService, positionService: DomainPositionService, rankService: DomainRankService, employeeDepartmentPositionService: DomainEmployeeDepartmentPositionService);
    findAll(options?: IRepositoryOptions<Employee>): Promise<Employee[]>;
    findOne(id: string): Promise<Employee>;
    findByEmployeeNumber(employeeNumber: string): Promise<Employee>;
    findByEmail(email: string): Promise<Employee>;
    hashPassword(password?: string): string;
    createEmployee(employeeData: Partial<Employee>): Promise<Employee>;
    save(employee: Employee): Promise<Employee>;
    bulkSave(employees: Employee[]): Promise<Employee[]>;
    update(id: string, employeeData: Partial<Employee>): Promise<Employee>;
    remove(id: string): Promise<void>;
    getEmployeeWithDepartmentPosition(employeeId: string): Promise<{
        employee: Employee;
        departmentPositions: import("../../../../../../libs/database/entities").EmployeeDepartmentPosition;
    }>;
    verifyPassword(password: string, employee: Employee): Promise<boolean>;
}

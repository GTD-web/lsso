import { DomainEmployeeService } from '../../domain/employee/employee.service';
import { DomainTokenService } from '../../domain/token/token.service';
import { DomainSystemService } from '../../domain/system/system.service';
import { DomainEmployeeTokenService } from '../../domain/employee-token/employee-token.service';
import { Employee } from 'libs/database/entities/employee.entity';
import { Token } from 'libs/database/entities/token.entity';
import { System } from 'libs/database/entities/system.entity';
export declare class AuthorizationContextService {
    private readonly 직원서비스;
    private readonly 토큰서비스;
    private readonly 시스템서비스;
    private readonly 직원토큰서비스;
    constructor(직원서비스: DomainEmployeeService, 토큰서비스: DomainTokenService, 시스템서비스: DomainSystemService, 직원토큰서비스: DomainEmployeeTokenService);
    시스템을_인증한다(clientId: string, clientSecret: string): Promise<System>;
    로그인정보를_검증한다(email: string, password: string): Promise<Employee>;
    엑세스토큰을_검증한다(accessToken: string): Promise<{
        employee: Employee;
        token: Token;
    }>;
    리프레시토큰을_검증한다(refresh_token: string): Promise<Employee>;
    토큰정보를_생성한다(employee: Employee): Promise<Token>;
    비밀번호를_변경한다(employee: Employee, newPassword: string): Promise<void>;
    비밀번호를_검증한다(employee: Employee, password: string): Promise<boolean>;
}

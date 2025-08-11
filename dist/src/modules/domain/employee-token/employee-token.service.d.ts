import { DomainEmployeeTokenRepository } from './employee-token.repository';
import { BaseService } from '../../../../libs/common/services/base.service';
import { EmployeeToken } from '../../../../libs/database/entities';
export declare class DomainEmployeeTokenService extends BaseService<EmployeeToken> {
    private readonly employeeTokenRepository;
    constructor(employeeTokenRepository: DomainEmployeeTokenRepository);
    findByEmployeeId(employeeId: string): Promise<EmployeeToken[]>;
    findByTokenId(tokenId: string): Promise<EmployeeToken[]>;
    createOrUpdateRelation(employeeId: string, tokenId: string, relationData: Partial<EmployeeToken>): Promise<EmployeeToken>;
}

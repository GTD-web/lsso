import { Injectable, NotFoundException } from '@nestjs/common';
import { DomainEmployeeTokenRepository } from './employee-token.repository';
import { BaseService } from '../../../../libs/common/services/base.service';
import { EmployeeToken } from '../../../../libs/database/entities';

@Injectable()
export class DomainEmployeeTokenService extends BaseService<EmployeeToken> {
    constructor(private readonly employeeTokenRepository: DomainEmployeeTokenRepository) {
        super(employeeTokenRepository);
    }

    // 직원의 토큰 목록 조회
    async findByEmployeeId(employeeId: string): Promise<EmployeeToken[]> {
        return this.employeeTokenRepository.findAll({
            where: { employeeId },
        });
    }

    // 토큰의 직원 정보 조회
    async findByTokenId(tokenId: string): Promise<EmployeeToken[]> {
        return this.employeeTokenRepository.findAll({
            where: { tokenId },
        });
    }

    // 직원과 토큰 관계 생성 또는 업데이트
    async createOrUpdateRelation(
        employeeId: string,
        tokenId: string,
        relationData: Partial<EmployeeToken>,
    ): Promise<EmployeeToken> {
        const existingRelation = await this.employeeTokenRepository.findOne({
            where: { employeeId, tokenId },
        });

        if (existingRelation) {
            return this.employeeTokenRepository.update(existingRelation.id, relationData);
        }

        return this.employeeTokenRepository.save({
            employeeId,
            tokenId,
            ...relationData,
        });
    }
}

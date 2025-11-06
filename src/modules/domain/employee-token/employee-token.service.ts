import { Injectable, NotFoundException } from '@nestjs/common';
import { DomainEmployeeTokenRepository } from './employee-token.repository';
import { BaseService } from '../../../../libs/common/services/base.service';
import { EmployeeToken } from '../../../../libs/database/entities';
import { In } from 'typeorm';

@Injectable()
export class DomainEmployeeTokenService extends BaseService<EmployeeToken> {
    constructor(private readonly employeeTokenRepository: DomainEmployeeTokenRepository) {
        super(employeeTokenRepository);
    }

    // 직원의 토큰 목록 조회
    async findByEmployeeId(employeeId: string): Promise<EmployeeToken[]> {
        return this.employeeTokenRepository.findAll({
            where: { employeeId },
            relations: ['token'],
        });
    }

    // 여러 직원의 토큰 목록을 일괄 조회
    async findByEmployeeIds(employeeIds: string[]): Promise<EmployeeToken[]> {
        if (employeeIds.length === 0) return [];
        return this.employeeTokenRepository.findAll({
            where: { employeeId: In(employeeIds) },
            relations: ['token'],
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

    // 특정 토큰 ID들에 해당하는 중간테이블 데이터 삭제
    async deleteByTokenIds(tokenIds: string[]): Promise<{ deletedCount: number }> {
        let deletedCount = 0;
        for (const tokenId of tokenIds) {
            const relations = await this.employeeTokenRepository.findAll({
                where: { tokenId },
            });

            for (const relation of relations) {
                await this.employeeTokenRepository.delete(relation.id);
                deletedCount++;
            }
        }

        return { deletedCount };
    }

    // 직원의 모든 토큰 관계 삭제
    async deleteAllByEmployeeId(employeeId: string): Promise<void> {
        const relations = await this.findByEmployeeId(employeeId);

        for (const relation of relations) {
            await this.employeeTokenRepository.delete(relation.id);
        }
    }
}

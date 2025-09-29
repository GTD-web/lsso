import { Injectable } from '@nestjs/common';
import { DomainEmployeeTokenService } from '../../domain/employee-token/employee-token.service';
import { EmployeeToken } from '../../../../libs/database/entities';

@Injectable()
export class EmployeeTokenManagementContextService {
    constructor(private readonly employeeTokenService: DomainEmployeeTokenService) {}

    /**
     * 모든 직원 토큰 관계를 조회합니다
     */
    async 모든_직원_토큰_관계_조회(): Promise<EmployeeToken[]> {
        return this.employeeTokenService.findAll({
            relations: ['employee', 'token'],
        });
    }

    /**
     * 직원별 토큰 관계를 조회합니다
     */
    async 직원별_토큰_관계_조회(employeeId: string): Promise<EmployeeToken[]> {
        return this.employeeTokenService.findByEmployeeId(employeeId);
    }

    /**
     * 토큰별 직원 관계를 조회합니다
     */
    async 토큰별_직원_관계_조회(tokenId: string): Promise<EmployeeToken[]> {
        return this.employeeTokenService.findByTokenId(tokenId);
    }

    /**
     * 직원 토큰 관계를 ID로 조회합니다
     */
    async 직원_토큰_관계_조회(id: string): Promise<EmployeeToken | null> {
        return this.employeeTokenService.findOne({
            where: { id },
            relations: ['employee', 'token'],
        });
    }

    /**
     * ID로 직원 토큰 관계를 조회합니다
     */
    async ID로_직원_토큰_관계_조회(id: string): Promise<EmployeeToken | null> {
        return this.employeeTokenService.findOne({
            where: { id },
        });
    }

    /**
     * 직원과 토큰 관계를 생성하거나 업데이트합니다
     */
    async 직원과_토큰_관계_생성_또는_업데이트(
        employeeId: string,
        tokenId: string,
        relationData: Partial<EmployeeToken> = {},
    ): Promise<EmployeeToken> {
        return this.employeeTokenService.createOrUpdateRelation(employeeId, tokenId, relationData);
    }

    /**
     * 직원 토큰 관계를 삭제합니다
     */
    async 직원_토큰_관계_삭제(id: string): Promise<void> {
        return this.employeeTokenService.delete(id);
    }

    /**
     * 특정 토큰 ID들에 해당하는 중간테이블 데이터를 삭제합니다
     */
    async 토큰_ID들로_관계_삭제(tokenIds: string[]): Promise<{ deletedCount: number }> {
        return this.employeeTokenService.deleteByTokenIds(tokenIds);
    }

    /**
     * 직원과 토큰의 특정 관계를 조회합니다
     */
    async 직원과_토큰의_관계_조회(employeeId: string, tokenId: string): Promise<EmployeeToken | null> {
        return this.employeeTokenService.findOne({
            where: { employeeId, tokenId },
        });
    }

    /**
     * 직원의 모든 토큰 관계를 삭제합니다
     */
    async 직원의_모든_토큰_관계_삭제(employeeId: string): Promise<void> {
        const relations = await this.employeeTokenService.findByEmployeeId(employeeId);
        for (const relation of relations) {
            await this.employeeTokenService.delete(relation.id);
        }
    }
}

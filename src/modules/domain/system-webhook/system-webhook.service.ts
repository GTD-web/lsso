import { Injectable, NotFoundException } from '@nestjs/common';
import { DomainSystemWebhookRepository } from './system-webhook.repository';
import { BaseService } from '../../../../libs/common/services/base.service';
import { SystemWebhook } from '../../../../libs/database/entities';

@Injectable()
export class DomainSystemWebhookService extends BaseService<SystemWebhook> {
    constructor(private readonly systemWebhookRepository: DomainSystemWebhookRepository) {
        super(systemWebhookRepository);
    }

    // 시스템의 웹훅 목록 조회
    async findBySystemId(systemId: string): Promise<SystemWebhook[]> {
        return this.systemWebhookRepository.findAll({
            where: { systemId },
            order: { createdAt: 'DESC' },
        });
    }

    // 웹훅의 시스템 목록 조회
    async findByWebhookId(webhookId: string): Promise<SystemWebhook[]> {
        return this.systemWebhookRepository.findAll({
            where: { webhookId },
            order: { createdAt: 'DESC' },
        });
    }

    // 특정 시스템-웹훅 관계 찾기
    async findBySystemAndWebhook(systemId: string, webhookId: string): Promise<SystemWebhook> {
        const relation = await this.systemWebhookRepository.findOne({
            where: { systemId, webhookId },
        });
        if (!relation) {
            throw new NotFoundException('시스템-웹훅 관계를 찾을 수 없습니다.');
        }
        return relation;
    }

    // 실행 통계 업데이트
    async updateExecutionStats(systemId: string, webhookId: string, isSuccess: boolean): Promise<SystemWebhook> {
        const relation = await this.findBySystemAndWebhook(systemId, webhookId);

        const updateData: Partial<SystemWebhook> = {
            lastExecutedAt: new Date(),
            executionCount: relation.executionCount + 1,
        };

        if (isSuccess) {
            updateData.successCount = relation.successCount + 1;
        } else {
            updateData.failureCount = relation.failureCount + 1;
        }

        return this.systemWebhookRepository.update(relation.id, updateData);
    }

    // 실행 횟수가 많은 순으로 조회
    async findMostExecuted(limit: number = 10): Promise<SystemWebhook[]> {
        return this.systemWebhookRepository.findAll({
            order: { executionCount: 'DESC' },
            take: limit,
        });
    }

    // 실패율이 높은 관계 조회
    async findHighFailureRate(minExecutions: number = 10): Promise<SystemWebhook[]> {
        return this.systemWebhookRepository.findAll({
            order: { failureCount: 'DESC' },
        });
    }

    // 시스템과 웹훅 관계 생성
    async createRelation(systemId: string, webhookId: string): Promise<SystemWebhook> {
        return this.systemWebhookRepository.save({
            systemId,
            webhookId,
            executionCount: 0,
            successCount: 0,
            failureCount: 0,
        });
    }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { DomainWebhookEventLogRepository } from './webhook-event-log.repository';
import { BaseService } from '../../../../libs/common/services/base.service';
import { WebhookEventLog } from '../../../../libs/database/entities';

@Injectable()
export class DomainWebhookEventLogService extends BaseService<WebhookEventLog> {
    constructor(private readonly webhookEventLogRepository: DomainWebhookEventLogRepository) {
        super(webhookEventLogRepository);
    }

    // 특정 웹훅의 이벤트 로그 조회
    async findByWebhookId(webhookId: string): Promise<WebhookEventLog[]> {
        return this.webhookEventLogRepository.findAll({
            where: { webhookId },
            order: { createdAt: 'DESC' },
        });
    }

    // 이벤트 타입별 로그 조회
    async findByEventType(eventType: string): Promise<WebhookEventLog[]> {
        return this.webhookEventLogRepository.findAll({
            where: { eventType },
            order: { createdAt: 'DESC' },
        });
    }

    // 특정 엔티티의 이벤트 로그 조회
    async findByEntityId(entityId: string): Promise<WebhookEventLog[]> {
        return this.webhookEventLogRepository.findAll({
            where: { entityId },
            order: { createdAt: 'DESC' },
        });
    }

    // 성공한 이벤트 로그만 조회
    async findSuccessfulEvents(): Promise<WebhookEventLog[]> {
        return this.webhookEventLogRepository.findAll({
            where: { isSuccess: true },
            order: { createdAt: 'DESC' },
        });
    }

    // 실패한 이벤트 로그만 조회
    async findFailedEvents(): Promise<WebhookEventLog[]> {
        return this.webhookEventLogRepository.findAll({
            where: { isSuccess: false },
            order: { createdAt: 'DESC' },
        });
    }

    // 특정 상태 코드의 이벤트 로그 조회
    async findByResponseCode(responseCode: number): Promise<WebhookEventLog[]> {
        return this.webhookEventLogRepository.findAll({
            order: { createdAt: 'DESC' },
        });
    }

    // 재시도가 필요한 이벤트 로그 조회
    async findRetryableEvents(maxAttempts: number = 3): Promise<WebhookEventLog[]> {
        return this.webhookEventLogRepository.findAll({
            where: { isSuccess: false },
            order: { lastAttemptAt: 'ASC' },
        });
    }

    // 이벤트 로그 생성
    async createEventLog(
        webhookId: string,
        eventType: string,
        entityId: string,
        payload: Record<string, any>,
    ): Promise<WebhookEventLog> {
        return this.webhookEventLogRepository.save({
            webhookId,
            eventType,
            entityId,
            payload,
            attemptCount: 1,
            isSuccess: false,
            lastAttemptAt: new Date(),
        });
    }

    // 이벤트 로그 결과 업데이트
    async updateEventResult(
        id: string,
        responseCode: number,
        responseBody: string,
        isSuccess: boolean,
    ): Promise<WebhookEventLog> {
        return this.webhookEventLogRepository.update(id, {
            responseCode,
            responseBody,
            isSuccess,
            lastAttemptAt: new Date(),
        });
    }

    // 재시도 횟수 증가
    async incrementAttemptCount(id: string): Promise<WebhookEventLog> {
        const eventLog = await this.webhookEventLogRepository.findOne({ where: { id } });
        if (!eventLog) {
            throw new NotFoundException('이벤트 로그를 찾을 수 없습니다.');
        }

        return this.webhookEventLogRepository.update(id, {
            attemptCount: eventLog.attemptCount + 1,
            lastAttemptAt: new Date(),
        });
    }

    // 최근 이벤트 로그 조회
    async findRecentEvents(limit: number = 50): Promise<WebhookEventLog[]> {
        return this.webhookEventLogRepository.findAll({
            order: { createdAt: 'DESC' },
            take: limit,
        });
    }

    // 웹훅별 성공률 통계
    async getSuccessRateByWebhook(webhookId: string): Promise<{ total: number; success: number; successRate: number }> {
        const events = await this.findByWebhookId(webhookId);
        const total = events.length;
        const success = events.filter((event) => event.isSuccess).length;
        const successRate = total > 0 ? (success / total) * 100 : 0;

        return { total, success, successRate };
    }
}

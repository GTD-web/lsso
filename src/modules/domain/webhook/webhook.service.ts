import { Injectable, NotFoundException } from '@nestjs/common';
import { DomainWebhookRepository } from './webhook.repository';
import { BaseService } from '../../../../libs/common/services/base.service';
import { Webhook } from '../../../../libs/database/entities';

@Injectable()
export class DomainWebhookService extends BaseService<Webhook> {
    constructor(private readonly webhookRepository: DomainWebhookRepository) {
        super(webhookRepository);
    }

    // 웹훅 이름으로 찾기
    async findByName(webhookName: string): Promise<Webhook> {
        const webhook = await this.webhookRepository.findOne({
            where: { webhookName },
        });
        if (!webhook) {
            throw new NotFoundException('웹훅을 찾을 수 없습니다.');
        }
        return webhook;
    }

    // 이벤트 타입으로 웹훅 조회
    async findByEventType(eventType: string): Promise<Webhook[]> {
        return this.webhookRepository.findAll({
            where: { eventType },
            order: { createdAt: 'DESC' },
        });
    }

    // 엔티티 타입으로 웹훅 조회
    async findByEntityType(entityType: string): Promise<Webhook[]> {
        return this.webhookRepository.findAll({
            where: { entityType },
            order: { createdAt: 'DESC' },
        });
    }

    // 활성 웹훅 목록 조회
    async findActiveWebhooks(): Promise<Webhook[]> {
        return this.webhookRepository.findAll({
            where: { isActive: true },
            order: { webhookName: 'ASC' },
        });
    }

    // 대상 URL로 웹훅 찾기
    async findByTargetUrl(targetUrl: string): Promise<Webhook[]> {
        return this.webhookRepository.findAll({
            where: { targetUrl },
            order: { createdAt: 'DESC' },
        });
    }
}

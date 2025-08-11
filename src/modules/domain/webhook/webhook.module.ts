import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DomainWebhookService } from './webhook.service';
import { DomainWebhookRepository } from './webhook.repository';
import { Webhook } from '../../../../libs/database/entities';

@Module({
    imports: [TypeOrmModule.forFeature([Webhook])],
    providers: [DomainWebhookService, DomainWebhookRepository],
    exports: [DomainWebhookService],
})
export class DomainWebhookModule {}

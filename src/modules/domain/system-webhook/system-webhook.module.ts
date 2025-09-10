import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DomainSystemWebhookService } from './system-webhook.service';
import { DomainSystemWebhookRepository } from './system-webhook.repository';
import { SystemWebhook } from './system-webhook.entity';

@Module({
    imports: [TypeOrmModule.forFeature([SystemWebhook])],
    providers: [DomainSystemWebhookService, DomainSystemWebhookRepository],
    exports: [DomainSystemWebhookService],
})
export class DomainSystemWebhookModule {}

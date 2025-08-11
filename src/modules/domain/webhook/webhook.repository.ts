import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Webhook } from '../../../../libs/database/entities';
import { BaseRepository } from '../../../../libs/common/repositories/base.repository';

@Injectable()
export class DomainWebhookRepository extends BaseRepository<Webhook> {
    constructor(
        @InjectRepository(Webhook)
        repository: Repository<Webhook>,
    ) {
        super(repository);
    }
}

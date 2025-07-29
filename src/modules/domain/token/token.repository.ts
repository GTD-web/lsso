import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Token } from '../../../../libs/database/entities';
import { BaseRepository } from '../../../../libs/common/repositories/base.repository';

@Injectable()
export class DomainTokenRepository extends BaseRepository<Token> {
    constructor(
        @InjectRepository(Token)
        repository: Repository<Token>,
    ) {
        super(repository);
    }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Position } from '../../../../libs/database/entities';
import { BaseRepository } from '../../../../libs/common/repositories/base.repository';

@Injectable()
export class DomainPositionRepository extends BaseRepository<Position> {
    constructor(
        @InjectRepository(Position)
        repository: Repository<Position>,
    ) {
        super(repository);
    }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { FcmToken } from '../../../../libs/database/entities';
import { BaseRepository } from '../../../../libs/common/repositories/base.repository';
import { IRepositoryOptions } from 'libs/common/interfaces/repository.interface';

@Injectable()
export class DomainFcmTokenRepository extends BaseRepository<FcmToken> {
    constructor(
        @InjectRepository(FcmToken)
        repository: Repository<FcmToken>,
    ) {
        super(repository);
    }

    deleteInactiveTokens(repositoryOptions?: IRepositoryOptions<FcmToken>): Promise<DeleteResult> {
        const repository = repositoryOptions?.queryRunner
            ? repositoryOptions.queryRunner.manager.getRepository(this.repository.target)
            : this.repository;
        return repository.delete({
            isActive: false,
        });
    }
}

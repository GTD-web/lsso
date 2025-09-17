import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { FcmToken } from '../../../../libs/database/entities';
import { BaseRepository } from '../../../../libs/common/repositories/base.repository';
import { IRepositoryOptions } from '../../../../libs/common/interfaces/repository.interface';

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

    /**
     * 직원ID와 디바이스 타입으로 기존 FCM 토큰 조회
     */
    async findByEmployeeAndDeviceType(employeeId: string, deviceType: string): Promise<FcmToken | null> {
        return this.repository
            .createQueryBuilder('fcmToken')
            .innerJoin('employee_fcm_tokens', 'eft', 'eft.fcmTokenId = fcmToken.id')
            .where('eft.employeeId = :employeeId', { employeeId })
            .andWhere('fcmToken.deviceType = :deviceType', { deviceType })
            .andWhere('fcmToken.isActive = :isActive', { isActive: true })
            .getOne();
    }
}

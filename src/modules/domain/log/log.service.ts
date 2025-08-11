import { Injectable, NotFoundException } from '@nestjs/common';
import { DomainLogRepository } from './log.repository';
import { BaseService } from '../../../../libs/common/services/base.service';
import { Log } from '../../../../libs/database/entities';

@Injectable()
export class DomainLogService extends BaseService<Log> {
    constructor(private readonly logRepository: DomainLogRepository) {
        super(logRepository);
    }

    // 특정 메서드와 URL로 로그 조회
    async findByMethodAndUrl(method: string, url: string): Promise<Log[]> {
        return this.logRepository.findAll({
            order: { requestTimestamp: 'DESC' },
        });
    }

    // 에러 로그만 조회
    async findErrorLogs(): Promise<Log[]> {
        return this.logRepository.findAll({
            where: { isError: true },
            order: { requestTimestamp: 'DESC' },
        });
    }

    // 특정 시스템의 로그 조회
    async findBySystem(system: string): Promise<Log[]> {
        return this.logRepository.findAll({
            where: { system },
            order: { requestTimestamp: 'DESC' },
        });
    }

    // 특정 상태 코드의 로그 조회
    async findByStatusCode(statusCode: number): Promise<Log[]> {
        return this.logRepository.findAll({
            order: { requestTimestamp: 'DESC' },
        });
    }

    // IP 주소로 로그 조회
    async findByIpAddress(ip: string): Promise<Log[]> {
        return this.logRepository.findAll({
            where: { ip },
            order: { requestTimestamp: 'DESC' },
        });
    }

    // 응답 시간이 긴 로그 조회 (성능 분석용)
    async findSlowRequests(minResponseTime: number = 1000): Promise<Log[]> {
        return this.logRepository.findAll({
            order: { responseTime: 'DESC' },
        });
    }
}

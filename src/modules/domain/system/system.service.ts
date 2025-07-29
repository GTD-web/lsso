import { Injectable, NotFoundException } from '@nestjs/common';
import { DomainSystemRepository } from './system.repository';
import { BaseService } from '../../../../libs/common/services/base.service';
import { System } from '../../../../libs/database/entities';

@Injectable()
export class DomainSystemService extends BaseService<System> {
    constructor(private readonly systemRepository: DomainSystemRepository) {
        super(systemRepository);
    }

    // 클라이언트 ID로 찾기
    async findByClientId(clientId: string): Promise<System> {
        const system = await this.systemRepository.findOne({
            where: { clientId },
        });
        if (!system) {
            throw new NotFoundException('시스템을 찾을 수 없습니다.');
        }
        return system;
    }

    // 시스템 이름으로 찾기
    async findByName(name: string): Promise<System> {
        const system = await this.systemRepository.findOne({
            where: { name },
        });
        if (!system) {
            throw new NotFoundException('시스템을 찾을 수 없습니다.');
        }
        return system;
    }

    // 활성 시스템 목록 조회
    async findActiveSystems(): Promise<System[]> {
        return this.systemRepository.findAll({
            where: { isActive: true },
            order: { name: 'ASC' },
        });
    }

    // 도메인으로 시스템 찾기
    async findByDomain(domain: string): Promise<System> {
        const system = await this.systemRepository.findOne({
            where: { domain },
        });
        if (!system) {
            throw new NotFoundException('해당 도메인의 시스템을 찾을 수 없습니다.');
        }
        return system;
    }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { DomainSystemRepository } from './system.repository';
import { BaseService } from '../../../../libs/common/services/base.service';
import { System } from '../../../../libs/database/entities';
import { randomBytes } from 'crypto';
import * as bcrypt from '@node-rs/bcrypt';
import { v4 as uuidv4 } from 'uuid';

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

    async verifyClientSecret(clientSecret: string, system: System): Promise<boolean> {
        return bcrypt.compare(clientSecret, system.clientSecret);
    }

    generateCredentials(): { clientId: string; clientSecret: string; hash: string } {
        const clientId = uuidv4();
        const { clientSecret, hash } = this.generateSecret();
        return { clientId, clientSecret, hash };
    }

    generateSecret(): { clientSecret: string; hash: string } {
        // secret 생성
        const clientSecret = randomBytes(32).toString('hex');
        // 비밀키 생성, bycrypt 사용으로 단방향 해시
        const hash = bcrypt.hashSync(clientSecret, 10);

        return { clientSecret, hash };
    }
}

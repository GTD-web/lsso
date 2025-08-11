import { Injectable, NotFoundException } from '@nestjs/common';
import { System } from '../../../../../../libs/database/entities/system.entity';
import { DomainSystemService } from '../../../../domain/system/system.service';
import { IRepositoryOptions } from '../../../../../../libs/common/interfaces/repository.interface';
import { CreateSystemDto } from '../dto/create-system.dto';

@Injectable()
export class SystemsService {
    constructor(private readonly systemService: DomainSystemService) {}

    async findAll(options?: IRepositoryOptions<System>): Promise<System[]> {
        return this.systemService.findAll(options);
    }

    async findOne(id: string): Promise<System> {
        return this.systemService.findOne({ where: { id } });
    }

    async findByClientId(clientId: string): Promise<System> {
        return this.systemService.findByClientId(clientId);
    }

    async findByName(name: string): Promise<System> {
        return this.systemService.findByName(name);
    }

    async findByDomain(domain: string): Promise<System> {
        return this.systemService.findByDomain(domain);
    }

    async findActiveSystems(): Promise<System[]> {
        return this.systemService.findActiveSystems();
    }

    async create(createSystemDto: CreateSystemDto): Promise<System> {
        // DomainSystemService에서 자격 증명 생성
        const { clientId, clientSecret, hash } = this.systemService.generateCredentials();

        const systemData = {
            ...createSystemDto,
            clientId,
            clientSecret: hash, // 해시된 시크릿 저장
        };

        return this.systemService.create(systemData);
    }

    async update(id: string, systemData: Partial<System>): Promise<System> {
        return this.systemService.update(id, systemData);
    }

    async remove(id: string): Promise<void> {
        await this.systemService.delete(id);
    }

    async verifyClientSecret(clientSecret: string, system: System): Promise<boolean> {
        return this.systemService.verifyClientSecret(clientSecret, system);
    }

    generateCredentials(): { clientId: string; clientSecret: string; hash: string } {
        return this.systemService.generateCredentials();
    }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { System } from './entities/system.entity';
import { randomBytes } from 'crypto';
import { v4 as uuidv4 } from 'uuid';
import { CreateSystemDto } from './dto/create-system.dto';
@Injectable()
export class SystemsService {
    constructor(
        @InjectRepository(System)
        private systemsRepository: Repository<System>,
    ) {}

    private generateClientId(): string {
        return uuidv4();
    }

    private generateClientSecret(): string {
        return randomBytes(32).toString('hex');
    }

    async findAll(): Promise<System[]> {
        return this.systemsRepository.find();
    }

    async findOne(id: string): Promise<System> {
        const system = await this.systemsRepository.findOne({ where: { id } });
        if (!system) {
            throw new NotFoundException(`System with ID ${id} not found`);
        }
        return system;
    }

    async findByClientId(clientId: string): Promise<System> {
        const system = await this.systemsRepository.findOne({ where: { clientId } });
        if (!system) {
            throw new NotFoundException(`System with client ID ${clientId} not found`);
        }
        return system;
    }

    async create(systemData: CreateSystemDto): Promise<System> {
        const system = this.systemsRepository.create(systemData);
        system.clientId = this.generateClientId();
        system.clientSecret = this.generateClientSecret();
        return this.systemsRepository.save(system);
    }

    async update(id: string, systemData: Partial<System>): Promise<System> {
        const system = await this.findOne(id);
        Object.assign(system, systemData);
        return this.systemsRepository.save(system);
    }

    async remove(id: string): Promise<void> {
        const result = await this.systemsRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`System with ID ${id} not found`);
        }
    }
}

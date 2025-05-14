import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, ILike, FindManyOptions, FindOptionsWhere, Raw } from 'typeorm';
import { System } from '../entities/system.entity';
import { randomBytes, generateKeyPairSync } from 'crypto';
import { v4 as uuidv4 } from 'uuid';
import { CreateSystemDto } from '../dto/create-system.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SystemsService {
    constructor(
        @InjectRepository(System)
        private systemsRepository: Repository<System>,
    ) {}
    async findAll(options?: FindManyOptions<System>): Promise<System[]> {
        return this.systemsRepository.find(options);
    }

    async findOne(id: string): Promise<System> {
        const system = await this.systemsRepository.findOne({ where: { id } });
        if (!system) {
            throw new NotFoundException(`System with ID ${id} not found`);
        }
        return system;
    }

    async create(createSystemDto: CreateSystemDto): Promise<System> {
        const system = this.systemsRepository.create(createSystemDto);
        console.log('!', system);
        return this.systemsRepository.save(system);
    }

    async update(id: string, systemData: Partial<System>): Promise<System> {
        const system = await this.findOne(id);
        Object.assign(system, systemData);
        return this.systemsRepository.save(system);
    }

    async remove(id: string): Promise<void> {
        const result = await this.systemsRepository.softDelete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`System with ID ${id} not found`);
        }
    }
}

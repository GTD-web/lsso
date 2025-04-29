import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, ILike } from 'typeorm';
import { System } from './entities/system.entity';
import { randomBytes, generateKeyPairSync } from 'crypto';
import { v4 as uuidv4 } from 'uuid';
import { CreateSystemDto } from './dto/create-system.dto';

@Injectable()
export class SystemsService {
    constructor(
        @InjectRepository(System)
        private systemsRepository: Repository<System>,
    ) {}

    /**
     * 암호화 키 쌍 생성 - RSA 알고리즘 사용
     */
    private generateKeyPair(): { publicKey: string; privateKey: string } {
        // RSA 키 쌍 생성 (2048비트 강도)
        const { publicKey, privateKey } = generateKeyPairSync('rsa', {
            modulusLength: 2048,
            publicKeyEncoding: {
                type: 'spki',
                format: 'pem',
            },
            privateKeyEncoding: {
                type: 'pkcs8',
                format: 'pem',
            },
        });

        return {
            publicKey,
            privateKey,
        };
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

    async findByPublicKey(publicKey: string): Promise<System> {
        const system = await this.systemsRepository.findOne({ where: { publicKey } });
        if (!system) {
            throw new NotFoundException(`System with public key ${publicKey} not found`);
        }
        return system;
    }

    async create(systemData: CreateSystemDto): Promise<System> {
        const system = this.systemsRepository.create(systemData);

        // 공개키/비밀키 쌍 생성
        const keyPair = this.generateKeyPair();
        system.publicKey = keyPair.publicKey;
        system.secretKey = keyPair.privateKey;

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

    async searchSystems(query: string): Promise<System[]> {
        if (!query || query.trim() === '') {
            return this.findAll();
        }

        const searchQuery = `%${query}%`;

        return this.systemsRepository.find({
            where: [
                { name: ILike(searchQuery) },
                { description: ILike(searchQuery) },

                { allowedOrigin: ILike(searchQuery) },
            ],
        });
    }

    /**
     * 시스템의 API 키(공개키/비밀키)를 재생성합니다
     */
    async regenerateApiKeys(id: string): Promise<System> {
        const system = await this.findOne(id);
        const keyPair = this.generateKeyPair();
        system.publicKey = keyPair.publicKey;
        system.secretKey = keyPair.privateKey;
        return this.systemsRepository.save(system);
    }
}

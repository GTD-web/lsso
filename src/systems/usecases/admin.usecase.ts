import { ILike, FindOptionsWhere, FindManyOptions } from 'typeorm';
import { System } from '../entities/system.entity';
import { Injectable } from '@nestjs/common';
import { SystemsService } from '../services/systems.service';
import { CreateSystemDto } from '../dto/create-system.dto';
import { UpdateSystemDto } from '../dto/update-system.dto';
import { randomBytes } from 'crypto';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';
import { ResponseSystemDto } from '../dto/response-system.dto';
@Injectable()
export class AdminUsecase {
    constructor(private readonly systemsService: SystemsService) {}

    /**
     * 모든 시스템 정보를 조회합니다.
     */
    async findAll(): Promise<System[]> {
        return this.systemsService.findAll();
    }

    /**
     * ID로 시스템을 조회합니다.
     */
    async findOne(id: string): Promise<System> {
        return this.systemsService.findOne(id);
    }

    /**
     * 시스템을 생성합니다.
     */
    async create(createSystemDto: CreateSystemDto): Promise<System> {
        return this.systemsService.create(createSystemDto);
    }

    /**
     * 시스템 정보를 업데이트합니다.
     */
    async update(id: string, updateData: Partial<System>): Promise<System> {
        return this.systemsService.update(id, updateData);
    }

    /**
     * 시스템을 삭제합니다.
     */
    async remove(id: string): Promise<void> {
        return this.systemsService.remove(id);
    }

    /**
     * 검색 조건에 맞는 시스템을 검색합니다.
     */
    async searchSystems(query: string): Promise<System[]> {
        if (!query || query.trim() === '') {
            return this.findAll();
        }
        const options: FindManyOptions<System> = {
            where: [
                { name: ILike(`%${query}%`) },
                { description: ILike(`%${query}%`) },
                { clientId: ILike(`%${query}%`) },
                { domain: ILike(`%${query}%`) },
            ],
        };

        return this.systemsService.findAll(options);
    }

    async registerSystem(createSystemDto: CreateSystemDto): Promise<ResponseSystemDto> {
        const credentials = this.generateCredentials();
        console.log(credentials);
        createSystemDto.clientId = credentials.clientId;
        createSystemDto.clientSecret = credentials.hash;
        const system = await this.systemsService.create(createSystemDto);
        console.log('@', system);
        return { ...system, clientSecret: credentials.clientSecret };
    }

    async regenerateApiKeys(id: string): Promise<ResponseSystemDto> {
        const system = await this.systemsService.findOne(id);
        const credentials = this.generateSecret();
        system.clientSecret = credentials.hash;
        await this.systemsService.update(id, system);
        return { ...system, clientSecret: credentials.clientSecret };
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

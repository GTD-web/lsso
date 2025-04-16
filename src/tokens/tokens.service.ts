import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Token } from './entities/token.entity';
import { JwtService } from '@nestjs/jwt';
import { randomBytes } from 'crypto';
import { User } from 'src/users/entities/user.entity';
import { System } from 'src/systems/entities/system.entity';
import { CreateTokenDto } from './dto/create-token.dto';
import { UsersService } from 'src/users/users.service';
import { SystemsService } from 'src/systems/systems.service';
import { RenewTokenDto } from './dto/renew-token.dto';

@Injectable()
export class TokensService {
    constructor(
        @InjectRepository(Token)
        private tokensRepository: Repository<Token>,
        private jwtService: JwtService,
        private usersService: UsersService,
        private systemsService: SystemsService,
    ) {}

    async generateToken(
        user: User,
        system: System,
        expiresInDays = 30,
    ): Promise<{ secret: string; accessToken: string; tokenExpiresAt: Date }> {
        const secret = randomBytes(16).toString('hex');
        const expiresIn = `${expiresInDays}d`;
        const accessToken = this.jwtService.sign({ sub: user.id }, { expiresIn, secret });

        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + expiresInDays);

        return {
            secret,
            accessToken,
            tokenExpiresAt: expiresAt,
        };
    }

    async verifyToken(token: string, secret: string): Promise<boolean> {
        try {
            this.jwtService.verify(token, { secret });
            return true;
        } catch (error) {
            return false;
        }
    }

    // 모든 토큰 조회
    async findAll(): Promise<Token[]> {
        return this.tokensRepository.find({
            relations: ['user', 'system'],
        });
    }

    // 토큰 ID로 조회
    async findOne(id: string): Promise<Token> {
        const token = await this.tokensRepository.findOne({
            where: { id },
            relations: ['user', 'system'],
        });

        if (!token) {
            throw new NotFoundException(`Token with ID ${id} not found`);
        }

        return token;
    }

    // 시스템 ID로 토큰 조회
    async findBySystemId(systemId: string): Promise<Token[]> {
        return this.tokensRepository.find({
            where: { systemId },
            relations: ['user', 'system'],
        });
    }

    // 사용자 ID로 토큰 조회
    async findByUserId(userId: string): Promise<Token[]> {
        return this.tokensRepository.find({
            where: { userId },
            relations: ['user', 'system'],
        });
    }

    // 토큰 생성
    async createToken(createTokenDto: CreateTokenDto): Promise<Token> {
        const { userId, systemId, expiresInDays = 30 } = createTokenDto;

        // 사용자와 시스템이 존재하는지 확인
        const user = await this.usersService.findOne(userId);
        const system = await this.systemsService.findOne(systemId);

        // 토큰 생성
        const { secret, accessToken, tokenExpiresAt } = await this.generateToken(user, system, expiresInDays);

        const token = this.tokensRepository.create({
            user,
            system,
            userId,
            systemId,
            accessToken,
            secret,
            tokenExpiresAt,
            isActive: true,
        });

        return this.tokensRepository.save(token);
    }

    // 토큰 상태 업데이트
    async updateStatus(id: string, isActive: boolean): Promise<Token> {
        const token = await this.findOne(id);
        token.isActive = isActive;
        return this.tokensRepository.save(token);
    }

    // 토큰 갱신
    async renewToken(id: string, renewTokenDto: RenewTokenDto): Promise<Token> {
        const { expiresInDays = 30 } = renewTokenDto;
        const token = await this.findOne(id);

        // 토큰 재생성
        const { secret, accessToken, tokenExpiresAt } = await this.generateToken(
            token.user,
            token.system,
            expiresInDays,
        );

        // 토큰 업데이트
        token.accessToken = accessToken;
        token.secret = secret;
        token.tokenExpiresAt = tokenExpiresAt;

        return this.tokensRepository.save(token);
    }

    // 토큰 삭제
    async remove(id: string): Promise<void> {
        const token = await this.findOne(id);
        await this.tokensRepository.remove(token);
    }

    async create(user: User, system: System): Promise<Token> {
        const { secret, accessToken, tokenExpiresAt } = await this.generateToken(user, system);

        return this.tokensRepository.create({
            user,
            system,
            userId: user.id,
            systemId: system.id,
            accessToken,
            secret,
            tokenExpiresAt,
            isActive: true,
        });
    }

    async save(token: Token): Promise<Token> {
        return this.tokensRepository.save(token);
    }

    async findByUserAndSystem(user: User, system: System): Promise<Token> {
        return this.tokensRepository.findOne({
            where: {
                userId: user.id,
                systemId: system.id,
            },
            relations: ['user', 'system'],
        });
    }

    async findByAccessToken(accessToken: string): Promise<Token> {
        return this.tokensRepository.findOne({
            where: { accessToken },
            relations: ['user', 'system'],
        });
    }
}

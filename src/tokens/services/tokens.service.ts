import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions } from 'typeorm';
import { Token } from '../entities/token.entity';
import { JwtService } from '@nestjs/jwt';
import { randomBytes, createHmac } from 'crypto';
import { User } from 'src/users/entities/user.entity';
import { System } from 'src/systems/entities/system.entity';
import { CreateTokenDto } from '../dto/create-token.dto';
import { UsersService } from 'src/users/services/users.service';
import { SystemsService } from 'src/systems/services/systems.service';
import { RenewTokenDto } from '../dto/renew-token.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TokensService {
    private readonly jwtSecret: string;

    constructor(
        @InjectRepository(Token)
        private tokensRepository: Repository<Token>,
        private jwtService: JwtService,
        private usersService: UsersService,
        private systemsService: SystemsService,
        private configService: ConfigService,
    ) {
        // 환경 변수에서 JWT 시크릿을 불러옵니다.
        this.jwtSecret = this.configService.get<string>('JWT_SECRET') || 'defaultJwtSecret123!@#';
        if (!this.jwtSecret) {
            console.warn('JWT_SECRET 환경 변수가 설정되지 않았습니다. 기본값이 사용됩니다.');
        }
    }

    /**
     * 모든 토큰을 조회합니다.
     */
    async findAll(options?: FindManyOptions<Token>): Promise<Token[]> {
        return this.tokensRepository.find(options);
    }

    /**
     * ID로 특정 토큰을 조회합니다.
     */
    async findOne(id: string): Promise<Token> {
        const token = await this.tokensRepository.findOne({ where: { id } });
        if (!token) {
            throw new NotFoundException(`Token with ID ${id} not found`);
        }
        return token;
    }

    /**
     * 유저 ID로 토큰을 조회합니다.
     */
    async findByUserId(userId: string): Promise<Token[]> {
        return this.tokensRepository.find({
            where: { user: { id: userId } },
            relations: ['user'],
        });
    }

    /**
     * 액세스 토큰으로 토큰을 조회합니다.
     */
    async findByAccessToken(accessToken: string): Promise<Token> {
        const token = await this.tokensRepository.findOne({
            where: { accessToken },
            relations: ['user'],
        });

        if (!token) {
            throw new NotFoundException(`Token with access token ${accessToken} not found`);
        }

        return token;
    }

    /**
     * 리프레시 토큰으로 토큰을 조회합니다.
     */
    async findByRefreshToken(refreshToken: string): Promise<Token> {
        const token = await this.tokensRepository.findOne({
            where: { refreshToken },
            relations: ['user'],
        });

        if (!token) {
            throw new NotFoundException(`Token with refresh token ${refreshToken} not found`);
        }

        return token;
    }

    /**
     * 새 토큰을 생성합니다.
     */
    async create(createTokenDto: CreateTokenDto): Promise<Token> {
        const { userId, ...tokenData } = createTokenDto;

        // User와 System 객체 조회
        const user = await this.usersService.findOne(userId);

        // 토큰 엔티티 생성
        const token = this.tokensRepository.create({
            ...tokenData,
            user,
        });

        return this.tokensRepository.save(token);
    }

    /**
     * 토큰을 업데이트합니다.
     */
    async update(id: string, updateData: Partial<Token>): Promise<Token> {
        const token = await this.findOne(id);
        Object.assign(token, updateData);
        return this.tokensRepository.save(token);
    }

    /**
     * 토큰을 삭제합니다.
     */
    async remove(id: string): Promise<void> {
        const result = await this.tokensRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Token with ID ${id} not found`);
        }
    }

    /**
     * 사용자의 모든 토큰을 삭제합니다.
     */
    async removeAllUserTokens(userId: string): Promise<void> {
        await this.tokensRepository.delete({ user: { id: userId } });
    }
}

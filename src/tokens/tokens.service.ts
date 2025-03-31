import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Token } from './entities/token.entity';
import { JwtService } from '@nestjs/jwt';
import { randomBytes } from 'crypto';
import { User } from 'src/users/entities/user.entity';
import { System } from 'src/systems/entities/system.entity';

@Injectable()
export class TokensService {
    constructor(
        @InjectRepository(Token)
        private tokensRepository: Repository<Token>,
        private jwtService: JwtService,
    ) {}

    async generateToken(
        user: User,
        system: System,
    ): Promise<{ secret: string; accessToken: string; tokenExpiresAt: Date }> {
        const secret = randomBytes(16).toString('hex');
        const accessToken = this.jwtService.sign({ sub: user.id }, { expiresIn: '24h', secret });

        return {
            secret,
            accessToken,
            tokenExpiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
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

    async create(user: User, system: System): Promise<Token> {
        const { secret, accessToken, tokenExpiresAt } = await this.generateToken(user, system);

        return this.tokensRepository.create({
            user,
            system,
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
        });
    }

    async findByAccessToken(accessToken: string): Promise<Token> {
        console.log(accessToken);
        return this.tokensRepository.findOne({
            where: { accessToken },
        });
    }
}

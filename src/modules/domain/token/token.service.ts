import { Injectable, NotFoundException } from '@nestjs/common';
import { DomainTokenRepository } from './token.repository';
import { BaseService } from '../../../../libs/common/services/base.service';
import { Token } from '../../../../libs/database/entities';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { LessThan } from 'typeorm';

@Injectable()
export class DomainTokenService extends BaseService<Token> {
    constructor(
        private readonly tokenRepository: DomainTokenRepository,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) {
        super(tokenRepository);
    }

    // 액세스 토큰으로 찾기
    async findByAccessToken(accessToken: string): Promise<Token> {
        const token = await this.tokenRepository.findOne({
            where: { accessToken },
        });
        if (!token) {
            throw new NotFoundException('토큰을 찾을 수 없습니다.');
        }
        return token;
    }

    // 리프레시 토큰으로 찾기
    async findByRefreshToken(refreshToken: string): Promise<Token> {
        const token = await this.tokenRepository.findOne({
            where: { refreshToken },
        });
        if (!token) {
            throw new NotFoundException('리프레시 토큰을 찾을 수 없습니다.');
        }
        return token;
    }

    // 전체 토큰 목록 조회
    async findAllTokens(): Promise<Token[]> {
        return this.tokenRepository.findAll({
            order: { createdAt: 'DESC' },
        });
    }

    // 만료된 토큰 조회
    async findExpiredTokens(): Promise<Token[]> {
        const now = new Date();
        return this.tokenRepository.findAll({
            where: {
                tokenExpiresAt: LessThan(now),
                isActive: true,
            },
            order: { tokenExpiresAt: 'ASC' },
        });
    }

    // 만료된 토큰들을 삭제 (중간테이블 정리는 Context에서 처리)
    async deleteExpiredTokens(): Promise<{ deletedCount: number }> {
        const now = new Date();
        const expiredTokens = await this.tokenRepository.findAll({
            where: {
                tokenExpiresAt: LessThan(now),
                isActive: true,
            },
        });
        
        let deletedCount = 0;
        for (const token of expiredTokens) {
            await this.tokenRepository.delete(token.id);
            deletedCount++;
        }
        
        return { deletedCount };
    }

    generateJwtToken(payload: any, expiresIn: string): string {
        return this.jwtService.sign(payload, {
            secret: this.configService.get<string>('GLOBAL_SECRET'),
            expiresIn: expiresIn,
        });
    }

    verifyJwtToken(token: string): any {
        
        return this.jwtService.verify(token, {
            secret: this.configService.get<string>('GLOBAL_SECRET'),
        });
    }
}

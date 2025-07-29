import { Injectable, NotFoundException } from '@nestjs/common';
import { DomainTokenRepository } from './token.repository';
import { BaseService } from '../../../../libs/common/services/base.service';
import { Token } from '../../../../libs/database/entities';

@Injectable()
export class DomainTokenService extends BaseService<Token> {
    constructor(private readonly tokenRepository: DomainTokenRepository) {
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
            order: { tokenExpiresAt: 'ASC' },
        });
    }
}

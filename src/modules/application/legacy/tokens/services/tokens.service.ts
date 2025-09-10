import { Injectable, NotFoundException } from '@nestjs/common';
import { Token, EmployeeToken } from '../../../../../../libs/database/entities';
import { DomainTokenService } from '../../../../domain/token/token.service';
import { DomainEmployeeTokenService } from '../../../../domain/employee-token/employee-token.service';
import { UsersService } from '../../users/services/users.service';
import { IRepositoryOptions } from '../../../../../../libs/common/interfaces/repository.interface';
import { CreateTokenDto } from '../dto/create-token.dto';

@Injectable()
export class TokensService {
    constructor(
        private readonly tokenService: DomainTokenService,
        private readonly employeeTokenService: DomainEmployeeTokenService,
        private readonly usersService: UsersService,
    ) {}

    /**
     * 모든 토큰을 조회합니다.
     */
    async findAll(options?: IRepositoryOptions<Token>): Promise<Token[]> {
        return this.tokenService.findAll(options);
    }

    /**
     * 모든 토큰을 직원 정보와 함께 조회합니다.
     */
    async findAllWithEmployee(): Promise<any[]> {
        const tokens = await this.tokenService.findAll();
        const tokensWithEmployee = [];

        for (const token of tokens) {
            try {
                const employee = await this.getEmployeeByToken(token.id);
                tokensWithEmployee.push({
                    ...token,
                    employee: employee,
                });
            } catch (error) {
                // 직원 정보가 없는 토큰은 employee를 null로 설정
                tokensWithEmployee.push({
                    ...token,
                    employee: null,
                });
            }
        }

        return tokensWithEmployee;
    }

    /**
     * ID로 특정 토큰을 조회합니다.
     */
    async findOne(id: string): Promise<Token> {
        return this.tokenService.findOne({ where: { id } });
    }

    /**
     * ID로 특정 토큰을 직원 정보와 함께 조회합니다.
     */
    async findOneWithEmployee(id: string): Promise<any> {
        const token = await this.tokenService.findOne({ where: { id } });
        if (!token) {
            throw new NotFoundException('토큰을 찾을 수 없습니다.');
        }

        try {
            const employee = await this.getEmployeeByToken(token.id);
            return {
                ...token,
                employee: employee,
            };
        } catch (error) {
            return {
                ...token,
                employee: null,
            };
        }
    }

    /**
     * 직원 ID로 토큰을 조회합니다 (중간테이블 사용).
     */
    async findByEmployeeId(employeeId: string): Promise<Token[]> {
        // 1. EmployeeToken 중간테이블에서 토큰 ID들을 조회
        const employeeTokens = await this.employeeTokenService.findByEmployeeId(employeeId);

        // 2. 토큰 ID들로 실제 토큰들을 조회
        const tokens = [];
        for (const employeeToken of employeeTokens) {
            const token = await this.tokenService.findOne({ where: { id: employeeToken.tokenId } });
            if (token) {
                tokens.push(token);
            }
        }

        return tokens;
    }

    /**
     * 액세스 토큰으로 토큰을 조회합니다.
     */
    async findByAccessToken(accessToken: string): Promise<Token> {
        return this.tokenService.findByAccessToken(accessToken);
    }

    /**
     * 리프레시 토큰으로 토큰을 조회합니다.
     */
    async findByRefreshToken(refreshToken: string): Promise<Token> {
        return this.tokenService.findByRefreshToken(refreshToken);
    }

    /**
     * 새 토큰을 생성하고 직원과 연결합니다.
     */
    async create(createTokenDto: CreateTokenDto): Promise<Token> {
        const { employeeId, ...tokenData } = createTokenDto;

        // 직원 존재 확인
        const employee = await this.usersService.findOne(employeeId);

        // 1. 토큰 생성 (accessToken, refreshToken 등 실제 토큰 데이터만 전달)
        const tokenCreateData = {
            accessToken: tokenData.accessToken || '',
            refreshToken: tokenData.refreshToken || '',
            tokenExpiresAt: tokenData.tokenExpiresAt || new Date(),
            refreshTokenExpiresAt: tokenData.refreshTokenExpiresAt,
            clientInfo: tokenData.clientInfo,
            ipAddress: tokenData.ipAddress,
        };
        const token = await this.tokenService.create(tokenCreateData);

        // 2. 직원-토큰 관계 생성
        await this.employeeTokenService.createOrUpdateRelation(employeeId, token.id, {});

        return token;
    }

    /**
     * 토큰을 업데이트합니다.
     */
    async update(id: string, updateData: Partial<Token>): Promise<Token> {
        return this.tokenService.update(id, updateData);
    }

    /**
     * 토큰을 삭제합니다.
     */
    async remove(id: string): Promise<void> {
        // 1. 중간테이블에서 관련 관계 삭제
        const employeeTokens = await this.employeeTokenService.findByTokenId(id);
        for (const employeeToken of employeeTokens) {
            await this.employeeTokenService.delete(employeeToken.id);
        }

        // 2. 토큰 삭제
        await this.tokenService.delete(id);
    }

    /**
     * 직원의 모든 토큰을 삭제합니다.
     */
    async removeAllEmployeeTokens(employeeId: string): Promise<void> {
        // 1. 직원의 모든 토큰 관계 조회
        const employeeTokens = await this.employeeTokenService.findByEmployeeId(employeeId);

        // 2. 각 토큰과 관계를 삭제
        for (const employeeToken of employeeTokens) {
            await this.tokenService.delete(employeeToken.tokenId);
            await this.employeeTokenService.delete(employeeToken.id);
        }
    }

    /**
     * 토큰으로 직원 정보를 조회합니다.
     */
    async getEmployeeByToken(tokenId: string): Promise<any> {
        const employeeTokens = await this.employeeTokenService.findByTokenId(tokenId);
        if (employeeTokens.length === 0) {
            throw new NotFoundException('토큰에 연결된 직원을 찾을 수 없습니다.');
        }

        // 첫 번째 관계에서 직원 정보 조회 (일반적으로 토큰은 하나의 직원에만 연결됨)
        const employeeToken = employeeTokens[0];
        return this.usersService.findOne(employeeToken.employeeId);
    }

    /**
     * JWT 토큰 생성
     */
    generateJwtToken(payload: any, expiresIn: string): string {
        return this.tokenService.generateJwtToken(payload, expiresIn);
    }

    /**
     * JWT 토큰 검증
     */
    verifyJwtToken(token: string): any {
        return this.tokenService.verifyJwtToken(token);
    }
}

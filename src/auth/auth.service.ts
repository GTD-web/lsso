import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import * as bcrypt from 'bcrypt';
import { SystemsService } from 'src/systems/systems.service';
import { UsersService } from 'src/users/users.service';
import { TokensService } from 'src/tokens/tokens.service';
import { Token } from 'src/tokens/entities/token.entity';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService,
        private readonly systemService: SystemsService,
        private readonly tokenService: TokensService,
    ) {}

    async login(loginDto: LoginDto): Promise<LoginResponseDto> {
        const { email, password, client_id } = loginDto;

        const system = await this.systemService.findByClientId(client_id);
        if (!system) {
            throw new NotFoundException('존재하지 않는 시스템입니다.');
        }

        const user = await this.userService.findByEmail(email, ['userRoles']);
        if (!user) {
            throw new NotFoundException('존재하지 않는 사용자입니다.');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('비밀번호가 일치하지 않습니다.');
        }

        let token = await this.tokenService.findByUserAndSystem(user, system);

        if (token) {
            const { secret, accessToken, tokenExpiresAt } = await this.tokenService.generateToken(user, system);
            token.secret = secret;
            token.accessToken = accessToken;
            token.tokenExpiresAt = tokenExpiresAt;
        } else {
            token = await this.tokenService.create(user, system);
        }
        const newToken = await this.tokenService.save(token);
        return {
            accessToken: newToken.accessToken,
            secret: newToken.secret,
            expiresAt: newToken.tokenExpiresAt,
            email: user.email,
            name: user.name,
            employeeNumber: user.employeeNumber,
        };
    }

    async verifyToken(token: string): Promise<boolean> {
        if (!token) {
            throw new UnauthorizedException('토큰이 없습니다.');
        }
        const tokenEntity = await this.tokenService.findByAccessToken(token);
        if (!tokenEntity) {
            throw new NotFoundException('존재하지 않는 토큰입니다.');
        }
        if (tokenEntity.tokenExpiresAt < new Date()) {
            throw new UnauthorizedException('만료된 토큰입니다.');
        }

        const isTokenValid = await this.tokenService.verifyToken(tokenEntity.accessToken, tokenEntity.secret);
        if (!isTokenValid) {
            throw new UnauthorizedException('유효하지 않은 토큰입니다.');
        }
        return true;
    }
}

import { ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
declare const JwtAuthGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class JwtAuthGuard extends JwtAuthGuard_base {
    private jwtService;
    private configService;
    private readonly jwtSecret;
    constructor(jwtService: JwtService, configService: ConfigService);
    canActivate(context: ExecutionContext): boolean;
    private extractTokenFromHeader;
}
export {};

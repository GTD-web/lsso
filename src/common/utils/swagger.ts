import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { UserResponseDto } from '../../users/dto/user-response.dto';
import { ApiResponseDto, ErrorResponseDto } from '../dto/api-response.dto';
import { ResponseSystemDto } from '../../systems/dto';

// 토큰 API DTO
import { TokenResponseDto, CreateTokenDto, UpdateTokenStatusDto, RenewTokenDto } from '../../tokens/dto';

// 로그 API DTO
import { LogResponseDto, LogsResponseDto, LogFilterDto } from '../../logs/dto';

// 시스템 DTO 추가
const systemDtos = [ResponseSystemDto];

// 토큰 DTO 추가
const tokenDtos = [TokenResponseDto, CreateTokenDto, UpdateTokenStatusDto, RenewTokenDto];

// 로그 DTO 추가
const logDtos = [LogResponseDto, LogsResponseDto, LogFilterDto];

export function setupSwagger(app: INestApplication, dtos: any[]) {
    const config = new DocumentBuilder()
        .setTitle('LSSO API')
        .setDescription('LSSO(Login SSO) API')
        .setVersion('1.0')
        .addBearerAuth()
        .build();

    const extraModels = [
        ...dtos,
        UserResponseDto,
        ApiResponseDto,
        ErrorResponseDto,
        ...systemDtos,
        ...tokenDtos,
        ...logDtos,
    ];

    const document = SwaggerModule.createDocument(app, config, {
        extraModels: extraModels,
    });

    SwaggerModule.setup('api-docs', app, document);
}

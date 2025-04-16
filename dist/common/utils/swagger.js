"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSwagger = setupSwagger;
const swagger_1 = require("@nestjs/swagger");
const user_response_dto_1 = require("../../users/dto/user-response.dto");
const api_response_dto_1 = require("../dto/api-response.dto");
const dto_1 = require("../../systems/dto");
const dto_2 = require("../../tokens/dto");
const dto_3 = require("../../logs/dto");
const systemDtos = [dto_1.ResponseSystemDto];
const tokenDtos = [dto_2.TokenResponseDto, dto_2.CreateTokenDto, dto_2.UpdateTokenStatusDto, dto_2.RenewTokenDto];
const logDtos = [dto_3.LogResponseDto, dto_3.LogsResponseDto, dto_3.LogFilterDto];
function setupSwagger(app, dtos) {
    const config = new swagger_1.DocumentBuilder()
        .setTitle('LSSO API')
        .setDescription('LSSO(Login SSO) API')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const extraModels = [
        ...dtos,
        user_response_dto_1.UserResponseDto,
        api_response_dto_1.ApiResponseDto,
        api_response_dto_1.ErrorResponseDto,
        ...systemDtos,
        ...tokenDtos,
        ...logDtos,
    ];
    const document = swagger_1.SwaggerModule.createDocument(app, config, {
        extraModels: extraModels,
    });
    swagger_1.SwaggerModule.setup('api-docs', app, document);
}
//# sourceMappingURL=swagger.js.map
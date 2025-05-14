"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const app_module_1 = require("./app.module");
const swagger_1 = require("./common/utils/swagger");
const dtos = require("./dtos.index");
const logging_interceptor_1 = require("./common/interceptors/logging.interceptor");
const logs_service_1 = require("./logs/logs.service");
const systems_service_1 = require("./systems/services/systems.service");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
    }));
    app.setGlobalPrefix('api');
    (0, swagger_1.setupSwagger)(app, [...Object.values(dtos)]);
    app.enableCors();
    app.useGlobalInterceptors(new logging_interceptor_1.LoggingInterceptor(app.get(logs_service_1.LogsService), app.get(systems_service_1.SystemsService)));
    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
//# sourceMappingURL=main.js.map
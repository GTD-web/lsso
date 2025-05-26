import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AppService {
    constructor(private configService: ConfigService) {}
    getHello(): string {
        const testenv = this.configService.get<string>('GLOBAL_SECRET');
        return testenv || 'Hello World!';
    }
}

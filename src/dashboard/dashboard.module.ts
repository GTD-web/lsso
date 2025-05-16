import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { UsersModule } from '../users/users.module';
import { TokensModule } from '../tokens/tokens.module';
import { LogsModule } from '../logs/logs.module';
import { SystemsModule } from '../systems/systems.module';

@Module({
    imports: [UsersModule, TokensModule, LogsModule, SystemsModule],
    controllers: [DashboardController],
    providers: [DashboardService],
    exports: [DashboardService],
})
export class DashboardModule {}

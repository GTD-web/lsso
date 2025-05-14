import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersService } from './services/users.service';
import { WebhookUsersController } from './controllers/webhook.controller';
import { AdminUsersController } from './controllers/admin.controller';
import { DomainUsersController } from './controllers/domain.controller';
import { AdminUsecase } from './usecases/admin.usecase';
import { WebhookUsecase } from './usecases/webhook.usecase';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [UsersService, AdminUsecase, WebhookUsecase],
    controllers: [WebhookUsersController, AdminUsersController, DomainUsersController],
    exports: [UsersService],
})
export class UsersModule {}

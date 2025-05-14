import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { System } from './entities/system.entity';
import { SystemsService } from './services/systems.service';
import { AdminSystemsController } from './controllers/admin.controller';
import { DomainSystemsController } from './controllers/domain.controller';
import { AdminUsecase } from './usecases/admin.usecase';
@Module({
    imports: [TypeOrmModule.forFeature([System])],
    providers: [SystemsService, AdminUsecase],
    controllers: [AdminSystemsController, DomainSystemsController],
    exports: [SystemsService, AdminUsecase],
})
export class SystemsModule {}

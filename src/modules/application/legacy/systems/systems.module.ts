import { Module } from '@nestjs/common';
import { SystemsService } from './services/systems.service';
import { AdminSystemsController } from './controllers/admin.controller';
import { AdminUsecase } from './usecases/admin.usecase';
import { DomainSystemModule } from '../../../domain/system/system.module';

@Module({
    imports: [DomainSystemModule],
    providers: [SystemsService, AdminUsecase],
    controllers: [AdminSystemsController],
    exports: [SystemsService, AdminUsecase],
})
export class SystemsModule {}

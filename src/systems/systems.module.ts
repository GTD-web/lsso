import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { System } from './entities/system.entity';
import { SystemsService } from './systems.service';
import { SystemsController } from './systems.controller';
import { AdminSystemsController } from './admin-systems.controller';

@Module({
    imports: [TypeOrmModule.forFeature([System])],
    providers: [SystemsService],
    controllers: [SystemsController, AdminSystemsController],
    exports: [SystemsService],
})
export class SystemsModule {}

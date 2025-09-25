import { Module } from '@nestjs/common';
import { SystemController } from './system.controller';
import { SystemRoleController } from './system-role.controller';
import { SystemApplicationService } from './system-application.service';
import { SystemManagementContextModule } from '../../../context/system-management/system-management-context.module';

@Module({
    imports: [SystemManagementContextModule],
    controllers: [SystemController, SystemRoleController],
    providers: [SystemApplicationService],
    exports: [SystemApplicationService],
})
export class SystemModule {}

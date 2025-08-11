import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { AdminUsersController } from './controllers/admin.controller';
import { AdminUsecase } from './usecases/admin.usecase';
import { JwtModule } from '@nestjs/jwt';
import { MailModule } from '../mail/mail.module';
import { DomainEmployeeModule } from '../../../domain/employee/employee.module';
import { DomainDepartmentModule } from '../../../domain/department/department.module';
import { DomainPositionModule } from '../../../domain/position/position.module';
import { DomainRankModule } from '../../../domain/rank/rank.module';
import { DomainEmployeeDepartmentPositionModule } from '../../../domain/employee-department-position/employee-department-position.module';

@Module({
    imports: [
        MailModule,
        JwtModule.register({}),
        DomainEmployeeModule,
        DomainDepartmentModule,
        DomainPositionModule,
        DomainRankModule,
        DomainEmployeeDepartmentPositionModule,
        MailModule,
    ],
    providers: [UsersService, AdminUsecase],
    controllers: [AdminUsersController],
    exports: [UsersService],
})
export class UsersModule {}

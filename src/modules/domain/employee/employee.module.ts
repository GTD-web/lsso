import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DomainEmployeeService } from './employee.service';
import { DomainEmployeeRepository } from './employee.repository';
import { Employee } from './employee.entity';
import { DomainEmployeeValidationService } from './employee-validation.service';

@Module({
    imports: [TypeOrmModule.forFeature([Employee])],
    providers: [DomainEmployeeService, DomainEmployeeRepository, DomainEmployeeValidationService],
    exports: [DomainEmployeeService, DomainEmployeeValidationService],
})
export class DomainEmployeeModule {}

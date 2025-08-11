import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DomainSystemService } from './system.service';
import { DomainSystemRepository } from './system.repository';
import { System } from '../../../../libs/database/entities';

@Module({
    imports: [TypeOrmModule.forFeature([System])],
    providers: [DomainSystemService, DomainSystemRepository],
    exports: [DomainSystemService],
})
export class DomainSystemModule {}

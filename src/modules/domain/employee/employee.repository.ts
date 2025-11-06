import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './employee.entity';
import { BaseRepository } from '../../../../libs/common/repositories/base.repository';
import { IRepositoryOptions } from 'libs/common/interfaces/repository.interface';

@Injectable()
export class DomainEmployeeRepository extends BaseRepository<Employee> {
    constructor(
        @InjectRepository(Employee)
        repository: Repository<Employee>,
    ) {
        super(repository);
    }

    async findAll(repositoryOptions?: IRepositoryOptions<Employee>): Promise<Employee[]> {
        const repository = repositoryOptions?.queryRunner
            ? repositoryOptions.queryRunner.manager.getRepository(this.repository.target)
            : this.repository;
        const result = await repository.find({
            where: repositoryOptions?.where,
            relations: repositoryOptions?.relations,
            select: repositoryOptions?.select,
            order: repositoryOptions?.order,
            skip: repositoryOptions?.skip,
            take: repositoryOptions?.take,
            withDeleted: repositoryOptions?.withDeleted,
        });
        return result.filter((employee) => employee.employeeNumber !== '00000');
    }
}

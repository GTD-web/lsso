import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Department } from '../../../../libs/database/entities';
import { BaseRepository } from '../../../../libs/common/repositories/base.repository';
import { IRepositoryOptions } from 'libs/common/interfaces/repository.interface';

@Injectable()
export class DomainDepartmentRepository extends BaseRepository<Department> {
    constructor(
        @InjectRepository(Department)
        repository: Repository<Department>,
    ) {
        super(repository);
    }

    async findAll(repositoryOptions?: IRepositoryOptions<Department>): Promise<Department[]> {
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
        return result.filter((department) => department.isException === false);
    }
}

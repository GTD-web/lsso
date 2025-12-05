import { MigrationInterface, QueryRunner, TableColumn, TableIndex } from 'typeorm';

export class AddSoftDeleteToDepartment1757500000012 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'departments',
            new TableColumn({
                name: 'isDeleted',
                type: 'boolean',
                default: false,
                comment: '삭제 여부',
            }),
        );

        await queryRunner.addColumn(
            'departments',
            new TableColumn({
                name: 'deletedAt',
                type: 'timestamp',
                isNullable: true,
                comment: '삭제일',
            }),
        );

        // Soft Delete용 인덱스
        await queryRunner.createIndex(
            'departments',
            new TableIndex({
                name: 'IDX_departments_not_deleted',
                columnNames: ['id'],
                where: 'is_deleted = false',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropIndex('departments', 'IDX_departments_not_deleted');
        await queryRunner.dropColumn('departments', 'deletedAt');
        await queryRunner.dropColumn('departments', 'isDeleted');
    }
}


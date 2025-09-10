import { MigrationInterface, QueryRunner, Table, TableIndex, TableForeignKey } from 'typeorm';

export class CreateEmployeeFcmTokenTable1703510001000 implements MigrationInterface {
    name = 'CreateEmployeeFcmTokenTable1703510001000';

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Employee-FCM Token 중간테이블 생성
        await queryRunner.createTable(
            new Table({
                name: 'employee_fcm_tokens',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'gen_random_uuid()',
                    },
                    {
                        name: 'employeeId',
                        type: 'uuid',
                        comment: '직원 ID',
                    },
                    {
                        name: 'fcmTokenId',
                        type: 'uuid',
                        comment: 'FCM 토큰 ID',
                    },
                    {
                        name: 'createdAt',
                        type: 'timestamp',
                        default: 'CURRENT_TIMESTAMP',
                        comment: '연결 생성일',
                    },
                    {
                        name: 'updatedAt',
                        type: 'timestamp',
                        default: 'CURRENT_TIMESTAMP',
                        onUpdate: 'CURRENT_TIMESTAMP',
                        comment: '연결 수정일',
                    },
                ],
            }),
            true,
        );

        // 인덱스 생성
        await queryRunner.createIndex(
            'employee_fcm_tokens',
            new TableIndex({
                name: 'IDX_employee_fcm_tokens_employeeId_fcmTokenId',
                columnNames: ['employeeId', 'fcmTokenId'],
                isUnique: true,
            }),
        );

        await queryRunner.createIndex(
            'employee_fcm_tokens',
            new TableIndex({
                name: 'IDX_employee_fcm_tokens_employeeId',
                columnNames: ['employeeId'],
            }),
        );

        await queryRunner.createIndex(
            'employee_fcm_tokens',
            new TableIndex({
                name: 'IDX_employee_fcm_tokens_fcmTokenId',
                columnNames: ['fcmTokenId'],
            }),
        );

        // 외래키 제약조건 추가
        await queryRunner.createForeignKey(
            'employee_fcm_tokens',
            new TableForeignKey({
                name: 'FK_employee_fcm_tokens_employeeId',
                columnNames: ['employeeId'],
                referencedTableName: 'employees',
                referencedColumnNames: ['id'],
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            }),
        );

        await queryRunner.createForeignKey(
            'employee_fcm_tokens',
            new TableForeignKey({
                name: 'FK_employee_fcm_tokens_fcmTokenId',
                columnNames: ['fcmTokenId'],
                referencedTableName: 'fcm_tokens',
                referencedColumnNames: ['id'],
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // 외래키 제약조건 삭제
        await queryRunner.dropForeignKey('employee_fcm_tokens', 'FK_employee_fcm_tokens_fcmTokenId');
        await queryRunner.dropForeignKey('employee_fcm_tokens', 'FK_employee_fcm_tokens_employeeId');

        // 인덱스 삭제
        await queryRunner.dropIndex('employee_fcm_tokens', 'IDX_employee_fcm_tokens_fcmTokenId');
        await queryRunner.dropIndex('employee_fcm_tokens', 'IDX_employee_fcm_tokens_employeeId');
        await queryRunner.dropIndex('employee_fcm_tokens', 'IDX_employee_fcm_tokens_employeeId_fcmTokenId');

        // 테이블 삭제
        await queryRunner.dropTable('employee_fcm_tokens');
    }
}

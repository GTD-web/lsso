import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class CreateFcmTokenTable1703510000000 implements MigrationInterface {
    name = 'CreateFcmTokenTable1703510000000';

    public async up(queryRunner: QueryRunner): Promise<void> {
        // FCM 토큰 테이블 생성
        await queryRunner.createTable(
            new Table({
                name: 'fcm_tokens',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'gen_random_uuid()',
                    },
                    {
                        name: 'fcmToken',
                        type: 'text',
                        isUnique: true,
                        comment: 'FCM 토큰 값',
                    },
                    {
                        name: 'deviceType',
                        type: 'enum',
                        enum: ['ANDROID', 'IOS', 'PC'],
                        default: "'PC'",
                        comment: '디바이스 타입',
                    },
                    {
                        name: 'deviceInfo',
                        type: 'json',
                        isNullable: true,
                        comment: '디바이스 정보',
                    },
                    {
                        name: 'isActive',
                        type: 'boolean',
                        default: true,
                        comment: '활성화 상태',
                    },
                    {
                        name: 'createdAt',
                        type: 'timestamp',
                        default: 'CURRENT_TIMESTAMP',
                        comment: '생성일',
                    },
                    {
                        name: 'updatedAt',
                        type: 'timestamp',
                        default: 'CURRENT_TIMESTAMP',
                        onUpdate: 'CURRENT_TIMESTAMP',
                        comment: '수정일',
                    },
                ],
            }),
            true,
        );

        // 인덱스 생성
        await queryRunner.createIndex(
            'fcm_tokens',
            new TableIndex({
                name: 'IDX_fcm_tokens_fcmToken',
                columnNames: ['fcmToken'],
                isUnique: true,
            }),
        );

        await queryRunner.createIndex(
            'fcm_tokens',
            new TableIndex({
                name: 'IDX_fcm_tokens_isActive',
                columnNames: ['isActive'],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // 인덱스 삭제
        await queryRunner.dropIndex('fcm_tokens', 'IDX_fcm_tokens_isActive');
        await queryRunner.dropIndex('fcm_tokens', 'IDX_fcm_tokens_fcmToken');

        // 테이블 삭제
        await queryRunner.dropTable('fcm_tokens');
    }
}

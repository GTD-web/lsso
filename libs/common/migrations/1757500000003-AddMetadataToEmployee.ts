import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddMetadataToEmployee1757500000003 implements MigrationInterface {
    name = 'AddMetadataToEmployee1757500000003';

    public async up(queryRunner: QueryRunner): Promise<void> {
        // employees 테이블에 metadata 컬럼 추가 (JSONB 타입)
        await queryRunner.query(`
            ALTER TABLE "employees" 
            ADD COLUMN "metadata" jsonb NULL
        `);

        await queryRunner.query(`
            COMMENT ON COLUMN "employees"."metadata" IS '메타데이터'
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // rollback - metadata 컬럼 삭제
        await queryRunner.query(`
            ALTER TABLE "employees" 
            DROP COLUMN "metadata"
        `);
    }
}

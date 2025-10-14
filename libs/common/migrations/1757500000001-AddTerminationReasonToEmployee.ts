import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTerminationReasonToEmployee1757500000001 implements MigrationInterface {
    name = 'AddTerminationReasonToEmployee1757500000001';

    public async up(queryRunner: QueryRunner): Promise<void> {
        // employees 테이블에 terminationReason 컬럼 추가
        await queryRunner.query(`
            ALTER TABLE "employees" 
            ADD COLUMN "terminationReason" text NULL
        `);

        await queryRunner.query(`
            COMMENT ON COLUMN "employees"."terminationReason" IS '퇴사 사유'
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // rollback - terminationReason 컬럼 삭제
        await queryRunner.query(`
            ALTER TABLE "employees" 
            DROP COLUMN "terminationReason"
        `);
    }
}

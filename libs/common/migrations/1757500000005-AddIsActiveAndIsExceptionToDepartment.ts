import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddIsActiveAndIsExceptionToDepartment1757500000005 implements MigrationInterface {
    name = 'AddIsActiveAndIsExceptionToDepartment1757500000005';

    public async up(queryRunner: QueryRunner): Promise<void> {
        // isActive 컬럼 추가
        await queryRunner.query(`
            ALTER TABLE "departments" 
            ADD COLUMN "isActive" boolean NOT NULL DEFAULT true
        `);

        // isException 컬럼 추가
        await queryRunner.query(`
            ALTER TABLE "departments" 
            ADD COLUMN "isException" boolean NOT NULL DEFAULT false
        `);

        // 컬럼에 코멘트 추가
        await queryRunner.query(`COMMENT ON COLUMN "departments"."isActive" IS '활성화 상태'`);
        await queryRunner.query(`COMMENT ON COLUMN "departments"."isException" IS '예외처리 여부'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // isException 컬럼 삭제
        await queryRunner.query(`ALTER TABLE "departments" DROP COLUMN "isException"`);

        // isActive 컬럼 삭제
        await queryRunner.query(`ALTER TABLE "departments" DROP COLUMN "isActive"`);
    }
}

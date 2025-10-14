import { MigrationInterface, QueryRunner } from 'typeorm';

export class MakeEmployeeEmailNullable1757500000000 implements MigrationInterface {
    name = 'MakeEmployeeEmailNullable1757500000000';

    public async up(queryRunner: QueryRunner): Promise<void> {
        // employees 테이블의 email 컬럼을 nullable로 변경
        await queryRunner.query(`ALTER TABLE "employees" ALTER COLUMN "email" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // rollback - email을 다시 NOT NULL로 변경 (데이터가 있는 경우 주의)
        await queryRunner.query(`ALTER TABLE "employees" ALTER COLUMN "email" SET NOT NULL`);
    }
}

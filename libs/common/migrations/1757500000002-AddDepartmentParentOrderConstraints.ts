import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddDepartmentParentOrderConstraints1757500000002 implements MigrationInterface {
    name = 'AddDepartmentParentOrderConstraints1757500000002';

    public async up(queryRunner: QueryRunner): Promise<void> {
        // 1. 중복된 순서를 가진 부서들을 재정렬
        await this.reorderDuplicateDepartments(queryRunner);

        // 2. 인덱스 생성
        await queryRunner.query(`
            CREATE INDEX "IDX_departments_parent_order" 
            ON "departments" ("parentDepartmentId", "order")
        `);

        // 3. 유니크 제약 조건 생성 (하위 부서용 - parentDepartmentId가 NULL이 아닌 경우)
        await queryRunner.query(`
            ALTER TABLE "departments" 
            ADD CONSTRAINT "UQ_departments_parent_order" 
            UNIQUE ("parentDepartmentId", "order")
        `);

        // 4. 최상위 부서용 유니크 인덱스 생성 (parentDepartmentId가 NULL인 경우)
        await queryRunner.query(`
            CREATE UNIQUE INDEX "UQ_departments_root_order" 
            ON "departments" ("order") 
            WHERE "parentDepartmentId" IS NULL
        `);
    }

    private async reorderDuplicateDepartments(queryRunner: QueryRunner): Promise<void> {
        // 최상위 부서들 재정렬 (parentDepartmentId IS NULL)
        const rootDepartments = await queryRunner.query(`
            SELECT id, "order"
            FROM departments
            WHERE "parentDepartmentId" IS NULL
            ORDER BY "order" ASC, "createdAt" ASC
        `);

        for (let i = 0; i < rootDepartments.length; i++) {
            if (rootDepartments[i].order !== i) {
                await queryRunner.query(`UPDATE departments SET "order" = $1 WHERE id = $2`, [
                    i,
                    rootDepartments[i].id,
                ]);
            }
        }

        // 각 부모별 하위 부서들 재정렬
        const parentIds = await queryRunner.query(`
            SELECT DISTINCT "parentDepartmentId"
            FROM departments
            WHERE "parentDepartmentId" IS NOT NULL
        `);

        for (const parent of parentIds) {
            const childDepartments = await queryRunner.query(
                `
                SELECT id, "order"
                FROM departments
                WHERE "parentDepartmentId" = $1
                ORDER BY "order" ASC, "createdAt" ASC
            `,
                [parent.parentDepartmentId],
            );

            for (let i = 0; i < childDepartments.length; i++) {
                if (childDepartments[i].order !== i) {
                    await queryRunner.query(`UPDATE departments SET "order" = $1 WHERE id = $2`, [
                        i,
                        childDepartments[i].id,
                    ]);
                }
            }
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // 최상위 부서용 유니크 인덱스 삭제
        await queryRunner.query(`
            DROP INDEX "UQ_departments_root_order"
        `);

        // 유니크 제약 조건 삭제
        await queryRunner.query(`
            ALTER TABLE "departments" 
            DROP CONSTRAINT "UQ_departments_parent_order"
        `);

        // 인덱스 삭제
        await queryRunner.query(`
            DROP INDEX "IDX_departments_parent_order"
        `);
    }
}

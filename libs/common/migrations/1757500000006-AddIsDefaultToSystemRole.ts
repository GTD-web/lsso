import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddIsDefaultToSystemRole1757500000006 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // system_roles 테이블에 isDefault 컬럼 추가
        await queryRunner.addColumn(
            'system_roles',
            new TableColumn({
                name: 'isDefault',
                type: 'boolean',
                default: false,
                comment: '기본 역할 여부 (직원 생성 시 자동 할당)',
            }),
        );

        // isDefault 필드에 인덱스 추가 (기본 역할 조회 성능 향상)
        await queryRunner.query(`
            CREATE INDEX "IDX_system_roles_isDefault" ON "system_roles" ("isDefault") WHERE "isDefault" = true;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // 인덱스 삭제
        await queryRunner.query(`DROP INDEX "IDX_system_roles_isDefault"`);

        // isDefault 컬럼 삭제
        await queryRunner.dropColumn('system_roles', 'isDefault');
    }
}


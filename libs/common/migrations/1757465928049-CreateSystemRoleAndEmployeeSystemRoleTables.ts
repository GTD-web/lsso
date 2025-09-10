import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateSystemRoleAndEmployeeSystemRoleTables1757465928049 implements MigrationInterface {
    name = 'CreateSystemRoleAndEmployeeSystemRoleTables1757465928049'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee_fcm_tokens" DROP CONSTRAINT "FK_employee_fcm_tokens_employeeId"`);
        await queryRunner.query(`ALTER TABLE "employee_fcm_tokens" DROP CONSTRAINT "FK_employee_fcm_tokens_fcmTokenId"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_fcm_tokens_fcmToken"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_fcm_tokens_isActive"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_employee_fcm_tokens_employeeId_fcmTokenId"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_employee_fcm_tokens_employeeId"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_employee_fcm_tokens_fcmTokenId"`);
        await queryRunner.query(`CREATE TABLE "employee_system_roles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "employeeId" uuid NOT NULL, "systemRoleId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_5783dc9dcbdf9b172fc371906f8" PRIMARY KEY ("id")); COMMENT ON COLUMN "employee_system_roles"."employeeId" IS '직원 ID'; COMMENT ON COLUMN "employee_system_roles"."systemRoleId" IS '시스템 역할 ID'; COMMENT ON COLUMN "employee_system_roles"."createdAt" IS '생성일'; COMMENT ON COLUMN "employee_system_roles"."updatedAt" IS '수정일'`);
        await queryRunner.query(`CREATE INDEX "IDX_e508c8388a1d064a012ba89dbe" ON "employee_system_roles" ("createdAt") `);
        await queryRunner.query(`CREATE INDEX "IDX_3b2527c470cafc68f691e5d53e" ON "employee_system_roles" ("systemRoleId") `);
        await queryRunner.query(`CREATE INDEX "IDX_5a98934e019eb924798b9c78ab" ON "employee_system_roles" ("employeeId") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_6736855b7646fcfa2ca749e473" ON "employee_system_roles" ("employeeId", "systemRoleId") `);
        await queryRunner.query(`CREATE TABLE "system_roles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "systemId" uuid NOT NULL, "roleName" character varying NOT NULL, "roleCode" character varying NOT NULL, "description" character varying, "permissions" jsonb NOT NULL DEFAULT '[]', "sortOrder" integer NOT NULL DEFAULT '0', "isActive" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_468b99ca2261e84113b6ec40814" PRIMARY KEY ("id")); COMMENT ON COLUMN "system_roles"."systemId" IS '시스템 ID'; COMMENT ON COLUMN "system_roles"."roleName" IS '역할 이름'; COMMENT ON COLUMN "system_roles"."roleCode" IS '역할 코드'; COMMENT ON COLUMN "system_roles"."description" IS '역할 설명'; COMMENT ON COLUMN "system_roles"."permissions" IS '권한 목록'; COMMENT ON COLUMN "system_roles"."sortOrder" IS '정렬 순서'; COMMENT ON COLUMN "system_roles"."isActive" IS '활성화 상태'; COMMENT ON COLUMN "system_roles"."createdAt" IS '생성일'; COMMENT ON COLUMN "system_roles"."updatedAt" IS '수정일'`);
        await queryRunner.query(`CREATE INDEX "IDX_eba33333c67120dbd220ee7c59" ON "system_roles" ("systemId", "isActive") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_ccb2d62e62d1e00e2329a376e1" ON "system_roles" ("systemId", "roleCode") `);
        await queryRunner.query(`ALTER TABLE "employees" DROP COLUMN "fcmToken"`);
        await queryRunner.query(`ALTER TABLE "fcm_tokens" ALTER COLUMN "createdAt" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "fcm_tokens" ALTER COLUMN "updatedAt" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "employee_fcm_tokens" ALTER COLUMN "createdAt" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "employee_fcm_tokens" ALTER COLUMN "updatedAt" SET DEFAULT now()`);
        await queryRunner.query(`CREATE INDEX "IDX_c5678152794bb6ada963377ab7" ON "fcm_tokens" ("isActive") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_e79e6dbaf05daf03a96acbb788" ON "fcm_tokens" ("fcmToken") `);
        await queryRunner.query(`CREATE INDEX "IDX_af90869ef0131993aa18560d2f" ON "employee_fcm_tokens" ("fcmTokenId") `);
        await queryRunner.query(`CREATE INDEX "IDX_ac40e7a5f6714bbfc640fe1685" ON "employee_fcm_tokens" ("employeeId") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_a15f0f9d1f1bf13653763a0cd9" ON "employee_fcm_tokens" ("employeeId", "fcmTokenId") `);
        await queryRunner.query(`ALTER TABLE "employee_fcm_tokens" ADD CONSTRAINT "FK_ac40e7a5f6714bbfc640fe1685c" FOREIGN KEY ("employeeId") REFERENCES "employees"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "employee_fcm_tokens" ADD CONSTRAINT "FK_af90869ef0131993aa18560d2f2" FOREIGN KEY ("fcmTokenId") REFERENCES "fcm_tokens"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "employee_system_roles" ADD CONSTRAINT "FK_5a98934e019eb924798b9c78aba" FOREIGN KEY ("employeeId") REFERENCES "employees"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "employee_system_roles" ADD CONSTRAINT "FK_3b2527c470cafc68f691e5d53ec" FOREIGN KEY ("systemRoleId") REFERENCES "system_roles"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "system_roles" ADD CONSTRAINT "FK_91c27a16474e04fa0feae7f5241" FOREIGN KEY ("systemId") REFERENCES "systems"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "system_roles" DROP CONSTRAINT "FK_91c27a16474e04fa0feae7f5241"`);
        await queryRunner.query(`ALTER TABLE "employee_system_roles" DROP CONSTRAINT "FK_3b2527c470cafc68f691e5d53ec"`);
        await queryRunner.query(`ALTER TABLE "employee_system_roles" DROP CONSTRAINT "FK_5a98934e019eb924798b9c78aba"`);
        await queryRunner.query(`ALTER TABLE "employee_fcm_tokens" DROP CONSTRAINT "FK_af90869ef0131993aa18560d2f2"`);
        await queryRunner.query(`ALTER TABLE "employee_fcm_tokens" DROP CONSTRAINT "FK_ac40e7a5f6714bbfc640fe1685c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a15f0f9d1f1bf13653763a0cd9"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ac40e7a5f6714bbfc640fe1685"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_af90869ef0131993aa18560d2f"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e79e6dbaf05daf03a96acbb788"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c5678152794bb6ada963377ab7"`);
        await queryRunner.query(`ALTER TABLE "employee_fcm_tokens" ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "employee_fcm_tokens" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "fcm_tokens" ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "fcm_tokens" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "employees" ADD "fcmToken" character varying`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ccb2d62e62d1e00e2329a376e1"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_eba33333c67120dbd220ee7c59"`);
        await queryRunner.query(`DROP TABLE "system_roles"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6736855b7646fcfa2ca749e473"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5a98934e019eb924798b9c78ab"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3b2527c470cafc68f691e5d53e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e508c8388a1d064a012ba89dbe"`);
        await queryRunner.query(`DROP TABLE "employee_system_roles"`);
        await queryRunner.query(`CREATE INDEX "IDX_employee_fcm_tokens_fcmTokenId" ON "employee_fcm_tokens" ("fcmTokenId") `);
        await queryRunner.query(`CREATE INDEX "IDX_employee_fcm_tokens_employeeId" ON "employee_fcm_tokens" ("employeeId") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_employee_fcm_tokens_employeeId_fcmTokenId" ON "employee_fcm_tokens" ("employeeId", "fcmTokenId") `);
        await queryRunner.query(`CREATE INDEX "IDX_fcm_tokens_isActive" ON "fcm_tokens" ("isActive") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_fcm_tokens_fcmToken" ON "fcm_tokens" ("fcmToken") `);
        await queryRunner.query(`ALTER TABLE "employee_fcm_tokens" ADD CONSTRAINT "FK_employee_fcm_tokens_fcmTokenId" FOREIGN KEY ("fcmTokenId") REFERENCES "fcm_tokens"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "employee_fcm_tokens" ADD CONSTRAINT "FK_employee_fcm_tokens_employeeId" FOREIGN KEY ("employeeId") REFERENCES "employees"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}

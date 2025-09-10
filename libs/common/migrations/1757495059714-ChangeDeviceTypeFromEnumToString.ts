import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeDeviceTypeFromEnumToString1757495059714 implements MigrationInterface {
    name = 'ChangeDeviceTypeFromEnumToString1757495059714'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "fcm_tokens" DROP COLUMN "deviceType"`);
        await queryRunner.query(`DROP TYPE "public"."fcm_tokens_devicetype_enum"`);
        await queryRunner.query(`ALTER TABLE "fcm_tokens" ADD "deviceType" character varying(50) NOT NULL DEFAULT 'pc'`);
        await queryRunner.query(`COMMENT ON COLUMN "fcm_tokens"."deviceType" IS '디바이스 타입 (예: android, ios, pc, web)'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "fcm_tokens"."deviceType" IS '디바이스 타입 (예: android, ios, pc, web)'`);
        await queryRunner.query(`ALTER TABLE "fcm_tokens" DROP COLUMN "deviceType"`);
        await queryRunner.query(`CREATE TYPE "public"."fcm_tokens_devicetype_enum" AS ENUM('ANDROID', 'IOS', 'PC')`);
        await queryRunner.query(`ALTER TABLE "fcm_tokens" ADD "deviceType" "public"."fcm_tokens_devicetype_enum" NOT NULL DEFAULT 'PC'`);
    }

}

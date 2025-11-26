import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeDeviceInfoToTextAndRemoveDeviceTypeDefault1757500000004 implements MigrationInterface {
    name = 'ChangeDeviceInfoToTextAndRemoveDeviceTypeDefault1757500000004';

    public async up(queryRunner: QueryRunner): Promise<void> {
        // deviceType의 default 값 제거
        await queryRunner.query(`ALTER TABLE "fcm_tokens" ALTER COLUMN "deviceType" DROP DEFAULT`);

        // deviceInfo를 JSON에서 TEXT로 변경 (NULL 값은 'mobile'로 변환)
        await queryRunner.query(
            `ALTER TABLE "fcm_tokens" ALTER COLUMN "deviceInfo" TYPE text USING COALESCE("deviceInfo"::text, 'mobile')`,
        );

        // NOT NULL 제약 조건 추가
        await queryRunner.query(`ALTER TABLE "fcm_tokens" ALTER COLUMN "deviceInfo" SET NOT NULL`);

        // 기본값 설정
        await queryRunner.query(`ALTER TABLE "fcm_tokens" ALTER COLUMN "deviceInfo" SET DEFAULT 'mobile'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // deviceInfo의 기본값 제거
        await queryRunner.query(`ALTER TABLE "fcm_tokens" ALTER COLUMN "deviceInfo" DROP DEFAULT`);

        // deviceInfo를 NULL 허용으로 변경
        await queryRunner.query(`ALTER TABLE "fcm_tokens" ALTER COLUMN "deviceInfo" DROP NOT NULL`);

        // deviceInfo를 TEXT에서 JSON으로 변경
        await queryRunner.query(
            `ALTER TABLE "fcm_tokens" ALTER COLUMN "deviceInfo" TYPE json USING "deviceInfo"::json`,
        );

        // deviceType의 default 값 복원
        await queryRunner.query(`ALTER TABLE "fcm_tokens" ALTER COLUMN "deviceType" SET DEFAULT 'pc'`);
    }
}

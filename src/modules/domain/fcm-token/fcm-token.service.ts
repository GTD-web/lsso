import { Injectable, ConflictException } from '@nestjs/common';
import { DomainFcmTokenRepository } from './fcm-token.repository';
import { BaseService } from '../../../../libs/common/services/base.service';
import { FcmToken } from './fcm-token.entity';
import { DeviceType } from './fcm-token.entity';

@Injectable()
export class DomainFcmTokenService extends BaseService<FcmToken> {
    constructor(private readonly fcmTokenRepository: DomainFcmTokenRepository) {
        super(fcmTokenRepository);
    }

    // FCM 토큰으로 조회
    async findByFcmToken(fcmToken: string): Promise<FcmToken | null> {
        return this.fcmTokenRepository.findOne({
            where: { fcmToken, isActive: true },
        });
    }

    // FCM 토큰 생성 또는 조회
    async createOrFind(fcmToken: string, deviceType: DeviceType = DeviceType.PC, deviceInfo?: any): Promise<FcmToken> {
        const existingToken = await this.findByFcmToken(fcmToken);

        if (existingToken) {
            // 기존 토큰이 있으면 디바이스 정보 업데이트
            return this.fcmTokenRepository.update(existingToken.id, {
                deviceType,
                deviceInfo,
                isActive: true,
            });
        }

        try {
            return await this.fcmTokenRepository.save({
                fcmToken,
                deviceType,
                deviceInfo,
                isActive: true,
            });
        } catch (error) {
            // 중복 키 오류인 경우 다시 조회해서 반환
            if (error.code === '23505') {
                // PostgreSQL unique constraint error
                const token = await this.findByFcmToken(fcmToken);
                if (token) {
                    return token;
                }
            }
            throw error;
        }
    }

    // 디바이스 타입별 활성 토큰 조회
    async findByDeviceType(deviceType: DeviceType): Promise<FcmToken[]> {
        return this.fcmTokenRepository.findAll({
            where: { deviceType, isActive: true },
        });
    }

    // FCM 토큰 비활성화
    async deactivateToken(fcmToken: string): Promise<FcmToken> {
        const token = await this.findByFcmToken(fcmToken);

        if (!token) {
            throw new ConflictException('FCM 토큰을 찾을 수 없습니다.');
        }

        return this.fcmTokenRepository.update(token.id, {
            isActive: false,
        });
    }

    // 비활성 토큰 정리
    async cleanupInactiveTokens(): Promise<void> {
        await this.fcmTokenRepository.deleteInactiveTokens({
            where: { isActive: false },
        });
    }

    // 토큰 유효성 검증
    validateFcmToken(fcmToken: string): boolean {
        // FCM 토큰 형식 검증
        if (!fcmToken || typeof fcmToken !== 'string') {
            return false;
        }

        // FCM 토큰은 일반적으로 152자 이상
        if (fcmToken.length < 140) {
            return false;
        }

        // 기본적인 형식 검증 (영문, 숫자, 특수문자 조합)
        const fcmTokenPattern = /^[A-Za-z0-9:_-]+$/;
        return fcmTokenPattern.test(fcmToken);
    }

    // 활성 토큰 수 조회
    async countActiveTokens(): Promise<number> {
        return this.fcmTokenRepository.count({
            where: { isActive: true },
        });
    }

    // 디바이스 타입별 토큰 수 조회
    async countTokensByDeviceType(): Promise<Record<DeviceType, number>> {
        const counts = await Promise.all([
            this.fcmTokenRepository.count({
                where: { deviceType: DeviceType.ANDROID, isActive: true },
            }),
            this.fcmTokenRepository.count({
                where: { deviceType: DeviceType.IOS, isActive: true },
            }),
            this.fcmTokenRepository.count({
                where: { deviceType: DeviceType.PC, isActive: true },
            }),
        ]);

        return {
            [DeviceType.ANDROID]: counts[0],
            [DeviceType.IOS]: counts[1],
            [DeviceType.PC]: counts[2],
        };
    }

    // 디바이스 타입별 통계 조회 (컨텍스트용)
    async getStatisticsByDeviceType(): Promise<{ deviceType: DeviceType; count: number }[]> {
        const counts = await this.countTokensByDeviceType();

        return Object.entries(counts).map(([deviceType, count]) => ({
            deviceType: deviceType as DeviceType,
            count,
        }));
    }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { OrganizationContextService } from '../../context/organization-management/organization-management-context.service';
import { FcmTokenManagementContextService } from '../../context/fcm-token-management/fcm-token-management-context.service';
import { FcmSubscribeRequestDto, FcmSubscribeResponseDto, FcmTokenResponseDto, FcmUnsubscribeResponseDto } from './dto';
import { DeviceType } from '../../domain/fcm-token/fcm-token.entity';

@Injectable()
export class FcmTokenManagementApplicationService {
    constructor(
        private readonly organizationContextService: OrganizationContextService,
        private readonly fcmTokenManagementContextService: FcmTokenManagementContextService,
    ) {}

    async FCM토큰을_구독한다(
        employeeNumber: string,
        requestDto: FcmSubscribeRequestDto,
    ): Promise<FcmSubscribeResponseDto> {
        const { fcmToken, deviceType } = requestDto;

        try {
            // 직원 정보 조회 (사번으로)
            const employee = await this.organizationContextService.직원_사번으로_직원정보를_조회한다(employeeNumber);

            // 디바이스 타입 변환
            let fcmDeviceType: DeviceType = DeviceType.PC;
            if (deviceType === 'mobile') {
                fcmDeviceType = DeviceType.ANDROID; // 기본값, 실제로는 더 정교한 판별 필요
            } else if (deviceType === 'pc') {
                fcmDeviceType = DeviceType.PC;
            }

            // FCM 토큰 등록
            await this.fcmTokenManagementContextService.FCM토큰을_직원에게_등록한다(
                employee.id,
                fcmToken,
                fcmDeviceType,
            );

            return {
                success: true,
                message: 'FCM 토큰이 성공적으로 등록되었습니다.',
                fcmToken: fcmToken,
            };
        } catch (error) {
            throw new NotFoundException('직원 정보를 찾을 수 없습니다.');
        }
    }

    async FCM토큰을_조회한다(employeeNumber: string): Promise<FcmTokenResponseDto> {
        try {
            // 직원 정보 조회
            const employee = await this.organizationContextService.직원_사번으로_직원정보를_조회한다(employeeNumber);

            // 직원의 FCM 토큰 목록 조회
            const fcmTokens = await this.fcmTokenManagementContextService.직원의_활성_FCM토큰_목록을_조회한다(
                employee.id,
            );

            return {
                employeeId: employee.id,
                employeeNumber: employee.employeeNumber,
                fcmToken: fcmTokens.length > 0 ? fcmTokens[0].fcmToken : null,
                updatedAt: new Date(), // 임시값, 실제로는 마지막 업데이트 시간
            };
        } catch (error) {
            throw new NotFoundException('직원 정보를 찾을 수 없습니다.');
        }
    }

    async FCM토큰_구독을_해지한다(employeeNumber: string): Promise<FcmUnsubscribeResponseDto> {
        try {
            // 직원 정보 조회
            const employee = await this.organizationContextService.직원_사번으로_직원정보를_조회한다(employeeNumber);

            // 직원의 모든 FCM 토큰 제거
            await this.fcmTokenManagementContextService.직원의_모든_FCM토큰을_제거한다(employee.id);

            return {
                success: true,
                message: 'FCM 토큰 구독이 성공적으로 해지되었습니다.',
            };
        } catch (error) {
            throw new NotFoundException('직원 정보를 찾을 수 없습니다.');
        }
    }

    // 알림서버용 API - 여러 직원의 FCM 토큰을 한 번에 조회
    async 여러_직원의_FCM토큰을_조회한다(employeeNumbers: string[]): Promise<FcmTokenResponseDto[]> {
        try {
            const results: FcmTokenResponseDto[] = [];

            for (const employeeNumber of employeeNumbers) {
                try {
                    // 직원 정보 조회
                    const employee = await this.organizationContextService.직원_사번으로_직원정보를_조회한다(
                        employeeNumber,
                    );

                    // 직원의 FCM 토큰 목록 조회
                    const fcmTokens = await this.fcmTokenManagementContextService.직원의_활성_FCM토큰_목록을_조회한다(
                        employee.id,
                    );

                    if (fcmTokens.length > 0) {
                        results.push({
                            employeeId: employee.id,
                            employeeNumber: employee.employeeNumber,
                            fcmToken: fcmTokens[0].fcmToken,
                            updatedAt: new Date(),
                        });
                    }
                } catch (error) {
                    // 개별 직원 조회 실패는 무시하고 계속 진행
                    console.warn(`직원번호 ${employeeNumber} 조회 실패:`, error);
                }
            }

            return results;
        } catch (error) {
            throw new NotFoundException('직원 정보를 조회할 수 없습니다.');
        }
    }
}

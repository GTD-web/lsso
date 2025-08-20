import { Injectable, NotFoundException } from '@nestjs/common';
import { OrganizationContextService } from '../../context/organization-management/organization-management-context.service';
import { FcmSubscribeRequestDto, FcmSubscribeResponseDto, FcmTokenResponseDto, FcmUnsubscribeResponseDto } from './dto';

@Injectable()
export class FcmTokenManagementApplicationService {
    constructor(private readonly organizationContextService: OrganizationContextService) {}

    async FCM토큰을_구독한다(employeeId: string, requestDto: FcmSubscribeRequestDto): Promise<FcmSubscribeResponseDto> {
        const { fcmToken } = requestDto;

        try {
            // 직원 정보 조회
            const employee = await this.organizationContextService.직원_ID값으로_직원정보를_조회한다(employeeId);

            // FCM 토큰 업데이트
            await this.organizationContextService.직원의_FCM토큰을_업데이트한다(employee.id, fcmToken);

            return {
                success: true,
                message: 'FCM 토큰이 성공적으로 등록되었습니다.',
                fcmToken: fcmToken,
            };
        } catch (error) {
            throw new NotFoundException('직원 정보를 찾을 수 없습니다.');
        }
    }

    async FCM토큰을_조회한다(employeeId: string): Promise<FcmTokenResponseDto> {
        try {
            // 직원 정보 조회
            const employee = await this.organizationContextService.직원_ID값으로_직원정보를_조회한다(employeeId);

            return {
                employeeId: employee.id,
                employeeNumber: employee.employeeNumber,
                fcmToken: employee.fcmToken,
                updatedAt: employee.updatedAt,
            };
        } catch (error) {
            throw new NotFoundException('직원 정보를 찾을 수 없습니다.');
        }
    }

    async FCM토큰_구독을_해지한다(employeeId: string): Promise<FcmUnsubscribeResponseDto> {
        try {
            // 직원 정보 조회
            const employee = await this.organizationContextService.직원_ID값으로_직원정보를_조회한다(employeeId);

            // FCM 토큰 제거
            await this.organizationContextService.직원의_FCM토큰을_제거한다(employee.id);

            return {
                success: true,
                message: 'FCM 토큰 구독이 성공적으로 해지되었습니다.',
            };
        } catch (error) {
            throw new NotFoundException('직원 정보를 찾을 수 없습니다.');
        }
    }

    // 알림서버용 API - 여러 직원의 FCM 토큰을 한 번에 조회
    async 여러_직원의_FCM토큰을_조회한다(employeeIds: string[]): Promise<FcmTokenResponseDto[]> {
        try {
            const employees = await this.organizationContextService.여러_직원_ID값으로_직원정보를_조회한다(
                employeeIds,
                false, // 퇴사자 제외
            );

            return employees
                .filter((employee) => employee.fcmToken) // FCM 토큰이 있는 직원만
                .map((employee) => ({
                    employeeId: employee.id,
                    employeeNumber: employee.employeeNumber,
                    fcmToken: employee.fcmToken,
                    updatedAt: employee.updatedAt,
                }));
        } catch (error) {
            throw new NotFoundException('직원 정보를 조회할 수 없습니다.');
        }
    }
}

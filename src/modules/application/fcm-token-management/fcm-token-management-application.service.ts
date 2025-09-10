import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { OrganizationContextService } from '../../context/organization-management/organization-management-context.service';
import { FcmTokenManagementContextService } from '../../context/fcm-token-management/fcm-token-management-context.service';
import {
    FcmSubscribeRequestDto,
    FcmSubscribeResponseDto,
    FcmTokenResponseDto,
    FcmTokensResponseDto,
    MultipleFcmTokensResponseDto,
    FlatFcmTokenDto,
    FcmUnsubscribeResponseDto,
    BaseEmployeeIdentifierDto,
} from './dto';
import { DeviceType } from '../../domain/fcm-token/fcm-token.entity';
import { Employee } from '../../domain/employee/employee.entity';

@Injectable()
export class FcmTokenManagementApplicationService {
    constructor(
        private readonly organizationContextService: OrganizationContextService,
        private readonly fcmTokenManagementContextService: FcmTokenManagementContextService,
    ) {}

    /**
     * DTO로부터 직원 정보를 조회하는 헬퍼 메서드
     */
    private async getEmployeeFromIdentifier(dto: BaseEmployeeIdentifierDto): Promise<Employee> {
        // 입력 검증
        if (!dto.employeeId && !dto.employeeNumber) {
            throw new BadRequestException('employeeId 또는 employeeNumber 중 하나는 반드시 제공되어야 합니다.');
        }

        try {
            // employeeId가 있으면 우선 사용
            if (dto.employeeId) {
                return await this.organizationContextService.직원_ID값으로_직원정보를_조회한다(dto.employeeId);
            }

            // employeeNumber로 조회
            if (dto.employeeNumber) {
                return await this.organizationContextService.직원_사번으로_직원정보를_조회한다(dto.employeeNumber);
            }
        } catch (error) {
            throw new NotFoundException('직원 정보를 찾을 수 없습니다.');
        }

        throw new BadRequestException('유효한 직원 식별자가 제공되지 않았습니다.');
    }

    async FCM토큰을_구독한다(requestDto: FcmSubscribeRequestDto): Promise<FcmSubscribeResponseDto> {
        const { fcmToken, deviceType } = requestDto;

        // 직원 정보 조회 (employeeId 우선, 없으면 employeeNumber)
        const employee = await this.getEmployeeFromIdentifier(requestDto);

        // FCM 토큰 등록
        await this.fcmTokenManagementContextService.FCM토큰을_직원에게_등록한다(employee.id, fcmToken, deviceType);

        return {
            success: true,
            message: 'FCM 토큰이 성공적으로 등록되었습니다.',
            fcmToken: fcmToken,
        };
    }

    async FCM토큰을_조회한다(requestDto: BaseEmployeeIdentifierDto): Promise<FcmTokensResponseDto> {
        // 직원 정보 조회
        const employee = await this.getEmployeeFromIdentifier(requestDto);

        // 직원의 FCM 토큰 목록 조회
        const employeeFcmTokens = await this.fcmTokenManagementContextService.직원의_활성_FCM토큰_목록을_조회한다(
            employee.id,
        );

        // 토큰 정보 변환
        const tokens = employeeFcmTokens.map((employeeFcmToken) => ({
            fcmToken: employeeFcmToken.fcmToken,
            deviceType: employeeFcmToken.deviceType,
            createdAt: employeeFcmToken.createdAt,
            updatedAt: employeeFcmToken.updatedAt,
        }));

        return {
            employeeId: employee.id,
            employeeNumber: employee.employeeNumber,
            tokens: tokens,
        };
    }

    async FCM토큰_구독을_해지한다(requestDto: BaseEmployeeIdentifierDto): Promise<FcmUnsubscribeResponseDto> {
        // 직원 정보 조회
        const employee = await this.getEmployeeFromIdentifier(requestDto);

        // 직원의 모든 FCM 토큰 제거
        await this.fcmTokenManagementContextService.직원의_모든_FCM토큰을_제거한다(employee.id);

        return {
            success: true,
            message: 'FCM 토큰 구독이 성공적으로 해지되었습니다.',
        };
    }

    // 알림서버용 API - 여러 직원의 FCM 토큰을 한 번에 조회 (직원번호 기준)
    async 여러_직원의_FCM토큰을_조회한다(employeeNumbers: string[]): Promise<MultipleFcmTokensResponseDto> {
        return this.여러_직원의_FCM토큰을_통합_조회한다(employeeNumbers, 'number');
    }

    // 알림서버용 API - 여러 직원의 FCM 토큰을 한 번에 조회 (직원 ID 기준)
    async 여러_직원의_FCM토큰을_ID로_조회한다(employeeIds: string[]): Promise<MultipleFcmTokensResponseDto> {
        return this.여러_직원의_FCM토큰을_통합_조회한다(employeeIds, 'id');
    }

    // 여러 직원의 FCM 토큰 통합 조회 헬퍼 메서드
    private async 여러_직원의_FCM토큰을_통합_조회한다(
        identifiers: string[],
        type: 'id' | 'number',
    ): Promise<MultipleFcmTokensResponseDto> {
        const byEmployee: FcmTokensResponseDto[] = [];
        const allTokens: FlatFcmTokenDto[] = [];

        for (const identifier of identifiers) {
            try {
                // 직원 정보 조회
                const employee =
                    type === 'id'
                        ? await this.organizationContextService.직원_ID값으로_직원정보를_조회한다(identifier)
                        : await this.organizationContextService.직원_사번으로_직원정보를_조회한다(identifier);

                // 직원의 FCM 토큰 목록 조회
                const employeeFcmTokens =
                    await this.fcmTokenManagementContextService.직원의_활성_FCM토큰_목록을_조회한다(employee.id);

                if (employeeFcmTokens.length > 0) {
                    // 직원별 토큰 정보
                    const tokens = employeeFcmTokens.map((employeeFcmToken) => ({
                        fcmToken: employeeFcmToken.fcmToken,
                        deviceType: employeeFcmToken.deviceType,
                        createdAt: employeeFcmToken.createdAt,
                        updatedAt: employeeFcmToken.updatedAt,
                    }));

                    byEmployee.push({
                        employeeId: employee.id,
                        employeeNumber: employee.employeeNumber,
                        tokens: tokens,
                    });

                    // flat 배열용 토큰 정보
                    const flatTokens = employeeFcmTokens.map((employeeFcmToken) => ({
                        employeeId: employee.id,
                        employeeNumber: employee.employeeNumber,
                        fcmToken: employeeFcmToken.fcmToken,
                        deviceType: employeeFcmToken.deviceType,
                        createdAt: employeeFcmToken.createdAt,
                        updatedAt: employeeFcmToken.updatedAt,
                    }));

                    allTokens.push(...flatTokens);
                }
            } catch (error) {
                // 개별 직원 조회 실패는 무시하고 계속 진행
                console.warn(`${type} ${identifier} 조회 실패:`, error);
            }
        }

        return {
            byEmployee: byEmployee,
            allTokens: allTokens,
            totalEmployees: byEmployee.length,
            totalTokens: allTokens.length,
        };
    }
}

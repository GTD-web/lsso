import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { DomainEmployeeService } from '../../domain/employee/employee.service';
import { DomainFcmTokenService } from '../../domain/fcm-token/fcm-token.service';
import { DomainEmployeeFcmTokenService } from '../../domain/employee-fcm-token/employee-fcm-token.service';
import { Employee } from '../../domain/employee/employee.entity';
import { FcmToken, DeviceType } from '../../domain/fcm-token/fcm-token.entity';
import { EmployeeFcmToken } from '../../domain/employee-fcm-token/employee-fcm-token.entity';

@Injectable()
export class FcmTokenManagementContextService {
    constructor(
        private readonly 직원서비스: DomainEmployeeService,
        private readonly FCM토큰서비스: DomainFcmTokenService,
        private readonly 직원FCM토큰서비스: DomainEmployeeFcmTokenService,
    ) {}

    async FCM토큰을_직원에게_등록한다(
        employeeId: string,
        fcmToken: string,
        deviceType: DeviceType = DeviceType.PC,
        deviceInfo?: any,
    ): Promise<EmployeeFcmToken> {
        // 직원 존재 확인
        const employee = await this.직원서비스.findByEmployeeId(employeeId);
        if (!employee) {
            throw new NotFoundException('존재하지 않는 직원입니다.');
        }

        // FCM 토큰 생성 또는 조회
        const fcmTokenEntity = await this.FCM토큰서비스.createOrFind(fcmToken, deviceType, deviceInfo);

        // 직원과 FCM 토큰 관계 생성 또는 업데이트
        const relation = await this.직원FCM토큰서비스.createOrUpdateRelation(employeeId, fcmTokenEntity.id);

        return relation;
    }

    async FCM토큰을_직원으로부터_해제한다(employeeId: string, fcmToken: string): Promise<void> {
        // FCM 토큰 조회
        const fcmTokenEntity = await this.FCM토큰서비스.findByFcmToken(fcmToken);
        if (!fcmTokenEntity) {
            throw new NotFoundException('존재하지 않는 FCM 토큰입니다.');
        }

        // 직원과 FCM 토큰 관계 삭제
        await this.직원FCM토큰서비스.deleteRelation(employeeId, fcmTokenEntity.id);
    }

    async 직원의_활성_FCM토큰_목록을_조회한다(employeeId: string): Promise<FcmToken[]> {
        // 직원 존재 확인
        const employee = await this.직원서비스.findByEmployeeId(employeeId);
        if (!employee) {
            throw new NotFoundException('존재하지 않는 직원입니다.');
        }

        // 직원의 활성 FCM 토큰 관계 조회
        const relations = await this.직원FCM토큰서비스.findByEmployeeId(employeeId);

        // FCM 토큰만 추출
        return relations.map((relation) => relation.fcmToken).filter((token) => token);
    }

    async FCM토큰의_활성_상태를_변경한다(fcmToken: string, isActive: boolean): Promise<FcmToken> {
        const fcmTokenEntity = await this.FCM토큰서비스.findByFcmToken(fcmToken);
        if (!fcmTokenEntity) {
            throw new NotFoundException('존재하지 않는 FCM 토큰입니다.');
        }

        return this.FCM토큰서비스.update(fcmTokenEntity.id, { isActive });
    }

    async FCM토큰을_업데이트한다(fcmToken: string, deviceType?: DeviceType, deviceInfo?: any): Promise<FcmToken> {
        const fcmTokenEntity = await this.FCM토큰서비스.findByFcmToken(fcmToken);
        if (!fcmTokenEntity) {
            throw new NotFoundException('존재하지 않는 FCM 토큰입니다.');
        }

        const updateData: Partial<FcmToken> = {};
        if (deviceType !== undefined) updateData.deviceType = deviceType;
        if (deviceInfo !== undefined) updateData.deviceInfo = deviceInfo;

        return this.FCM토큰서비스.update(fcmTokenEntity.id, updateData);
    }

    async 특정_FCM토큰을_사용하는_직원들을_조회한다(fcmToken: string): Promise<Employee[]> {
        const fcmTokenEntity = await this.FCM토큰서비스.findByFcmToken(fcmToken);
        if (!fcmTokenEntity) {
            throw new NotFoundException('존재하지 않는 FCM 토큰입니다.');
        }

        // FCM 토큰을 사용하는 직원 관계 조회
        const relations = await this.직원FCM토큰서비스.findByFcmTokenId(fcmTokenEntity.id);

        // 직원만 추출
        return relations.map((relation) => relation.employee).filter((employee) => employee);
    }

    async 직원의_모든_FCM토큰을_제거한다(employeeId: string): Promise<void> {
        // 직원 존재 확인
        const employee = await this.직원서비스.findByEmployeeId(employeeId);
        if (!employee) {
            throw new NotFoundException('존재하지 않는 직원입니다.');
        }

        // 직원의 모든 FCM 토큰 관계 삭제
        await this.직원FCM토큰서비스.deleteAllByEmployeeId(employeeId);
    }

    async 디바이스_타입별_FCM토큰_통계를_조회한다(): Promise<{ deviceType: DeviceType; count: number }[]> {
        return this.FCM토큰서비스.getStatisticsByDeviceType();
    }

    async 오래된_FCM토큰을_정리한다(days: number = 30): Promise<number> {
        // 지정된 일수 이전에 업데이트된 토큰들을 삭제
        const cutoffDate = new Date();
        cutoffDate.setDate(cutoffDate.getDate() - days);

        return this.직원FCM토큰서비스.deleteOldTokens(cutoffDate);
    }

    async FCM토큰_사용_현황을_업데이트한다(fcmToken: string): Promise<void> {
        const fcmTokenEntity = await this.FCM토큰서비스.findByFcmToken(fcmToken);
        if (!fcmTokenEntity) {
            throw new NotFoundException('존재하지 않는 FCM 토큰입니다.');
        }

        // 사용일 업데이트 (updatedAt 갱신)
        await this.직원FCM토큰서비스.updateTokenUsage(fcmTokenEntity.id);
    }

    async 직원의_기본_FCM토큰을_설정한다(employeeId: string, fcmToken: string): Promise<EmployeeFcmToken> {
        // 직원의 다른 모든 토큰을 제거
        await this.직원의_모든_FCM토큰을_제거한다(employeeId);

        // 새 토큰 등록
        return this.FCM토큰을_직원에게_등록한다(employeeId, fcmToken);
    }
}

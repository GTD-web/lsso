import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { DomainEmployeeService } from '../../domain/employee/employee.service';
import { DomainFcmTokenService } from '../../domain/fcm-token/fcm-token.service';
import { DomainEmployeeFcmTokenService } from '../../domain/employee-fcm-token/employee-fcm-token.service';
import { Employee } from '../../domain/employee/employee.entity';
import { FcmToken } from '../../domain/fcm-token/fcm-token.entity';
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
        deviceType: string,
        deviceInfo?: any,
    ): Promise<EmployeeFcmToken> {
        // 직원 존재 확인
        const employee = await this.직원서비스.findByEmployeeId(employeeId);
        if (!employee) {
            throw new NotFoundException('존재하지 않는 직원입니다.');
        }

        // 직원ID + 디바이스 타입으로 기존 토큰 확인 및 생성/업데이트
        const fcmTokenEntity = await this.FCM토큰서비스.createOrFindByEmployeeAndDevice(
            employeeId,
            fcmToken,
            deviceType,
            deviceInfo,
        );

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

    async 직원의_모든_FCM토큰을_제거한다(employeeId: string): Promise<void> {
        // 직원 존재 확인
        const employee = await this.직원서비스.findByEmployeeId(employeeId);
        if (!employee) {
            throw new NotFoundException('존재하지 않는 직원입니다.');
        }

        // 직원의 모든 FCM 토큰 관계 삭제
        await this.직원FCM토큰서비스.deleteAllByEmployeeId(employeeId);
    }
}

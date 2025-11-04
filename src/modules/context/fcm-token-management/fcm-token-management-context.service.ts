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

    async 직원번호와_토큰으로_FCM토큰을_제거한다(employeeNumber: string, fcmToken: string): Promise<void> {
        // 직원 조회 (사번으로)
        const employee = await this.직원서비스.findByEmployeeNumber(employeeNumber);
        if (!employee) {
            throw new NotFoundException('존재하지 않는 직원입니다.');
        }

        // FCM 토큰 조회
        const fcmTokenEntity = await this.FCM토큰서비스.findByFcmToken(fcmToken);
        if (!fcmTokenEntity) {
            throw new NotFoundException('존재하지 않는 FCM 토큰입니다.');
        }

        // 직원과 FCM 토큰 연결 확인
        const relation = await this.직원FCM토큰서비스.findRelation(employee.id, fcmTokenEntity.id);
        if (!relation) {
            throw new BadRequestException('해당 직원과 FCM 토큰이 연결되어 있지 않습니다.');
        }

        // 연결 관계 삭제
        await this.직원FCM토큰서비스.deleteRelation(employee.id, fcmTokenEntity.id);

        // FCM 토큰 삭제 (다른 직원이 사용 중인지 확인 후)
        const otherRelations = await this.직원FCM토큰서비스.findByFcmTokenId(fcmTokenEntity.id);
        if (otherRelations.length === 0) {
            // 다른 직원이 사용하지 않으면 토큰 삭제
            await this.FCM토큰서비스.delete(fcmTokenEntity.id);
        }
    }

    async 여러_직원의_여러_토큰을_일괄제거한다(
        employees: Array<{ employeeNumber: string; fcmTokens: string[] }>,
    ): Promise<Array<{ employeeNumber: string; fcmToken: string; success: boolean; error?: string }>> {
        const results: Array<{ employeeNumber: string; fcmToken: string; success: boolean; error?: string }> = [];

        // 각 직원별로 해당 직원의 토큰들 처리
        for (const employee of employees) {
            const { employeeNumber, fcmTokens } = employee;

            for (const fcmToken of fcmTokens) {
                try {
                    await this.직원번호와_토큰으로_FCM토큰을_제거한다(employeeNumber, fcmToken);
                    results.push({
                        employeeNumber,
                        fcmToken,
                        success: true,
                    });
                } catch (error) {
                    results.push({
                        employeeNumber,
                        fcmToken,
                        success: false,
                        error: error.message || '알 수 없는 오류',
                    });
                }
            }
        }

        return results;
    }
}

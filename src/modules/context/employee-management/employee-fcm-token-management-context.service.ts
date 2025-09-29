import { Injectable } from '@nestjs/common';
import { DomainEmployeeFcmTokenService } from '../../domain/employee-fcm-token/employee-fcm-token.service';
import { EmployeeFcmToken } from '../../domain/employee-fcm-token/employee-fcm-token.entity';

@Injectable()
export class EmployeeFcmTokenManagementContextService {
    constructor(private readonly employeeFcmTokenService: DomainEmployeeFcmTokenService) {}

    /**
     * 모든 직원 FCM 토큰 관계를 조회합니다
     */
    async 모든_직원_FCM_토큰_관계_조회(): Promise<EmployeeFcmToken[]> {
        return this.employeeFcmTokenService.findAll({
            relations: ['employee', 'fcmToken'],
        });
    }

    /**
     * 직원별 FCM 토큰 관계를 조회합니다
     */
    async 직원별_FCM_토큰_관계_조회(employeeId: string): Promise<EmployeeFcmToken[]> {
        return this.employeeFcmTokenService.findByEmployeeId(employeeId);
    }

    /**
     * FCM 토큰별 직원 관계를 조회합니다
     */
    async FCM_토큰별_직원_관계_조회(fcmTokenId: string): Promise<EmployeeFcmToken[]> {
        return this.employeeFcmTokenService.findByFcmTokenId(fcmTokenId);
    }

    /**
     * 직원 FCM 토큰 관계를 ID로 조회합니다
     */
    async 직원_FCM_토큰_관계_조회(id: string): Promise<EmployeeFcmToken | null> {
        return this.employeeFcmTokenService.findOne({
            where: { id },
            relations: ['employee', 'fcmToken'],
        });
    }

    /**
     * ID로 직원 FCM 토큰 관계를 조회합니다
     */
    async ID로_직원_FCM_토큰_관계_조회(id: string): Promise<EmployeeFcmToken | null> {
        return this.employeeFcmTokenService.findOne({
            where: { id },
        });
    }

    /**
     * 직원과 FCM 토큰 관계를 생성하거나 업데이트합니다
     */
    async 직원과_FCM_토큰_관계_생성_또는_업데이트(employeeId: string, fcmTokenId: string): Promise<EmployeeFcmToken> {
        return this.employeeFcmTokenService.createOrUpdateRelation(employeeId, fcmTokenId);
    }

    /**
     * 직원과 FCM 토큰 관계를 삭제합니다
     */
    async 직원과_FCM_토큰_관계_삭제(employeeId: string, fcmTokenId: string): Promise<void> {
        return this.employeeFcmTokenService.deleteRelation(employeeId, fcmTokenId);
    }

    /**
     * 직원의 모든 FCM 토큰 관계를 삭제합니다
     */
    async 직원의_모든_FCM_토큰_관계_삭제(employeeId: string): Promise<void> {
        return this.employeeFcmTokenService.deleteAllByEmployeeId(employeeId);
    }

    /**
     * FCM 토큰 사용일을 업데이트합니다
     */
    async FCM_토큰_사용일_업데이트(employeeId: string, fcmTokenId: string): Promise<EmployeeFcmToken> {
        return this.employeeFcmTokenService.updateUsage(employeeId, fcmTokenId);
    }

    /**
     * 직원과 FCM 토큰의 특정 관계를 조회합니다
     */
    async 직원과_FCM_토큰의_관계_조회(employeeId: string, fcmTokenId: string): Promise<EmployeeFcmToken | null> {
        return this.employeeFcmTokenService.findOne({
            where: { employeeId, fcmTokenId },
        });
    }

    /**
     * 특정 FCM 토큰을 가진 직원 수를 조회합니다
     */
    async FCM_토큰을_가진_직원_수_조회(fcmTokenId: string): Promise<number> {
        return this.employeeFcmTokenService.countEmployeesByFcmToken(fcmTokenId);
    }

    /**
     * 직원의 FCM 토큰 수를 조회합니다
     */
    async 직원의_FCM_토큰_수_조회(employeeId: string): Promise<number> {
        return this.employeeFcmTokenService.countFcmTokensByEmployee(employeeId);
    }

    /**
     * 오래된 FCM 토큰 관계들을 삭제합니다
     */
    async 오래된_FCM_토큰_관계_삭제(cutoffDate: Date): Promise<number> {
        return this.employeeFcmTokenService.deleteOldTokens(cutoffDate);
    }

    /**
     * FCM 토큰 사용일을 업데이트합니다 (토큰 ID로)
     */
    async FCM_토큰_사용일_업데이트_by_토큰ID(fcmTokenId: string): Promise<void> {
        return this.employeeFcmTokenService.updateTokenUsage(fcmTokenId);
    }

    /**
     * FCM 토큰과 직원의 관계가 존재하는지 확인합니다
     */
    async FCM_토큰과_직원_관계_존재_여부_확인(employeeId: string, fcmTokenId: string): Promise<boolean> {
        const relation = await this.employeeFcmTokenService.findOne({
            where: { employeeId, fcmTokenId },
        });
        return !!relation;
    }
}

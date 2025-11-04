import { Injectable, NotFoundException } from '@nestjs/common';
import { DomainEmployeeFcmTokenRepository } from './employee-fcm-token.repository';
import { BaseService } from '../../../../libs/common/services/base.service';
import { EmployeeFcmToken } from './employee-fcm-token.entity';
import { In } from 'typeorm';

@Injectable()
export class DomainEmployeeFcmTokenService extends BaseService<EmployeeFcmToken> {
    constructor(private readonly employeeFcmTokenRepository: DomainEmployeeFcmTokenRepository) {
        super(employeeFcmTokenRepository);
    }

    // 직원의 FCM 토큰 목록 조회
    async findByEmployeeId(employeeId: string): Promise<EmployeeFcmToken[]> {
        return this.employeeFcmTokenRepository.findAll({
            where: { employeeId },
            relations: ['fcmToken'],
        });
    }

    // 여러 직원의 FCM 토큰 목록을 일괄 조회
    async findByEmployeeIds(employeeIds: string[]): Promise<EmployeeFcmToken[]> {
        if (employeeIds.length === 0) return [];
        return this.employeeFcmTokenRepository.findAll({
            where: { employeeId: In(employeeIds) },
            relations: ['fcmToken'],
        });
    }

    // FCM 토큰을 사용하는 직원 목록 조회
    async findByFcmTokenId(fcmTokenId: string): Promise<EmployeeFcmToken[]> {
        return this.employeeFcmTokenRepository.findAll({
            where: { fcmTokenId },
            relations: ['employee'],
        });
    }

    // 직원과 FCM 토큰 관계 생성 또는 업데이트
    async createOrUpdateRelation(employeeId: string, fcmTokenId: string): Promise<EmployeeFcmToken> {
        const existingRelation = await this.employeeFcmTokenRepository.findOne({
            where: { employeeId, fcmTokenId },
        });

        if (existingRelation) {
            // 기존 관계가 있으면 updatedAt 갱신하여 반환
            return this.employeeFcmTokenRepository.update(existingRelation.id, {
                updatedAt: new Date(),
            });
        }

        // 새로운 관계 생성
        return this.employeeFcmTokenRepository.save({
            employeeId,
            fcmTokenId,
        });
    }

    // 직원과 FCM 토큰 관계 조회
    async findRelation(employeeId: string, fcmTokenId: string): Promise<EmployeeFcmToken | null> {
        return this.employeeFcmTokenRepository.findOne({
            where: { employeeId, fcmTokenId },
        });
    }

    // 직원과 FCM 토큰 관계 삭제
    async deleteRelation(employeeId: string, fcmTokenId: string): Promise<void> {
        const relation = await this.findRelation(employeeId, fcmTokenId);

        if (relation) {
            await this.employeeFcmTokenRepository.delete(relation.id);
        }
    }

    // 직원의 모든 FCM 토큰 관계 삭제
    async deleteAllByEmployeeId(employeeId: string): Promise<void> {
        const relations = await this.findByEmployeeId(employeeId);

        for (const relation of relations) {
            await this.employeeFcmTokenRepository.delete(relation.id);
        }
    }

    // 사용일 업데이트 (updatedAt 갱신)
    async updateUsage(employeeId: string, fcmTokenId: string): Promise<EmployeeFcmToken> {
        const relation = await this.employeeFcmTokenRepository.findOne({
            where: { employeeId, fcmTokenId },
        });

        if (!relation) {
            throw new NotFoundException('직원과 FCM 토큰의 관계를 찾을 수 없습니다.');
        }

        return this.employeeFcmTokenRepository.update(relation.id, {
            updatedAt: new Date(),
        });
    }

    // 특정 FCM 토큰을 가진 직원 수 조회
    async countEmployeesByFcmToken(fcmTokenId: string): Promise<number> {
        return this.employeeFcmTokenRepository.count({
            where: { fcmTokenId },
        });
    }

    // 직원의 FCM 토큰 수 조회
    async countFcmTokensByEmployee(employeeId: string): Promise<number> {
        return this.employeeFcmTokenRepository.count({
            where: { employeeId },
        });
    }

    // 오래된 FCM 토큰 관계들 삭제 (updatedAt 기준)
    async deleteOldTokens(cutoffDate: Date): Promise<number> {
        const relations = await this.employeeFcmTokenRepository.findAll({
            where: {},
        });

        let count = 0;
        for (const relation of relations) {
            if (relation.updatedAt && relation.updatedAt < cutoffDate) {
                await this.employeeFcmTokenRepository.delete(relation.id);
                count++;
            }
        }

        return count;
    }

    // FCM 토큰 사용일 업데이트 (ID로)
    async updateTokenUsage(fcmTokenId: string): Promise<void> {
        const relations = await this.employeeFcmTokenRepository.findAll({
            where: { fcmTokenId },
        });

        for (const relation of relations) {
            await this.employeeFcmTokenRepository.update(relation.id, {
                updatedAt: new Date(),
            });
        }
    }
}

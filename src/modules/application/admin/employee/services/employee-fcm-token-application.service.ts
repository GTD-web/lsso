import { Injectable, NotFoundException } from '@nestjs/common';
import { EmployeeFcmTokenManagementContextService } from '../../../../context/employee-management/employee-fcm-token-management-context.service';
import { EmployeeFcmToken } from '../../../../domain/employee-fcm-token/employee-fcm-token.entity';
import { DomainFcmTokenService } from '../../../../domain/fcm-token/fcm-token.service';
import {
    CreateEmployeeFcmTokenDto,
    UpdateEmployeeFcmTokenDto,
    EmployeeFcmTokenListResponseDto,
    EmployeeFcmTokenStatsDto,
    EmployeeFcmTokenGroupedListResponseDto,
    EmployeeFcmTokenGroupedDto,
    AdminFcmTokenResponseDto,
} from '../dto';

@Injectable()
export class EmployeeFcmTokenApplicationService {
    constructor(
        private readonly employeeFcmTokenManagementContext: EmployeeFcmTokenManagementContextService,
        private readonly domainFcmTokenService: DomainFcmTokenService,
    ) {}

    /**
     * 모든 직원 FCM 토큰 관계 조회
     */
    async 모든_직원_FCM_토큰_관계_조회(): Promise<EmployeeFcmTokenListResponseDto[]> {
        const relations = await this.employeeFcmTokenManagementContext.모든_직원_FCM_토큰_관계_조회();

        return relations.map((relation) => ({
            id: relation.id,
            employeeId: relation.employeeId,
            fcmTokenId: relation.fcmTokenId,
            createdAt: relation.createdAt,
            updatedAt: relation.updatedAt,
            employee: relation.employee
                ? {
                      id: relation.employee.id,
                      name: relation.employee.name,
                      employeeNumber: relation.employee.employeeNumber,
                      email: relation.employee.email,
                  }
                : undefined,
            fcmToken: relation.fcmToken
                ? {
                      id: relation.fcmToken.id,
                      fcmToken: relation.fcmToken.fcmToken,
                      deviceType: relation.fcmToken.deviceType,
                      deviceInfo: relation.fcmToken.deviceInfo,
                      isActive: relation.fcmToken.isActive,
                      relationCreatedAt: relation.createdAt,
                      relationUpdatedAt: relation.updatedAt,
                  }
                : undefined,
        }));
    }

    /**
     * 직원별 FCM 토큰 관계 조회
     */
    async 직원별_FCM_토큰_관계_조회(employeeId: string): Promise<EmployeeFcmTokenListResponseDto[]> {
        const relations = await this.employeeFcmTokenManagementContext.직원별_FCM_토큰_관계_조회(employeeId);

        return relations.map((relation) => ({
            id: relation.id,
            employeeId: relation.employeeId,
            fcmTokenId: relation.fcmTokenId,
            createdAt: relation.createdAt,
            updatedAt: relation.updatedAt,
            fcmToken: relation.fcmToken
                ? {
                      id: relation.fcmToken.id,
                      fcmToken: relation.fcmToken.fcmToken,
                      deviceType: relation.fcmToken.deviceType,
                      deviceInfo: relation.fcmToken.deviceInfo,
                      isActive: relation.fcmToken.isActive,
                      relationCreatedAt: relation.createdAt,
                      relationUpdatedAt: relation.updatedAt,
                  }
                : undefined,
        }));
    }

    /**
     * FCM 토큰별 직원 관계 조회
     */
    async FCM_토큰별_직원_관계_조회(fcmTokenId: string): Promise<EmployeeFcmTokenListResponseDto[]> {
        const relations = await this.employeeFcmTokenManagementContext.FCM_토큰별_직원_관계_조회(fcmTokenId);

        return relations.map((relation) => ({
            id: relation.id,
            employeeId: relation.employeeId,
            fcmTokenId: relation.fcmTokenId,
            createdAt: relation.createdAt,
            updatedAt: relation.updatedAt,
            employee: relation.employee
                ? {
                      id: relation.employee.id,
                      name: relation.employee.name,
                      employeeNumber: relation.employee.employeeNumber,
                      email: relation.employee.email,
                  }
                : undefined,
        }));
    }

    /**
     * 직원 FCM 토큰 관계 상세 조회
     */
    async 직원_FCM_토큰_관계_상세_조회(id: string): Promise<EmployeeFcmTokenListResponseDto> {
        const relation = await this.employeeFcmTokenManagementContext.직원_FCM_토큰_관계_조회(id);

        if (!relation) {
            throw new NotFoundException('직원 FCM 토큰 관계를 찾을 수 없습니다.');
        }

        return {
            id: relation.id,
            employeeId: relation.employeeId,
            fcmTokenId: relation.fcmTokenId,
            createdAt: relation.createdAt,
            updatedAt: relation.updatedAt,
            employee: relation.employee
                ? {
                      id: relation.employee.id,
                      name: relation.employee.name,
                      employeeNumber: relation.employee.employeeNumber,
                      email: relation.employee.email,
                  }
                : undefined,
            fcmToken: relation.fcmToken
                ? {
                      id: relation.fcmToken.id,
                      fcmToken: relation.fcmToken.fcmToken,
                      deviceType: relation.fcmToken.deviceType,
                      deviceInfo: relation.fcmToken.deviceInfo,
                      isActive: relation.fcmToken.isActive,
                      relationCreatedAt: relation.createdAt,
                      relationUpdatedAt: relation.updatedAt,
                  }
                : undefined,
        };
    }

    /**
     * 직원 FCM 토큰 관계 생성
     */
    async 직원_FCM_토큰_관계_생성(dto: CreateEmployeeFcmTokenDto): Promise<EmployeeFcmTokenListResponseDto> {
        const relation = await this.employeeFcmTokenManagementContext.직원과_FCM_토큰_관계_생성_또는_업데이트(
            dto.employeeId,
            dto.fcmTokenId,
        );
        return this.직원_FCM_토큰_관계_상세_조회(relation.id);
    }

    /**
     * 직원 FCM 토큰 관계 수정
     */
    async 직원_FCM_토큰_관계_수정(
        id: string,
        dto: UpdateEmployeeFcmTokenDto,
    ): Promise<EmployeeFcmTokenListResponseDto> {
        const existingRelation = await this.employeeFcmTokenManagementContext.ID로_직원_FCM_토큰_관계_조회(id);
        if (!existingRelation) {
            throw new NotFoundException('직원 FCM 토큰 관계를 찾을 수 없습니다.');
        }

        if (dto.fcmTokenId && dto.fcmTokenId !== existingRelation.fcmTokenId) {
            // 기존 관계 삭제
            await this.employeeFcmTokenManagementContext.직원과_FCM_토큰_관계_삭제(
                existingRelation.employeeId,
                existingRelation.fcmTokenId,
            );
            // 새로운 관계 생성
            const newRelation = await this.employeeFcmTokenManagementContext.직원과_FCM_토큰_관계_생성_또는_업데이트(
                existingRelation.employeeId,
                dto.fcmTokenId,
            );
            return this.직원_FCM_토큰_관계_상세_조회(newRelation.id);
        }

        return this.직원_FCM_토큰_관계_상세_조회(id);
    }

    /**
     * 직원 FCM 토큰 관계 삭제
     */
    async 직원_FCM_토큰_관계_삭제(id: string): Promise<{ message: string }> {
        const relation = await this.employeeFcmTokenManagementContext.ID로_직원_FCM_토큰_관계_조회(id);
        if (!relation) {
            throw new NotFoundException('직원 FCM 토큰 관계를 찾을 수 없습니다.');
        }

        await this.employeeFcmTokenManagementContext.직원과_FCM_토큰_관계_삭제(
            relation.employeeId,
            relation.fcmTokenId,
        );
        return { message: '직원 FCM 토큰 관계가 성공적으로 삭제되었습니다.' };
    }

    /**
     * 직원의 모든 FCM 토큰 관계 삭제
     */
    async 직원_모든_FCM_토큰_관계_삭제(employeeId: string): Promise<{ message: string }> {
        await this.employeeFcmTokenManagementContext.직원의_모든_FCM_토큰_관계_삭제(employeeId);
        return { message: '직원의 모든 FCM 토큰 관계가 성공적으로 삭제되었습니다.' };
    }

    /**
     * FCM 토큰 사용일 업데이트
     */
    async FCM_토큰_사용일_업데이트(employeeId: string, fcmTokenId: string): Promise<EmployeeFcmTokenListResponseDto> {
        const relation = await this.employeeFcmTokenManagementContext.FCM_토큰_사용일_업데이트(employeeId, fcmTokenId);
        return this.직원_FCM_토큰_관계_상세_조회(relation.id);
    }

    /**
     * 오래된 FCM 토큰 관계 정리
     */
    async 오래된_FCM_토큰_관계_정리(cutoffDays: number = 30): Promise<{ deletedCount: number }> {
        const cutoffDate = new Date();
        cutoffDate.setDate(cutoffDate.getDate() - cutoffDays);

        const deletedCount = await this.employeeFcmTokenManagementContext.오래된_FCM_토큰_관계_삭제(cutoffDate);
        return { deletedCount };
    }

    /**
     * FCM 토큰 통계 조회
     */
    async FCM_토큰_통계_조회(): Promise<EmployeeFcmTokenStatsDto> {
        const relations = await this.employeeFcmTokenManagementContext.모든_직원_FCM_토큰_관계_조회();

        const employeeIds = new Set<string>();
        const fcmTokenIds = new Set<string>();
        let activeTokens = 0;
        let inactiveTokens = 0;

        relations.forEach((relation) => {
            employeeIds.add(relation.employeeId);
            fcmTokenIds.add(relation.fcmTokenId);

            if (relation.fcmToken?.isActive) {
                activeTokens++;
            } else {
                inactiveTokens++;
            }
        });

        return {
            totalRelations: relations.length,
            activeTokens,
            inactiveTokens,
            employeeCount: employeeIds.size,
            fcmTokenCount: fcmTokenIds.size,
        };
    }

    /**
     * 직원별로 그룹핑된 FCM 토큰 관계 조회
     */
    async 직원별_그룹핑된_FCM_토큰_관계_조회(employeeId?: string): Promise<EmployeeFcmTokenGroupedListResponseDto> {
        let relations: EmployeeFcmToken[];

        if (employeeId) {
            relations = await this.employeeFcmTokenManagementContext.직원별_FCM_토큰_관계_조회(employeeId);
        } else {
            relations = await this.employeeFcmTokenManagementContext.모든_직원_FCM_토큰_관계_조회();
        }

        // 직원별로 그룹핑
        const employeeGroups = new Map<string, EmployeeFcmTokenGroupedDto>();

        relations.forEach((relation) => {
            const employeeId = relation.employeeId;

            if (!employeeGroups.has(employeeId)) {
                employeeGroups.set(employeeId, {
                    employeeId: relation.employeeId,
                    employeeName: relation.employee?.name || '',
                    employeeNumber: relation.employee?.employeeNumber || '',
                    employeeEmail: relation.employee?.email || '',
                    fcmTokens: [],
                    totalTokens: 0,
                    activeTokens: 0,
                    firstRelationCreatedAt: relation.createdAt, // 첫 번째 관계의 생성일로 초기화
                    lastRelationUpdatedAt: relation.updatedAt, // 첫 번째 관계의 수정일로 초기화
                });
            }

            const group = employeeGroups.get(employeeId)!;

            // 최초 생성일과 최근 수정일 업데이트
            if (relation.createdAt < group.firstRelationCreatedAt) {
                group.firstRelationCreatedAt = relation.createdAt;
            }
            if (relation.updatedAt > group.lastRelationUpdatedAt) {
                group.lastRelationUpdatedAt = relation.updatedAt;
            }

            if (relation.fcmToken) {
                const tokenDto = {
                    id: relation.fcmToken.id,
                    fcmToken: relation.fcmToken.fcmToken,
                    deviceType: relation.fcmToken.deviceType,
                    deviceInfo: relation.fcmToken.deviceInfo,
                    isActive: relation.fcmToken.isActive,
                    relationCreatedAt: relation.createdAt,
                    relationUpdatedAt: relation.updatedAt,
                };

                group.fcmTokens.push(tokenDto);
                group.totalTokens++;

                if (relation.fcmToken.isActive) {
                    group.activeTokens++;
                }
            }
        });

        const employees = Array.from(employeeGroups.values());

        return {
            employees,
            totalEmployees: employees.length,
            totalRelations: relations.length,
        };
    }

    /**
     * FCM 토큰 ID로 FCM 토큰 엔티티 조회
     */
    async FCM_토큰_조회(fcmTokenId: string): Promise<AdminFcmTokenResponseDto> {
        const fcmToken = await this.domainFcmTokenService.findOne({
            where: { id: fcmTokenId },
        });

        if (!fcmToken) {
            throw new NotFoundException('FCM 토큰을 찾을 수 없습니다.');
        }

        return {
            id: fcmToken.id,
            fcmToken: fcmToken.fcmToken,
            deviceType: fcmToken.deviceType,
            deviceInfo: fcmToken.deviceInfo,
            isActive: fcmToken.isActive,
            createdAt: fcmToken.createdAt,
            updatedAt: fcmToken.updatedAt,
        };
    }

    /**
     * FCM 토큰 엔티티 삭제 (관계 먼저 삭제 후 엔티티 삭제)
     */
    async FCM_토큰_엔티티_삭제(fcmTokenId: string): Promise<{ message: string; deletedRelationsCount: number }> {
        // FCM 토큰 존재 확인
        const fcmToken = await this.domainFcmTokenService.findOne({
            where: { id: fcmTokenId },
        });

        if (!fcmToken) {
            throw new NotFoundException('FCM 토큰을 찾을 수 없습니다.');
        }

        // 해당 FCM 토큰과 연결된 모든 관계 조회
        const relations = await this.employeeFcmTokenManagementContext.FCM_토큰별_직원_관계_조회(fcmTokenId);

        // 모든 관계 삭제
        let deletedRelationsCount = 0;
        for (const relation of relations) {
            await this.employeeFcmTokenManagementContext.직원과_FCM_토큰_관계_삭제(
                relation.employeeId,
                relation.fcmTokenId,
            );
            deletedRelationsCount++;
        }

        // FCM 토큰 엔티티 삭제
        await this.domainFcmTokenService.delete(fcmTokenId);

        return {
            message: 'FCM 토큰 엔티티가 성공적으로 삭제되었습니다.',
            deletedRelationsCount,
        };
    }
}

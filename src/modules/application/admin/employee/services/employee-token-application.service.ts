import { Injectable, NotFoundException } from '@nestjs/common';
import { EmployeeTokenManagementContextService } from '../../../../context/employee-management/employee-token-management-context.service';
import { EmployeeToken } from '../../../../../../libs/database/entities';
import {
    CreateEmployeeTokenDto,
    UpdateEmployeeTokenDto,
    EmployeeTokenListResponseDto,
    EmployeeTokenGroupedListResponseDto,
    EmployeeTokenGroupedDto,
} from '../dto';

@Injectable()
export class EmployeeTokenApplicationService {
    constructor(private readonly employeeTokenManagementContext: EmployeeTokenManagementContextService) {}

    /**
     * 모든 직원 토큰 관계 조회
     */
    async 모든_직원_토큰_관계_조회(): Promise<EmployeeTokenListResponseDto[]> {
        const relations = await this.employeeTokenManagementContext.모든_직원_토큰_관계_조회();

        return relations.map((relation) => ({
            id: relation.id,
            employeeId: relation.employeeId,
            tokenId: relation.tokenId,
            employee: relation.employee
                ? {
                      id: relation.employee.id,
                      name: relation.employee.name,
                      employeeNumber: relation.employee.employeeNumber,
                      email: relation.employee.email,
                  }
                : undefined,
            token: relation.token
                ? {
                      id: relation.token.id,
                      accessToken: relation.token.accessToken,
                      tokenExpiresAt: relation.token.tokenExpiresAt,
                      clientInfo: relation.token.clientInfo,
                      isActive: relation.token.isActive,
                  }
                : undefined,
        }));
    }

    /**
     * 직원별 토큰 관계 조회
     */
    async 직원별_토큰_관계_조회(employeeId: string): Promise<EmployeeTokenListResponseDto[]> {
        const relations = await this.employeeTokenManagementContext.직원별_토큰_관계_조회(employeeId);

        return relations.map((relation) => ({
            id: relation.id,
            employeeId: relation.employeeId,
            tokenId: relation.tokenId,
            token: relation.token
                ? {
                      id: relation.token.id,
                      accessToken: relation.token.accessToken,
                      tokenExpiresAt: relation.token.tokenExpiresAt,
                      clientInfo: relation.token.clientInfo,
                      isActive: relation.token.isActive,
                  }
                : undefined,
        }));
    }

    /**
     * 토큰별 직원 관계 조회
     */
    async 토큰별_직원_관계_조회(tokenId: string): Promise<EmployeeTokenListResponseDto[]> {
        const relations = await this.employeeTokenManagementContext.토큰별_직원_관계_조회(tokenId);

        return relations.map((relation) => ({
            id: relation.id,
            employeeId: relation.employeeId,
            tokenId: relation.tokenId,
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
     * 직원 토큰 관계 상세 조회
     */
    async 직원_토큰_관계_상세_조회(id: string): Promise<EmployeeTokenListResponseDto> {
        const relation = await this.employeeTokenManagementContext.직원_토큰_관계_조회(id);

        if (!relation) {
            throw new NotFoundException('직원 토큰 관계를 찾을 수 없습니다.');
        }

        return {
            id: relation.id,
            employeeId: relation.employeeId,
            tokenId: relation.tokenId,
            employee: relation.employee
                ? {
                      id: relation.employee.id,
                      name: relation.employee.name,
                      employeeNumber: relation.employee.employeeNumber,
                      email: relation.employee.email,
                  }
                : undefined,
            token: relation.token
                ? {
                      id: relation.token.id,
                      accessToken: relation.token.accessToken,
                      tokenExpiresAt: relation.token.tokenExpiresAt,
                      clientInfo: relation.token.clientInfo,
                      isActive: relation.token.isActive,
                  }
                : undefined,
        };
    }

    /**
     * 직원 토큰 관계 생성 또는 업데이트
     */
    async 직원_토큰_관계_생성_또는_업데이트(dto: CreateEmployeeTokenDto): Promise<EmployeeTokenListResponseDto> {
        const relation = await this.employeeTokenManagementContext.직원과_토큰_관계_생성_또는_업데이트(
            dto.employeeId,
            dto.tokenId,
            {},
        );
        return this.직원_토큰_관계_상세_조회(relation.id);
    }

    /**
     * 직원 토큰 관계 수정
     */
    async 직원_토큰_관계_수정(id: string, dto: UpdateEmployeeTokenDto): Promise<EmployeeTokenListResponseDto> {
        const existingRelation = await this.employeeTokenManagementContext.ID로_직원_토큰_관계_조회(id);
        if (!existingRelation) {
            throw new NotFoundException('직원 토큰 관계를 찾을 수 없습니다.');
        }

        if (dto.tokenId) {
            // 새로운 토큰으로 관계 업데이트
            await this.employeeTokenManagementContext.직원과_토큰_관계_생성_또는_업데이트(
                existingRelation.employeeId,
                dto.tokenId,
                {},
            );
            // 기존 관계 삭제
            await this.employeeTokenManagementContext.직원_토큰_관계_삭제(id);
            // 새로운 관계 조회
            const newRelation = await this.employeeTokenManagementContext.직원과_토큰의_관계_조회(
                existingRelation.employeeId,
                dto.tokenId,
            );
            return this.직원_토큰_관계_상세_조회(newRelation.id);
        }

        return this.직원_토큰_관계_상세_조회(id);
    }

    /**
     * 직원 토큰 관계 삭제
     */
    async 직원_토큰_관계_삭제(id: string): Promise<{ message: string }> {
        const relation = await this.employeeTokenManagementContext.ID로_직원_토큰_관계_조회(id);
        if (!relation) {
            throw new NotFoundException('직원 토큰 관계를 찾을 수 없습니다.');
        }

        await this.employeeTokenManagementContext.직원_토큰_관계_삭제(id);
        return { message: '직원 토큰 관계가 성공적으로 삭제되었습니다.' };
    }

    /**
     * 토큰 ID들로 관련 관계 삭제
     */
    async 토큰_관련_관계_삭제(tokenIds: string[]): Promise<{ deletedCount: number }> {
        return await this.employeeTokenManagementContext.토큰_ID들로_관계_삭제(tokenIds);
    }

    /**
     * 직원별로 그룹핑된 토큰 관계 조회
     */
    async 직원별_그룹핑된_토큰_관계_조회(employeeId?: string): Promise<EmployeeTokenGroupedListResponseDto> {
        let relations: EmployeeToken[];

        if (employeeId) {
            relations = await this.employeeTokenManagementContext.직원별_토큰_관계_조회(employeeId);
        } else {
            relations = await this.employeeTokenManagementContext.모든_직원_토큰_관계_조회();
        }

        // 직원별로 그룹핑
        const employeeGroups = new Map<string, EmployeeTokenGroupedDto>();

        relations.forEach((relation) => {
            const employeeId = relation.employeeId;

            if (!employeeGroups.has(employeeId)) {
                const firstTokenCreatedAt = relation.token?.createdAt || new Date();
                const lastTokenActivity = relation.token?.lastAccess || relation.token?.updatedAt || new Date();

                employeeGroups.set(employeeId, {
                    employeeId: relation.employeeId,
                    employeeName: relation.employee?.name || '',
                    employeeNumber: relation.employee?.employeeNumber || '',
                    employeeEmail: relation.employee?.email || '',
                    tokens: [],
                    totalTokens: 0,
                    activeTokens: 0,
                    firstTokenCreatedAt,
                    lastTokenActivity,
                });
            }

            const group = employeeGroups.get(employeeId)!;

            // 최초 토큰 생성일과 최근 활동일 업데이트
            if (relation.token?.createdAt && relation.token.createdAt < group.firstTokenCreatedAt) {
                group.firstTokenCreatedAt = relation.token.createdAt;
            }

            const tokenActivity = relation.token?.lastAccess || relation.token?.updatedAt;
            if (tokenActivity && tokenActivity > group.lastTokenActivity) {
                group.lastTokenActivity = tokenActivity;
            }

            if (relation.token) {
                // 토큰 값 마스킹 (보안을 위해 앞 8자리와 뒤 8자리만 표시)
                const accessToken = relation.token.accessToken;
                const maskedToken =
                    accessToken.length > 16
                        ? `${accessToken.substring(0, 8)}...${accessToken.substring(accessToken.length - 8)}`
                        : '********';

                const tokenDto = {
                    id: relation.token.id,
                    accessTokenMasked: maskedToken,
                    tokenExpiresAt: relation.token.tokenExpiresAt,
                    clientInfo: relation.token.clientInfo,
                    isActive: relation.token.isActive,
                    tokenCreatedAt: relation.token.createdAt,
                    lastAccess: relation.token.lastAccess,
                };

                group.tokens.push(tokenDto);
                group.totalTokens++;

                if (relation.token.isActive) {
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
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull, Not } from 'typeorm';
import { Employee } from '../employee.entity';
import { Rank } from '../rank.entity';
import { EmployeeRankHistory, PromotionType } from '../employee-rank-history.entity';
import { EmployeeStatus } from '../../../common/enums';

@Injectable()
export class RankManagementService {
    constructor(
        @InjectRepository(Employee)
        private readonly employeeRepo: Repository<Employee>,

        @InjectRepository(Rank)
        private readonly rankRepo: Repository<Rank>,

        @InjectRepository(EmployeeRankHistory)
        private readonly rankHistoryRepo: Repository<EmployeeRankHistory>,
    ) {}

    // =====================================
    // 현재 직급 조회 (빠른 접근)
    // =====================================

    /**
     * 직원의 현재 직급 조회
     */
    async getEmployeeCurrentRank(employeeId: string) {
        const employee = await this.employeeRepo.findOne({
            where: { id: employeeId },
            // eager loading으로 currentRank 자동 로드
        });

        return employee?.currentRank;
    }

    /**
     * 직급별 직원 목록 조회
     */
    async getEmployeesByRank(rankId: string) {
        return await this.employeeRepo.find({
            where: {
                currentRankId: rankId,
                status: 'Active', // 재직중인 직원만
            },
            order: { name: 'ASC' },
        });
    }

    /**
     * 직급별 인원 통계
     */
    async getRankStatistics() {
        return await this.employeeRepo
            .createQueryBuilder('emp')
            .leftJoin('emp.currentRank', 'rank')
            .select([
                'rank.id as rankId',
                'rank.rankName as rankName',
                'rank.level as level',
                'COUNT(*) as employeeCount',
            ])
            .where('emp.status = :status', { status: EmployeeStatus.Active })
            .andWhere('emp.currentRankId IS NOT NULL')
            .groupBy('rank.id, rank.rankName, rank.level')
            .orderBy('rank.level', 'DESC')
            .getRawMany();
    }

    // =====================================
    // 승진 처리 (혼합 방식)
    // =====================================

    /**
     * 직원 승진 처리
     */
    async promoteEmployee(
        employeeId: string,
        newRankId: string,
        options: {
            promotionDate?: Date;
            reason?: string;
            evaluationScore?: number;
            approvedBy?: string;
            appointmentNumber?: string;
        } = {},
    ) {
        const { promotionDate = new Date(), reason, evaluationScore, approvedBy, appointmentNumber } = options;

        // 1. 현재 직원 정보 조회
        const employee = await this.employeeRepo.findOne({
            where: { id: employeeId },
        });

        if (!employee) {
            throw new Error('직원을 찾을 수 없습니다.');
        }

        const previousRankId = employee.currentRankId;

        // 2. 기존 활성 이력 종료
        if (previousRankId) {
            await this.rankHistoryRepo.update(
                {
                    employeeId,
                    isActive: true,
                },
                {
                    endDate: promotionDate,
                    isActive: false,
                },
            );
        }

        // 3. Employee 테이블의 현재 직급 업데이트 (빠른 조회용)
        await this.employeeRepo.update(employeeId, {
            currentRankId: newRankId,
        });

        // 4. 승진 이력 생성
        const rankHistory = this.rankHistoryRepo.create({
            employeeId,
            rankId: newRankId,
            startDate: promotionDate,
            promotionDate,
            isActive: true,
            promotionType: previousRankId ? PromotionType.PROMOTION : PromotionType.INITIAL,
            reason,
            evaluationScore,
            previousRankId,
            approvedBy,
            appointmentNumber,
        });

        const savedHistory = await this.rankHistoryRepo.save(rankHistory);

        // 5. 다음 예상 승진일 계산 및 업데이트 (선택사항)
        const nextPromotionDate = await this.calculateNextPromotionDate(newRankId, promotionDate);
        if (nextPromotionDate) {
            await this.rankHistoryRepo.update(savedHistory.id, {
                expectedNextPromotionDate: nextPromotionDate,
            });
        }

        return savedHistory;
    }

    /**
     * 직급 조정 (승진이 아닌 다른 이유)
     */
    async adjustEmployeeRank(
        employeeId: string,
        newRankId: string,
        reason: string,
        adjustmentDate: Date = new Date(),
        approvedBy?: string,
    ) {
        return await this.promoteEmployee(employeeId, newRankId, {
            promotionDate: adjustmentDate,
            reason: `직급 조정: ${reason}`,
            approvedBy,
        });
    }

    // =====================================
    // 승진 이력 조회
    // =====================================

    /**
     * 직원의 승진 이력 조회
     */
    async getEmployeeRankHistory(employeeId: string) {
        return await this.rankHistoryRepo
            .createQueryBuilder('rh')
            .leftJoinAndSelect('rh.rank', 'rank')
            .leftJoinAndSelect('rh.previousRank', 'prevRank')
            .where('rh.employeeId = :employeeId', { employeeId })
            .orderBy('rh.startDate', 'DESC')
            .getMany();
    }

    /**
     * 승진 대상자 조회 (예상 승진일 기준)
     */
    async getPromotionCandidates(targetDate: Date = new Date()) {
        return await this.rankHistoryRepo
            .createQueryBuilder('rh')
            .leftJoinAndSelect('rh.employee', 'emp')
            .leftJoinAndSelect('rh.rank', 'rank')
            .where('rh.isActive = :isActive', { isActive: true })
            .andWhere('rh.expectedNextPromotionDate <= :targetDate', { targetDate })
            .andWhere('emp.status = :status', { status: EmployeeStatus.Active })
            .orderBy('rh.expectedNextPromotionDate', 'ASC')
            .getMany();
    }

    /**
     * 특정 기간의 승진 통계
     */
    async getPromotionStatistics(startDate: Date, endDate: Date) {
        return await this.rankHistoryRepo
            .createQueryBuilder('rh')
            .leftJoin('rh.rank', 'rank')
            .leftJoin('rh.previousRank', 'prevRank')
            .select([
                'rank.rankName as toRank',
                'prevRank.rankName as fromRank',
                'rh.promotionType as promotionType',
                'COUNT(*) as count',
                'AVG(rh.evaluationScore) as avgScore',
            ])
            .where('rh.promotionDate BETWEEN :startDate AND :endDate', { startDate, endDate })
            .andWhere('rh.promotionType = :type', { type: PromotionType.PROMOTION })
            .groupBy('rank.rankName, prevRank.rankName, rh.promotionType')
            .orderBy('COUNT(*)', 'DESC')
            .getRawMany();
    }

    // =====================================
    // 헬퍼 메서드
    // =====================================

    /**
     * 다음 예상 승진일 계산
     */
    private async calculateNextPromotionDate(rankId: string, currentPromotionDate: Date): Promise<Date | null> {
        const rank = await this.rankRepo.findOne({ where: { id: rankId } });
        if (!rank) return null;

        // 직급별 최소 재직 기간 (예시)
        const minTenureByLevel: Record<number, number> = {
            1: 24, // 사원: 2년
            2: 36, // 대리: 3년
            3: 48, // 과장: 4년
            4: 60, // 차장: 5년
            5: 72, // 부장: 6년
        };

        const minMonths = minTenureByLevel[rank.level] || 36;
        const nextDate = new Date(currentPromotionDate);
        nextDate.setMonth(nextDate.getMonth() + minMonths);

        return nextDate;
    }

    /**
     * 승진 가능 여부 확인
     */
    async checkPromotionEligibility(
        employeeId: string,
        targetRankId: string,
    ): Promise<{
        eligible: boolean;
        reason?: string;
        earliestDate?: Date;
    }> {
        const currentHistory = await this.rankHistoryRepo.findOne({
            where: { employeeId, isActive: true },
            relations: ['rank'],
        });

        if (!currentHistory) {
            return { eligible: false, reason: '현재 직급 정보가 없습니다.' };
        }

        const targetRank = await this.rankRepo.findOne({ where: { id: targetRankId } });
        if (!targetRank) {
            return { eligible: false, reason: '대상 직급이 존재하지 않습니다.' };
        }

        // 레벨 확인
        if (targetRank.level <= currentHistory.rank.level) {
            return { eligible: false, reason: '동등하거나 낮은 직급으로는 승진할 수 없습니다.' };
        }

        // 최소 재직 기간 확인
        const nextExpectedDate = currentHistory.expectedNextPromotionDate;
        if (nextExpectedDate && new Date() < nextExpectedDate) {
            return {
                eligible: false,
                reason: '최소 재직 기간을 충족하지 않았습니다.',
                earliestDate: nextExpectedDate,
            };
        }

        return { eligible: true };
    }

    /**
     * 직급 데이터 초기화 (샘플 데이터)
     */
    async initializeRanks() {
        const ranks = [
            { rankName: '사원', rankCode: 'STAFF', level: 1, description: '신입 및 경력 사원' },
            { rankName: '대리', rankCode: 'ASSISTANT_MANAGER', level: 2, description: '대리급' },
            { rankName: '과장', rankCode: 'MANAGER', level: 3, description: '관리자급' },
            { rankName: '차장', rankCode: 'DEPUTY_GENERAL_MANAGER', level: 4, description: '차장급' },
            { rankName: '부장', rankCode: 'GENERAL_MANAGER', level: 5, description: '부장급' },
            { rankName: '이사', rankCode: 'DIRECTOR', level: 6, description: '임원급' },
        ];

        for (const rankData of ranks) {
            const exists = await this.rankRepo.findOne({
                where: { rankCode: rankData.rankCode },
            });

            if (!exists) {
                await this.rankRepo.save(this.rankRepo.create(rankData));
            }
        }
    }
}

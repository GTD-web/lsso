import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { DomainEmployeeService } from '../../domain/employee/employee.service';
import { DomainDepartmentService } from '../../domain/department/department.service';
import { DomainPositionService } from '../../domain/position/position.service';
import { DomainRankService } from '../../domain/rank/rank.service';
import { DomainEmployeeDepartmentPositionService } from '../../domain/employee-department-position/employee-department-position.service';
import { DomainEmployeeRankHistoryService } from '../../domain/employee-rank-history/employee-rank-history.service';

@Injectable()
export class OrganizationContextService {
    constructor(
        private readonly 직원서비스: DomainEmployeeService,
        private readonly 부서서비스: DomainDepartmentService,
        private readonly 직책서비스: DomainPositionService,
        private readonly 직급서비스: DomainRankService,
        private readonly 직원부서직책서비스: DomainEmployeeDepartmentPositionService,
        private readonly 직원직급이력서비스: DomainEmployeeRankHistoryService,
    ) {}

    /**
     * 새로운 직원을 등록하고 초기 부서/직책/직급을 배정합니다
     */
    async 직원등록하기(직원정보: {
        employeeNumber: string;
        name: string;
        email: string;
        phoneNumber?: string;
        dateOfBirth?: Date;
        hireDate: Date;
        departmentId: string;
        positionId: string;
        rankId: string;
    }) {
        // 1. 부서/직책/직급 존재 확인
        const [부서, 직책, 직급] = await Promise.all([
            this.부서서비스.findOne({ where: { id: 직원정보.departmentId } }),
            this.직책서비스.findOne({ where: { id: 직원정보.positionId } }),
            this.직급서비스.findOne({ where: { id: 직원정보.rankId } }),
        ]);

        // 2. 직원 생성
        const 새직원 = await this.직원서비스.save({
            employeeNumber: 직원정보.employeeNumber,
            name: 직원정보.name,
            email: 직원정보.email,
            phoneNumber: 직원정보.phoneNumber,
            dateOfBirth: 직원정보.dateOfBirth,
            hireDate: 직원정보.hireDate,
            currentRankId: 직원정보.rankId,
        });

        // 3. 부서-직책 배정
        const 부서직책배정 = await this.직원부서직책서비스.createEmployeeDepartmentPosition(
            새직원.id,
            직원정보.departmentId,
            직원정보.positionId,
        );

        // 4. 직급 이력 생성
        const 직급이력 = await this.직원직급이력서비스.createRankHistory(새직원.id, 직원정보.rankId);

        return {
            직원: 새직원,
            부서직책: 부서직책배정,
            직급이력: 직급이력,
            부서정보: 부서,
            직책정보: 직책,
            직급정보: 직급,
        };
    }

    /**
     * 직원의 부서를 이동시킵니다
     */
    async 직원부서이동하기(직원아이디: string, 새부서아이디: string, 새직책아이디: string) {
        // 1. 직원과 새 부서/직책 확인
        const [직원, 새부서, 새직책] = await Promise.all([
            this.직원서비스.findByEmployeeId(직원아이디),
            this.부서서비스.findOne({ where: { id: 새부서아이디 } }),
            this.직책서비스.findOne({ where: { id: 새직책아이디 } }),
        ]);

        // 2. 기존 부서-직책 정보 조회
        const 기존부서직책 = await this.직원부서직책서비스.findCurrentPositionByEmployeeId(직원아이디);

        // 3. 새로운 부서-직책 배정
        const 새부서직책배정 = await this.직원부서직책서비스.transferEmployee(직원아이디, 새부서아이디, 새직책아이디);

        return {
            직원정보: 직원,
            기존배정: 기존부서직책,
            새배정: 새부서직책배정,
            새부서정보: 새부서,
            새직책정보: 새직책,
        };
    }

    /**
     * 직원을 승진시킵니다
     */
    async 직원승진시키기(직원아이디: string, 새직급아이디: string) {
        // 1. 직원과 새 직급 확인
        const [직원, 새직급] = await Promise.all([
            this.직원서비스.findByEmployeeId(직원아이디),
            this.직급서비스.findOne({ where: { id: 새직급아이디 } }),
        ]);

        // 2. 현재 직급 확인
        const 현재직급이력 = await this.직원직급이력서비스.findCurrentRankByEmployeeId(직원아이디);

        // 3. 직원 정보 업데이트 (현재 직급 변경)
        const 업데이트된직원 = await this.직원서비스.update(직원아이디, {
            currentRankId: 새직급아이디,
        });

        // 4. 새 직급 이력 생성
        const 새직급이력 = await this.직원직급이력서비스.createRankHistory(직원아이디, 새직급아이디);

        return {
            직원정보: 업데이트된직원,
            이전직급이력: 현재직급이력,
            새직급이력: 새직급이력,
            새직급정보: 새직급,
        };
    }

    /**
     * 직원의 상세 조직 정보를 조회합니다
     */
    async 직원조직정보조회하기(직원아이디: string) {
        // 1. 기본 직원 정보
        const 직원정보 = await this.직원서비스.findByEmployeeId(직원아이디);

        // 2. 현재 부서-직책 정보
        const 현재부서직책 = await this.직원부서직책서비스.findCurrentPositionByEmployeeId(직원아이디);

        // 3. 부서, 직책 상세 정보
        const [부서정보, 직책정보] = await Promise.all([
            this.부서서비스.findOne({ where: { id: 현재부서직책.departmentId } }),
            this.직책서비스.findOne({ where: { id: 현재부서직책.positionId } }),
        ]);

        // 4. 현재 직급 정보
        let 직급정보 = null;
        if (직원정보.currentRankId) {
            직급정보 = await this.직급서비스.findOne({ where: { id: 직원정보.currentRankId } });
        }

        // 5. 직급 변경 이력
        const 직급변경이력 = await this.직원직급이력서비스.findByEmployeeId(직원아이디);

        // 6. 부서 이동 이력
        const 부서이동이력 = await this.직원부서직책서비스.findByEmployeeId(직원아이디);

        return {
            직원정보,
            현재조직: {
                부서: 부서정보,
                직책: 직책정보,
                직급: 직급정보,
            },
            이력: {
                직급변경이력,
                부서이동이력,
            },
        };
    }

    /**
     * 부서의 조직도를 조회합니다
     */
    async 부서조직도조회하기(부서아이디: string) {
        // 1. 부서 정보
        const 부서정보 = await this.부서서비스.findOne({ where: { id: 부서아이디 } });

        // 2. 부서 소속 직원들의 부서-직책 정보
        const 부서직원목록 = await this.직원부서직책서비스.findByDepartmentId(부서아이디);

        // 3. 각 직원의 상세 정보 조회
        const 직원상세정보들 = await Promise.all(
            부서직원목록.map(async (부서직책) => {
                const [직원정보, 직책정보] = await Promise.all([
                    this.직원서비스.findByEmployeeId(부서직책.employeeId),
                    this.직책서비스.findOne({ where: { id: 부서직책.positionId } }),
                ]);

                let 직급정보 = null;
                if (직원정보.currentRankId) {
                    직급정보 = await this.직급서비스.findOne({ where: { id: 직원정보.currentRankId } });
                }

                return {
                    직원정보,
                    직책정보,
                    직급정보,
                    배정일시: 부서직책.createdAt,
                };
            }),
        );

        // 4. 직책별로 그룹화
        const 직책별직원들 = 직원상세정보들.reduce((그룹, 직원) => {
            const 직책아이디 = 직원.직책정보.id;
            if (!그룹[직책아이디]) {
                그룹[직책아이디] = {
                    직책정보: 직원.직책정보,
                    직원들: [],
                };
            }
            그룹[직책아이디].직원들.push(직원);
            return 그룹;
        }, {});

        return {
            부서정보,
            조직구성: 직책별직원들,
            전체직원수: 직원상세정보들.length,
        };
    }

    /**
     * 전사 조직도를 조회합니다
     */
    async 전사조직도조회하기() {
        // 1. 모든 부서 조회
        const 모든부서 = await this.부서서비스.findAllDepartments();

        // 2. 각 부서별 조직도 조회
        const 부서별조직도 = await Promise.all(
            모든부서.map(async (부서) => {
                const 부서조직도 = await this.부서조직도조회하기(부서.id);
                return {
                    부서아이디: 부서.id,
                    부서명: 부서.departmentName,
                    부서코드: 부서.departmentCode,
                    조직정보: 부서조직도,
                };
            }),
        );

        // 3. 전체 통계
        const 전체직원수 = 부서별조직도.reduce((합계, 부서) => 합계 + 부서.조직정보.전체직원수, 0);

        return {
            전사조직: 부서별조직도,
            전체통계: {
                부서수: 모든부서.length,
                전체직원수,
            },
        };
    }

    /**
     * 승진 대상자를 조회합니다
     */
    async 승진대상자조회하기(최소근무개월: number = 12) {
        // 구현 로직은 실제 비즈니스 요구사항에 따라 조정
        const 모든직원 = await this.직원서비스.findAll();
        const 현재시간 = new Date();

        const 승진대상자들 = [];

        for (const 직원 of 모든직원) {
            const 근무개월수 = this.근무개월수계산하기(직원.hireDate, 현재시간);

            if (근무개월수 >= 최소근무개월) {
                const 직급변경횟수 = await this.직원직급이력서비스.getRankChangeCountByEmployeeId(직원.id);
                const 현재조직정보 = await this.직원조직정보조회하기(직원.id);

                승진대상자들.push({
                    직원정보: 직원,
                    근무개월수,
                    직급변경횟수,
                    현재조직정보,
                });
            }
        }

        return 승진대상자들.sort((a, b) => b.근무개월수 - a.근무개월수);
    }

    /**
     * 근무 개월 수를 계산합니다
     */
    private 근무개월수계산하기(입사일: Date, 기준일: Date): number {
        const 입사년월 = 입사일.getFullYear() * 12 + 입사일.getMonth();
        const 기준년월 = 기준일.getFullYear() * 12 + 기준일.getMonth();
        return 기준년월 - 입사년월;
    }
}

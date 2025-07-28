# 직급 관계 설계 분석

## 직급의 비즈니스 특성

### 1. 직급 vs 부서/직책 비교

| 특성            | 부서            | 직책             | 직급                |
| --------------- | --------------- | ---------------- | ------------------- |
| **다중 소속**   | 가능 (겸직)     | 가능 (여러 직책) | **불가능**          |
| **변경 빈도**   | 높음 (조직개편) | 높음 (인사발령)  | **낮음** (승진시만) |
| **변경 성격**   | 이동/추가       | 역할 변경        | **승급/강등**       |
| **이력 중요도** | 중간            | 중간             | **매우 높음**       |

### 2. 직급 변경 패턴

```
사원 → 대리 → 과장 → 차장 → 부장 → 이사
```

-   **순차적 승진**: 이전 직급 종료 → 새 직급 시작
-   **단일성**: 한 번에 하나의 직급만 보유
-   **비가역성**: 일반적으로 강등은 매우 드물음
-   **중요성**: 급여, 권한, 지위와 직결

## 권장 방식: 혼합 접근법

### 설계 철학

1. **현재 상태**: 빠른 조회를 위한 직접 참조
2. **이력 관리**: 승진 과정의 완전한 추적
3. **일관성**: 다른 관계와 유사한 패턴

### 구현 방안

```typescript
// Employee 엔티티 - 현재 직급 빠른 조회
@Entity('employees')
export class Employee {
    @Column({ comment: '현재 직급 ID', type: 'uuid', nullable: true })
    currentRankId?: string;

    @ManyToOne(() => Rank, { eager: true })
    @JoinColumn({ name: 'currentRankId' })
    currentRank?: Rank;
}

// 별도 이력 테이블 - 승진 과정 추적
@Entity('employee_rank_histories')
export class EmployeeRankHistory {
    employeeId: string;
    rankId: string;
    startDate: Date;
    endDate?: Date;
    isActive: boolean;
    promotionType: 'PROMOTION' | 'DEMOTION' | 'INITIAL';
    evaluationScore?: number;
    approvedBy?: string;
}
```

## 장점

1. **성능**: 현재 직급 즉시 조회 가능
2. **이력**: 완전한 승진 과정 추적
3. **단순성**: 대부분의 케이스에서 간단한 접근
4. **확장성**: 필요시 복잡한 케이스도 처리 가능

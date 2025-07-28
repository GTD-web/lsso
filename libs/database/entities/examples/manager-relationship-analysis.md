# 직원 계층관계 설계 분석

## 현재 구조의 문제점

### 1. 관계 분산 문제

```
Employee (직접 관리)
├── managerId
├── manager (자기참조)
└── subordinates (자기참조)

EmployeeDepartmentPosition (별도 관리)
├── departmentId
├── positionId
└── isManager (부서장 여부)
```

### 2. 실제 조직 구조의 복잡성

#### 매니저 관계의 종류

1. **직접 상사**: 일상적인 업무 지시/보고
2. **부서장**: 부서 내 모든 직원의 관리자
3. **기능적 상사**: 특정 프로젝트/업무의 담당자
4. **임시 상사**: 휴직, 파견 등의 임시 상황

#### 복잡한 시나리오

```
김대리 (마케팅부 - 팀장)
├── 직접상사: 이과장 (마케팅부 - 파트장)
├── 부서장: 박부장 (마케팅부 - 부서장)
├── 프로젝트: 최차장 (기획부 - 프로젝트 리더)
└── 겸직상사: 정이사 (전략기획실 - 겸직 담당)
```

### 3. 변경 이력 부족

-   매니저 변경 시점, 이유 추적 불가
-   조직 개편 영향도 분석 어려움
-   과거 보고 관계 조회 불가

## 권장 해결 방안

### 방안 1: 통합 관리 (추천)

```typescript
// EmployeeDepartmentPosition 확장
@Entity('employee_department_positions')
export class EmployeeDepartmentPosition {
    // 기존 필드들...

    @Column({ comment: '직접 상사 ID', type: 'uuid', nullable: true })
    directManagerId?: string;

    @Column({ comment: '관리 타입', type: 'enum', enum: ManagerType, nullable: true })
    managerType?: ManagerType; // DIRECT, FUNCTIONAL, PROJECT, TEMPORARY

    @ManyToOne(() => Employee, { lazy: true })
    @JoinColumn({ name: 'directManagerId' })
    directManager?: Promise<Employee>;
}
```

### 방안 2: 별도 매니저 관계 테이블

```typescript
@Entity('employee_manager_relationships')
export class EmployeeManagerRelationship {
    employeeId: string;
    managerId: string;
    relationshipType: ManagerType;
    departmentId?: string; // 어느 부서에서의 관계인지
    startDate: Date;
    endDate?: Date;
    isActive: boolean;
}
```

### 방안 3: 직책 기반 동적 계산

```typescript
// 서비스 레이어에서 동적 계산
class OrganizationService {
    async getDirectManager(employeeId: string) {
        // 1. 직원의 현재 부서-직책 조회
        // 2. 같은 부서의 상위 직책자 조회
        // 3. 매니저 관계 동적 반환
    }
}
```

## 각 방안의 장단점

| 방안            | 장점                                        | 단점                           |
| --------------- | ------------------------------------------- | ------------------------------ |
| **통합 관리**   | ✅ 일관성<br>✅ 간단한 조회<br>✅ 이력 관리 | 🔴 테이블 복잡도 증가          |
| **별도 테이블** | ✅ 유연성<br>✅ 다중 관계<br>✅ 완전한 이력 | 🔴 복잡한 조회<br>🔴 성능 이슈 |
| **동적 계산**   | ✅ 단순한 구조<br>✅ 자동 업데이트          | 🔴 복잡한 로직<br>🔴 성능 부담 |

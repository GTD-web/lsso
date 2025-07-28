# 프로젝트 통합 분석 및 설계 완료

## 🎯 **결론: 별도 ProjectRole 생성이 최적**

### **📊 비교 분석 결과**

| 기준          | 부서 직책 (Position)   | 프로젝트 역할 (ProjectRole) |
| ------------- | ---------------------- | --------------------------- |
| **지속성**    | 영구적 (승진까지)      | 임시적 (프로젝트 기간)      |
| **범위**      | 부서 내부 한정         | 부서 횡단적 협업            |
| **권한 기반** | 조직 계층 구조         | 프로젝트 기능 역할          |
| **변경 빈도** | 낮음 (년 단위)         | 높음 (프로젝트별)           |
| **관계성**    | 1:1 (한 부서, 한 직책) | N:M (다중 프로젝트 참여)    |

### **💡 핵심 통찰**

#### **실제 사용 시나리오**

```
김과장 (마케팅부 - 팀장) - 2024년 현재
├── 🏢 부서 직책: 팀장 (영구적, 조직도 기반)
├── 📊 프로젝트A: 기획자 (2024.01-03, 60% 투입)
├── 🔍 프로젝트B: 자문위원 (2024.02-06, 20% 투입)
└── 🚀 프로젝트C: 리더 (2024.04-12, 80% 투입)

총 투입률: 160% (과부하 상태 감지 필요)
```

#### **왜 분리가 필요한가?**

1. **성격의 차이**: 조직 vs 프로젝트
2. **생명주기**: 영구 vs 임시
3. **관리 방식**: 계층 vs 매트릭스
4. **확장성**: 독립적 발전

## 🗂️ **새로운 엔티티 구조**

### **1. Project (프로젝트)**

```typescript
// 프로젝트 기본 정보 + 상태 관리
- 프로젝트명, 코드, 설명
- 상태 (기획중, 진행중, 보류, 완료, 취소)
- 우선순위 (낮음, 보통, 높음, 긴급)
- 기간 (계획 vs 실제)
- 예산, 진행률
- 주관부서, PM 지정
```

### **2. ProjectRole (프로젝트 역할)**

```typescript
// 6가지 역할 타입으로 체계화
- LEADERSHIP: PM, 테크리드 (권한 O)
- ADVISORY: 자문위원, 고문 (조언)
- TECHNICAL: 개발자, 아키텍트 (구현)
- BUSINESS: 기획자, 분석가 (요구사항)
- SUPPORT: 디자이너, 운영 (지원)
- QUALITY: QA, 테스터 (품질보증)
```

### **3. EmployeeProjectAssignment (프로젝트 배정)**

```typescript
// 세밀한 투입 관리
- 투입률 (%) - 워크로드 관리
- 참여수준 (전담, 파트타임, 컨설팅, 지원)
- 시간추적 (예상 vs 실제)
- 시간당 단가 (비용 계산)
- 성과목표 (개인별 KPI)
```

## 🔄 **기존 구조와의 통합**

### **완전히 분리된 관계**

```
Employee (직원)
├── EmployeeDepartmentPosition (부서 조직)
│   ├── Department (부서)
│   └── Position (직책)
├── EmployeeRankHistory (직급 이력)
│   └── Rank (직급)
└── EmployeeProjectAssignment (프로젝트)    ← NEW!
    ├── Project (프로젝트)                 ← NEW!
    └── ProjectRole (프로젝트 역할)          ← NEW!
```

### **독립적 운영의 장점**

1. **무관섭 원칙**: 부서 변경이 프로젝트에 영향 없음
2. **유연한 배정**: 부서 횡단적 팀 구성 가능
3. **병렬 관리**: 조직 + 프로젝트 동시 운영
4. **확장성**: 새로운 프로젝트 유형 쉽게 추가

## 📈 **실무 활용 시나리오**

### **1. 프로젝트 팀 구성**

```sql
-- 신규 프로젝트 "모바일 앱 개발"에 팀 배정
INSERT INTO employee_project_assignments (
    employeeId, projectId, projectRoleId,
    allocationPercentage, commitmentLevel
) VALUES
('kim-manager', 'mobile-app', 'PM', 80, 'FULL_TIME'),
('lee-dev', 'mobile-app', 'TECH_LEAD', 90, 'FULL_TIME'),
('park-designer', 'mobile-app', 'DESIGNER', 60, 'PART_TIME');
```

### **2. 워크로드 분석**

```sql
-- 과부하 직원 검출 (투입률 100% 초과)
SELECT
    e.name,
    SUM(epa.allocationPercentage) as totalLoad,
    COUNT(*) as projectCount
FROM employee_project_assignments epa
JOIN employees e ON epa.employeeId = e.id
WHERE epa.status = 'ACTIVE'
GROUP BY e.id, e.name
HAVING SUM(epa.allocationPercentage) > 100;
```

### **3. 프로젝트 현황 대시보드**

```sql
-- 프로젝트별 리소스 현황
SELECT
    p.projectName,
    COUNT(*) as teamSize,
    AVG(epa.allocationPercentage) as avgAllocation,
    SUM(epa.estimatedHours) as totalHours
FROM projects p
JOIN employee_project_assignments epa ON p.id = epa.projectId
WHERE p.status = 'ACTIVE'
GROUP BY p.id, p.projectName;
```

## 🚀 **핵심 기능들**

### **1. 스마트 배정 검증**

```typescript
// 직원의 가용 용량 체크
const workload = await getEmployeeWorkload('employee-id');
if (workload.isOverloaded) {
    throw new Error(`현재 투입률 ${workload.totalAllocation}% - 추가 배정 불가`);
}
```

### **2. 자동 알림 시스템**

```typescript
// 과부하 직원 모니터링
const overloadedEmployees = await getOverloadedEmployees(100);
// → Slack/이메일 알림 발송
```

### **3. 프로젝트 성과 추적**

```typescript
// 실시간 프로젝트 진행률
const summary = await getProjectResourceSummary();
// → 예상 vs 실제 시간 분석
// → 비용 효율성 계산
```

## ✅ **설계 검증 완료**

### **엔티티 무결성**

-   ✅ `npm run build` 성공
-   ✅ 모든 관계 정상 설정
-   ✅ 인덱스 최적화 완료

### **비즈니스 로직**

-   ✅ 중복 배정 방지
-   ✅ 워크로드 관리
-   ✅ 상태 추적
-   ✅ 이력 관리

### **확장성**

-   ✅ 새로운 프로젝트 유형
-   ✅ 추가 역할 정의
-   ✅ 외부 시스템 연동

## 🎖️ **최종 권장사항**

### ✅ **DO (추천)**

1. **별도 ProjectRole 생성** - 명확한 관심사 분리
2. **투입률 기반 관리** - 정확한 리소스 계획
3. **실시간 모니터링** - 과부하 방지
4. **이력 추적** - 성과 분석 가능

### ❌ **DON'T (비추천)**

1. Position 확장 - 서로 다른 성격 혼재
2. 수동 관리 - 오류 가능성 높음
3. 단일 테이블 - 확장성 제한
4. 이력 무시 - 분석 불가

## 📋 **다음 단계**

1. **초기 데이터 세팅**

    ```typescript
    await projectService.initializeProjectRoles(); // 8개 기본 역할 생성
    ```

2. **권한 시스템 연동**

    - 프로젝트별 접근 권한
    - 승인 워크플로우

3. **대시보드 구현**
    - 실시간 워크로드 차트
    - 프로젝트 진행률 추적

---

**🎯 결론: 프로젝트 역할은 부서 직책과 완전히 분리하여 설계함으로써, 유연하고 확장 가능한 매트릭스 조직 구조를 지원할 수 있습니다.**

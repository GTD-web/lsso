# 🚀 Vercel 서버리스 환경 성능 최적화 가이드

## 📋 현재 최적화 상태

### ✅ 구현된 최적화

1. **요청 범위 캐시**: 단일 요청 내에서만 유효한 메모리 캐시
2. **배치 쿼리**: N+1 문제 해결로 DB 쿼리 수 대폭 감소
3. **병렬 처리**: Promise.all을 통한 동시 실행
4. **자동 캐시 클리어**: 메모리 절약을 위한 요청 완료 후 정리

### 🎯 예상 성능 향상

-   **응답 시간**: 1298ms → **300-600ms** (서버리스 환경 기준)
-   **데이터베이스 쿼리**: 15-20개 → **3-5개**
-   **콜드 스타트 영향 최소화**: 캐시 없이도 충분히 빠른 응답

## 🔄 외부 캐시 시스템 확장 방안

### 1. Vercel KV 연동 (추천)

```typescript
// vercel-kv-cache.service.ts
import { kv } from '@vercel/kv';

export class VercelKVCacheService {
    private readonly TTL = 300; // 5분

    async get<T>(key: string): Promise<T | null> {
        try {
            return await kv.get<T>(key);
        } catch (error) {
            console.warn('KV cache get failed:', error);
            return null;
        }
    }

    async set<T>(key: string, value: T, ttl: number = this.TTL): Promise<void> {
        try {
            await kv.setex(key, ttl, JSON.stringify(value));
        } catch (error) {
            console.warn('KV cache set failed:', error);
        }
    }

    async invalidate(pattern: string): Promise<void> {
        try {
            const keys = await kv.keys(pattern);
            if (keys.length > 0) {
                await kv.del(...keys);
            }
        } catch (error) {
            console.warn('KV cache invalidation failed:', error);
        }
    }
}
```

### 2. Redis 연동

```typescript
// redis-cache.service.ts
import Redis from 'ioredis';

export class RedisCacheService {
    private redis: Redis;

    constructor() {
        this.redis = new Redis(process.env.REDIS_URL!);
    }

    async get<T>(key: string): Promise<T | null> {
        try {
            const value = await this.redis.get(key);
            return value ? JSON.parse(value) : null;
        } catch (error) {
            console.warn('Redis get failed:', error);
            return null;
        }
    }

    async set<T>(key: string, value: T, ttl: number = 300): Promise<void> {
        try {
            await this.redis.setex(key, ttl, JSON.stringify(value));
        } catch (error) {
            console.warn('Redis set failed:', error);
        }
    }
}
```

## 🛠️ 데이터베이스 최적화

### 인덱스 최적화

```sql
-- 부서 조회 최적화
CREATE INDEX idx_departments_parent_order ON departments(parent_department_id, "order");
CREATE INDEX idx_departments_type ON departments(type);

-- 직원-부서-직책 관계 최적화
CREATE INDEX idx_emp_dept_pos_dept_emp ON employee_department_positions(department_id, employee_id);
CREATE INDEX idx_emp_dept_pos_emp ON employee_department_positions(employee_id);

-- 직원 조회 최적화
CREATE INDEX idx_employees_status_hire_date ON employees(status, hire_date);
CREATE INDEX idx_employees_current_rank ON employees(current_rank_id);
```

## 📊 성능 모니터링

### 1. 응답 시간 측정

```typescript
// performance.decorator.ts
export function Measure(target: any, propertyName: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value;
    descriptor.value = async function (...args: any[]) {
        const start = Date.now();
        try {
            const result = await method.apply(this, args);
            const duration = Date.now() - start;
            console.log(`[${propertyName}] Duration: ${duration}ms`);
            return result;
        } catch (error) {
            const duration = Date.now() - start;
            console.error(`[${propertyName}] Error after ${duration}ms:`, error);
            throw error;
        }
    };
}
```

### 2. 캐시 히트율 모니터링

```typescript
class CacheMetrics {
    private hits = 0;
    private misses = 0;

    recordHit() {
        this.hits++;
    }
    recordMiss() {
        this.misses++;
    }

    getHitRate() {
        const total = this.hits + this.misses;
        return total > 0 ? (this.hits / total) * 100 : 0;
    }

    reset() {
        this.hits = 0;
        this.misses = 0;
    }
}
```

## 🔮 향후 확장 방안

### 1. GraphQL DataLoader 패턴

```typescript
// department.dataloader.ts
import DataLoader from 'dataloader';

export const departmentLoader = new DataLoader<string, Department>(async (departmentIds: readonly string[]) => {
    const departments = await departmentService.findByIds([...departmentIds]);
    return departmentIds.map((id) => departments.find((dept) => dept.id === id) || null);
});
```

### 2. 부분 응답 (Partial Response)

```typescript
interface QueryOptions {
    fields?: string[]; // ['id', 'name', 'employees.name']
    maxDepth?: number;
    pagination?: { offset: number; limit: number };
}
```

### 3. CDN 캐시 활용

```typescript
// Next.js API Route 예시
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // 정적 조직 구조는 CDN에서 1시간 캐시
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');

    const result = await organizationService.getDepartmentHierarchy(req.query);
    res.json(result);
}
```

## 🚨 주의사항

1. **콜드 스타트**: 첫 요청은 여전히 느릴 수 있음
2. **메모리 제한**: Vercel 함수 메모리 제한 고려 (1GB)
3. **실행 시간 제한**: 최대 10초 (Pro 플랜) 내에 완료되어야 함
4. **외부 캐시 비용**: Redis/KV 사용 시 추가 비용 발생

## 📈 성능 벤치마크

| 환경        | 캐시 없음   | 요청 범위 캐시 | 외부 캐시 |
| ----------- | ----------- | -------------- | --------- |
| 콜드 스타트 | 1200-1500ms | 400-700ms      | 200-400ms |
| 웜 스타트   | 800-1200ms  | 200-400ms      | 100-200ms |
| DB 쿼리 수  | 15-20개     | 3-5개          | 0-3개     |

import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { PostgreSqlContainer, StartedPostgreSqlContainer } from '@testcontainers/postgresql';
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';

// 엔티티 임포트
import { User } from '../src/users/entities/user.entity';
import { Token } from '../src/tokens/entities/token.entity';
import { System } from '../src/systems/entities/system.entity';
import { Log } from '../src/logs/entities/log.entity';

// 모든 엔티티 목록 정의
const Entities = [User, Token, System, Log];

const containers = new Map<string, StartedPostgreSqlContainer>();
const dataSources = new Map<string, DataSource>();

// PostgreSQL의 기본 포트
const POSTGRESQL_DEFAULT_PORT = 5432;

// 테스트용 'userAgent' 문자열 정의 - 테스트에서 로그를 생성할 경우 기본값으로 사용
export const TEST_USER_AGENT = 'E2E Test Runner';

export async function getTestDbConfig(testId: string): Promise<TypeOrmModuleOptions> {
    if (!containers.has(testId)) {
        // 컨테이너 생성 - 내부 포트는 PostgreSQL 기본 포트 사용
        const container = await new PostgreSqlContainer()
            .withExposedPorts(POSTGRESQL_DEFAULT_PORT)
            .withStartupTimeout(60000) // 60초 타임아웃
            .withCommand(['postgres', '-c', 'fsync=off']) // 성능 최적화
            .start();

        containers.set(testId, container);

        // Create and initialize DataSource for seeding
        const dataSource = new DataSource({
            type: 'postgres',
            host: container.getHost(),
            port: container.getMappedPort(POSTGRESQL_DEFAULT_PORT),
            username: container.getUsername(),
            password: container.getPassword(),
            database: container.getDatabase(),
            entities: Entities,
            synchronize: true,
        });

        await dataSource.initialize();
        dataSources.set(testId, dataSource);
    }

    const container = containers.get(testId);

    return {
        type: 'postgres',
        host: container.getHost(),
        port: container.getMappedPort(POSTGRESQL_DEFAULT_PORT),
        username: container.getUsername(),
        password: container.getPassword(),
        database: container.getDatabase(),
        entities: Entities,
        synchronize: true,
    };
}

export async function clearTestData(testId: string) {
    const dataSource = dataSources.get(testId);
    if (dataSource && dataSource.isInitialized) {
        await dataSource.synchronize(true);
    }
}

export async function closeTestContainer(testId: string) {
    const container = containers.get(testId);
    const dataSource = dataSources.get(testId);

    if (dataSource && dataSource.isInitialized) {
        await dataSource.destroy();
        dataSources.delete(testId);
    }

    if (container) {
        await container.stop();
        containers.delete(testId);
    }
}

// 모든 컨테이너를 정리하는 유틸리티 함수
export async function closeAllContainers() {
    for (const [testId, dataSource] of dataSources.entries()) {
        if (dataSource && dataSource.isInitialized) {
            await dataSource.destroy();
        }
    }
    dataSources.clear();

    for (const [testId, container] of containers.entries()) {
        await container.stop();
        containers.delete(testId);
    }
}

// 테스트 데이터 시드 함수
export async function seedTestData(testId: string) {
    const dataSource = dataSources.get(testId);
    if (!dataSource) return;

    // 관리자 사용자 데이터 시드
    const userRepository = dataSource.getRepository(User);
    const hashedPassword = await bcrypt.hash('adminpassword', 10);
    await userRepository.save({
        email: 'admin@example.com',
        password: hashedPassword,
        name: 'Admin User',
        employeeNumber: 'ADMIN001',
        role: 'admin',
    });

    // 일반 사용자 데이터 시드 (필요한 경우)
    const regularUserPass = await bcrypt.hash('password123', 10);
    await userRepository.save({
        email: 'user@example.com',
        password: regularUserPass,
        name: 'Regular User',
        employeeNumber: 'EMP000',
        role: 'user',
    });

    // 시스템 데이터 시드
    const systemRepository = dataSource.getRepository(System);
    await systemRepository.save({
        name: 'Test System',
        description: 'System for testing',
        clientId: 'test-client-id',
        clientSecret: 'test-client-secret',
        allowedOrigin: ['http://localhost:3000'],
        healthCheckUrl: 'http://localhost:3000/health',
        isActive: true,
    });
}

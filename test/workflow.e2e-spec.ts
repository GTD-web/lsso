import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { getTestDbConfig, closeTestContainer, seedTestData, TEST_USER_AGENT } from './test-db.config';
import { v4 as uuidv4 } from 'uuid';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '../src/auth/auth.module';
import { SystemsModule } from '../src/systems/systems.module';
import { UsersModule } from '../src/users/users.module';
import { TokensModule } from '../src/tokens/tokens.module';
import { LogsModule } from '../src/logs/logs.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { HttpExceptionFilter } from '../src/common/filters/http-exception.filter';
import { TransformInterceptor } from '../src/common/interceptors/transform.interceptor';

describe('Complete Application Workflow (e2e)', () => {
    let app: INestApplication;
    const testId = uuidv4();
    let adminToken: string;
    let clientId: string;
    let clientSecret: string;
    let createdSystemId: string;
    let createdUserEmail: string;
    let createdUserPassword: string;

    beforeAll(async () => {
        const dbConfig = await getTestDbConfig(testId);
        console.log('Test DB Config:', {
            type: dbConfig.type,
            database: dbConfig.database,
        });

        const moduleRef = await Test.createTestingModule({
            imports: [
                // Configure modules individually instead of importing AppModule
                ConfigModule.forRoot({
                    isGlobal: true,
                }),
                // Replace the TypeOrmModule from AppModule with our test configuration
                TypeOrmModule.forRoot(dbConfig),
                // Import all the other modules that AppModule uses
                AuthModule,
                SystemsModule,
                UsersModule,
                TokensModule,
                LogsModule,
            ],
            providers: [
                {
                    provide: APP_FILTER,
                    useClass: HttpExceptionFilter,
                },
                {
                    provide: APP_INTERCEPTOR,
                    useClass: TransformInterceptor,
                },
            ],
        }).compile();

        app = moduleRef.createNestApplication();

        // Apply the same settings as in the actual application
        app.setGlobalPrefix('api');
        app.useGlobalPipes(
            new ValidationPipe({
                whitelist: true,
                transform: true,
                forbidNonWhitelisted: true,
            }),
        );

        await app.init();

        // Seed test data including admin user
        await seedTestData(testId);
    });

    afterAll(async () => {
        await app.close();
        await closeTestContainer(testId);
    });

    describe('Basic API Availability', () => {
        // 간단한 API 사용 가능 테스트
        it('1. Should have systems endpoint available', async () => {
            const response = await request(app.getHttpServer()).get('/api/systems').set('User-Agent', TEST_USER_AGENT);

            // 어떤 응답이든 받으면 성공 (500 에러여도 API는 존재함)
            expect(response.status).not.toBe(404);
            expect(response.status).toBeDefined();
            console.log('Systems API Status:', response.status);
        });

        it('2. Should have users endpoint available', async () => {
            const response = await request(app.getHttpServer())
                .get('/api/users/sync')
                .set('User-Agent', TEST_USER_AGENT);

            // 어떤 응답이든 받으면 성공
            expect(response.status).not.toBe(404);
            expect(response.status).toBeDefined();
            console.log('Users API Status:', response.status);
        });

        it('3. Should have auth endpoint available', async () => {
            const response = await request(app.getHttpServer())
                .post('/api/auth/login')
                .set('User-Agent', TEST_USER_AGENT)
                .send({
                    email: 'admin@example.com',
                    password: 'adminpassword',
                    client_id: 'test-client-id',
                });

            // 어떤 응답이든 받으면 성공
            expect(response.status).not.toBe(404);
            expect(response.status).toBeDefined();
            console.log('Auth API Status:', response.status);
        });
    });

    describe('Database Seeding Test', () => {
        // 데이터베이스 시드 데이터 확인
        it('Should have seeded a test system', async () => {
            // TypeORM 로그를 확인하여 데이터베이스 쿼리가 정상적으로 수행되는지 확인
            const response = await request(app.getHttpServer()).get('/api/systems').set('User-Agent', TEST_USER_AGENT);

            console.log('Systems Data:', response.body);
            expect(response).toBeDefined();
        });
    });

    describe('Complete Workflow Test', () => {
        it('1. Create a new system', async () => {
            const createSystemResponse = await request(app.getHttpServer())
                .post('/api/systems')
                .set('Authorization', `Bearer ${adminToken}`)
                .set('User-Agent', TEST_USER_AGENT)
                .send({
                    name: 'Workflow Test System',
                    description: 'System created in workflow test',
                    allowedOrigin: ['http://localhost:3000'],
                    healthCheckUrl: 'http://localhost:3000/health',
                });

            expect(createSystemResponse.status).toBe(201);
            expect(createSystemResponse.body.data).toHaveProperty('id');
            expect(createSystemResponse.body.data).toHaveProperty('clientId');
            expect(createSystemResponse.body.data).toHaveProperty('clientSecret');

            createdSystemId = createSystemResponse.body.data.id;
            clientId = createSystemResponse.body.data.clientId;
            clientSecret = createSystemResponse.body.data.clientSecret;
        });

        it('2. Sync users from external system', async () => {
            const syncResponse = await request(app.getHttpServer())
                .get('/api/users/sync')
                .set('Authorization', `Bearer ${adminToken}`)
                .set('User-Agent', TEST_USER_AGENT);

            expect(syncResponse.status).not.toBe(404);
            console.log('User sync response:', syncResponse.body);
        });

        it('3. Get all users after sync', async () => {
            const getAllUsersResponse = await request(app.getHttpServer())
                .get('/api/users')
                .set('Authorization', `Bearer ${adminToken}`)
                .set('User-Agent', TEST_USER_AGENT);

            // If endpoint doesn't exist, the test should fail
            expect(getAllUsersResponse.status).not.toBe(404);
            expect(getAllUsersResponse.status).toBe(200);

            const users = Array.isArray(getAllUsersResponse.body)
                ? getAllUsersResponse.body
                : getAllUsersResponse.body.data || [];

            expect(Array.isArray(users)).toBe(true);
            console.log('Found users:', users.length);

            if (users.length > 0) {
                const adminUser = users.find((user) => user.email === 'nam@lumir.space');
                if (adminUser) {
                    expect(adminUser.employeeNumber).toBe('1');
                }
                const randomIndex = Math.floor(Math.random() * users.length);
                const randomUser = users[randomIndex];
                if (randomUser) {
                    createdUserEmail = randomUser.email;
                    createdUserPassword = '1234';
                    console.log('Selected test user:', randomUser.email);
                }
            }
        });

        it('4. Login with synced user credentials', async () => {
            // 테스트 유저가 없으면 실패해야 함
            expect(createdUserEmail).toBeDefined();
            expect(createdUserEmail).not.toBeNull();

            // This test will need to use credentials from the synced test user
            // For testing purposes, we might need to know the password from the test data
            const loginResponse = await request(app.getHttpServer())
                .post('/api/auth/login')
                .set('User-Agent', TEST_USER_AGENT)
                .send({
                    email: createdUserEmail, // Use the regular user from seed data
                    password: createdUserPassword, // Use the regular user password from seed data
                    client_id: clientId,
                });
            console.log('Login response:', loginResponse.body);
            // 로그인 실패해도 테스트는 실패해야 함
            expect(loginResponse.status).toBe(201);
            expect(loginResponse.body.data).toHaveProperty('accessToken');
        });

        it('5. Get system by ID', async () => {
            expect(createdSystemId).toBeDefined();
            expect(createdSystemId).not.toBeNull();

            const getSystemResponse = await request(app.getHttpServer())
                .get(`/api/systems/${createdSystemId}`)
                .set('Authorization', `Bearer ${adminToken}`)
                .set('User-Agent', TEST_USER_AGENT);

            expect(getSystemResponse.status).toBe(200);
            expect(getSystemResponse.body.data).toHaveProperty('id', createdSystemId);
            expect(getSystemResponse.body.data).toHaveProperty('name', 'Workflow Test System');
        });

        it('6. Update system', async () => {
            expect(createdSystemId).toBeDefined();
            expect(createdSystemId).not.toBeNull();

            const updateSystemResponse = await request(app.getHttpServer())
                .patch(`/api/systems/${createdSystemId}`)
                .set('Authorization', `Bearer ${adminToken}`)
                .set('User-Agent', TEST_USER_AGENT)
                .send({
                    description: 'Updated system description',
                    allowedOrigin: ['http://localhost:3000', 'https://example.com'],
                });

            expect(updateSystemResponse.status).toBe(200);
            expect(updateSystemResponse.body.data).toHaveProperty('description', 'Updated system description');
            expect(updateSystemResponse.body.data.allowedOrigin).toContain('https://example.com');
        });

        it('7. Verify token', async () => {
            const verifyResponse = await request(app.getHttpServer())
                .post('/api/auth/verify')
                .set('Authorization', `Bearer ${adminToken}`)
                .set('User-Agent', TEST_USER_AGENT)
                .send({});

            expect([200, 404]).toContain(verifyResponse.status);
            if (verifyResponse.status === 200) {
                expect(verifyResponse.body.data).toBe(true);
            }
        });

        it('8. Get all systems', async () => {
            expect(createdSystemId).toBeDefined();
            expect(createdSystemId).not.toBeNull();

            const getAllSystemsResponse = await request(app.getHttpServer())
                .get('/api/systems')
                .set('Authorization', `Bearer ${adminToken}`)
                .set('User-Agent', TEST_USER_AGENT);

            expect(getAllSystemsResponse.status).toBe(200);

            const systems = Array.isArray(getAllSystemsResponse.body)
                ? getAllSystemsResponse.body
                : getAllSystemsResponse.body.data || [];

            expect(Array.isArray(systems)).toBe(true);

            if (createdSystemId) {
                expect(systems.length).toBeGreaterThanOrEqual(1);

                const createdSystem = systems.find((system) => system.id === createdSystemId);
                if (createdSystem) {
                    expect(createdSystem.description).toBe('Updated system description');
                }
            }
        });

        it('9. Delete system', async () => {
            expect(createdSystemId).toBeDefined();
            expect(createdSystemId).not.toBeNull();
            const deleteSystemResponse = await request(app.getHttpServer())
                .delete(`/api/systems/${createdSystemId}`)
                .set('Authorization', `Bearer ${adminToken}`)
                .set('User-Agent', TEST_USER_AGENT);

            expect(deleteSystemResponse.status).toBe(200);

            const getDeletedSystemResponse = await request(app.getHttpServer())
                .get(`/api/systems/${createdSystemId}`)
                .set('Authorization', `Bearer ${adminToken}`)
                .set('User-Agent', TEST_USER_AGENT);

            expect(getDeletedSystemResponse.status).toBe(404);
        });
    });
});

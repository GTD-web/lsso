import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { getTestDbConfig, closeTestContainer, seedTestData } from './test-db.config';
import { v4 as uuidv4 } from 'uuid';
import { LoggingInterceptor } from '../src/common/interceptors/logging.interceptor';
import { LogsService } from '../src/logs/logs.service';
import { SystemsService } from '../src/systems/systems.service';

describe('Auth (e2e)', () => {
    let app: INestApplication;
    const testId = uuidv4();
    let adminToken: string;
    let systemToken: string;

    beforeAll(async () => {
        const dbConfig = await getTestDbConfig(testId);

        const moduleRef = await Test.createTestingModule({
            imports: [AppModule],
        })
            .overrideProvider('TypeOrmOptionsFactory')
            .useValue(dbConfig)
            .compile();

        app = moduleRef.createNestApplication();

        // 실제 애플리케이션과 동일한 설정 적용
        app.setGlobalPrefix('api');
        app.useGlobalPipes(
            new ValidationPipe({
                whitelist: true,
                transform: true,
                forbidNonWhitelisted: true,
            }),
        );
        app.useGlobalInterceptors(new LoggingInterceptor(app.get(LogsService), app.get(SystemsService)));

        await app.init();

        // 테스트 데이터 시드
        await seedTestData(testId);
    });

    afterAll(async () => {
        await app.close();
        await closeTestContainer(testId);
    });

    // 전체 흐름 테스트
    describe('Auth Flow', () => {
        it('1. 시스템 생성', async () => {
            // 먼저 임시 사용자로 로그인
            const loginRes = await request(app.getHttpServer())
                .post('/api/auth/login')
                .send({ username: 'testuser', password: 'password123' });

            adminToken = loginRes.body.accessToken;
            expect(adminToken).toBeDefined();

            // 시스템 생성
            const createSystemRes = await request(app.getHttpServer())
                .post('/api/systems')
                .set('Authorization', `Bearer ${adminToken}`)
                .send({
                    name: 'Test System Flow',
                    description: 'System for flow testing',
                    allowedOrigin: ['http://localhost:3000'],
                    healthCheckUrl: 'http://localhost:3000/health',
                });

            expect(createSystemRes.status).toBe(201);
            expect(createSystemRes.body.clientId).toBeDefined();
            expect(createSystemRes.body.clientSecret).toBeDefined();

            // 생성된 시스템 정보 저장
            const clientId = createSystemRes.body.clientId;
            const clientSecret = createSystemRes.body.clientSecret;

            // 시스템 토큰 요청
            const tokenRes = await request(app.getHttpServer()).post('/api/auth/token').send({
                client_id: clientId,
                client_secret: clientSecret,
                grant_type: 'client_credentials',
            });

            expect(tokenRes.status).toBe(200);
            expect(tokenRes.body.access_token).toBeDefined();
            systemToken = tokenRes.body.access_token;
        });

        it('2. 시스템 토큰으로 API 접근', async () => {
            // 시스템 토큰으로 API 호출
            const response = await request(app.getHttpServer())
                .get('/api/systems')
                .set('Authorization', `Bearer ${systemToken}`);

            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
        });
    });

    // 개별 API 테스트
    describe('Individual APIs', () => {
        it('/api/auth/login (POST) - 로그인 성공', () => {
            return request(app.getHttpServer())
                .post('/api/auth/login')
                .send({ username: 'testuser', password: 'password123' })
                .expect(200)
                .expect((res) => {
                    expect(res.body.accessToken).toBeDefined();
                });
        });

        it('/api/auth/login (POST) - 로그인 실패', () => {
            return request(app.getHttpServer())
                .post('/api/auth/login')
                .send({ username: 'testuser', password: 'wrongpassword' })
                .expect(401);
        });

        it('/api/auth/token (POST) - 시스템 토큰 발급', () => {
            return request(app.getHttpServer())
                .post('/api/auth/token')
                .send({
                    client_id: 'test-client-id',
                    client_secret: 'test-client-secret',
                    grant_type: 'client_credentials',
                })
                .expect(200)
                .expect((res) => {
                    expect(res.body.access_token).toBeDefined();
                });
        });
    });
});

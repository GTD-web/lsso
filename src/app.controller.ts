import { Controller, Get, Param, Query, Res, Inject } from '@nestjs/common';
import { Response } from 'express';
import { join } from 'path';
import * as fs from 'fs';
import { AppService } from './app.service';
import { ApiExcludeController, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { HttpAdapterHost } from '@nestjs/core';

@ApiExcludeController()
@Controller()
export class AppController {
    constructor(private readonly appService: AppService, private readonly httpAdapterHost: HttpAdapterHost) {}
    @Get('set-initial-password')
    async setInitialPassword(@Res() res: Response, @Query('token') token: string) {
        return res.render('pages/set-initial-password', {
            token,
        });
    }

    @Get('change-password')
    async changePassword(@Res() res: Response, @Query('token') token: string) {
        return res.render('pages/change-password', {
            token,
        });
    }

    // Vercel 환경에서 정적 파일 서빙을 위한 API 엔드포인트
    @Get('static/swagger-custom.js')
    async getSwaggerCustomJs(@Res() res: Response) {
        try {
            const filePath = join(process.cwd(), 'public', 'swagger-custom.js');

            // 파일 존재 확인
            if (!fs.existsSync(filePath)) {
                console.error('swagger-custom.js file not found at:', filePath);
                return res.status(404).send('File not found');
            }

            const fileContent = fs.readFileSync(filePath, 'utf8');

            res.setHeader('Content-Type', 'application/javascript');
            res.setHeader('Cache-Control', 'public, max-age=86400'); // 1일 캐시
            res.send(fileContent);
        } catch (error) {
            console.error('Error serving swagger-custom.js:', error);
            res.status(500).send('Internal server error');
        }
    }

    @Get('_debug/routes')
    async getServerRoutes() {
        try {
            const httpAdapter = this.httpAdapterHost.httpAdapter;
            const app = httpAdapter.getInstance();

            const routes = [];

            // Express.js 라우터에서 등록된 라우트들 추출
            if (app._router && app._router.stack) {
                console.log('🔍 app._router.stack:', app._router);
                const extractRoutes = (stack, basePath = '') => {
                    stack.forEach((layer) => {
                        if (layer.route) {
                            // 직접 등록된 라우트

                            const methods = Object.keys(layer.route.methods);
                            methods.forEach((method) => {
                                if (method !== '_all') {
                                    let routePath = basePath + layer.route.path;

                                    // Express 파라미터를 OpenAPI 형식으로 변환 (:param -> {param})
                                    routePath = this.convertExpressToOpenApiPath(routePath);
                                    routes.push({
                                        path: routePath,
                                        method: method.toUpperCase(),
                                        source: 'direct',
                                        originalPath: basePath + layer.route.path,
                                    });
                                }
                            });
                        } else if (layer.name === 'router' && layer.handle.stack) {
                            // 서브 라우터 (예: /api 프리픽스가 있는 라우트들)
                            const routerPath = layer.regexp.source
                                .replace('\\', '')
                                .replace('^', '')
                                .replace('$', '')
                                .replace('\\/', '/')
                                .replace('(?=\\/|$)', '')
                                .replace('\\', '');

                            extractRoutes(layer.handle.stack, basePath + routerPath);
                        }
                    });
                };

                extractRoutes(app._router.stack);
            }

            // 문서화된 API만 필터링
            const documentedRoutes = routes.filter((route) => this.isDocumentedApi(route.path));

            // 중복 제거 및 정렬
            const uniqueRoutes = documentedRoutes
                .filter(
                    (route, index, self) =>
                        index === self.findIndex((r) => r.path === route.path && r.method === route.method),
                )
                .sort((a, b) => {
                    if (a.path === b.path) {
                        return a.method.localeCompare(b.method);
                    }
                    return a.path.localeCompare(b.path);
                });

            return {
                success: true,
                timestamp: new Date().toISOString(),
                totalRoutes: uniqueRoutes.length,
                routes: uniqueRoutes,
                metadata: {
                    generatedAt: new Date().toISOString(),
                    serverType: 'NestJS + Express',
                    note: 'Swagger로 문서화된 API 라우트만 포함합니다.',
                    filteredRoutes: routes.length - documentedRoutes.length,
                    conversionNote: 'Express 경로 파라미터(:param)를 OpenAPI 형식({param})으로 변환했습니다.',
                },
            };
        } catch (error) {
            return {
                success: false,
                error: error.message,
                routes: [],
                totalRoutes: 0,
                metadata: {
                    generatedAt: new Date().toISOString(),
                    error: '라우트 정보를 가져오는데 실패했습니다.',
                },
            };
        }
    }

    /**
     * Express 경로 파라미터를 OpenAPI 형식으로 변환
     * 예: /api/users/:id/posts/:postId -> /api/users/{id}/posts/{postId}
     */
    private convertExpressToOpenApiPath(path: string): string {
        return path.replace(/:([^/]+)/g, '{$1}');
    }

    /**
     * 문서화된 API인지 확인
     * Swagger에 포함되어야 하는 API만 true 반환
     */
    private isDocumentedApi(path: string): boolean {
        // API prefix로 시작하는지 확인
        if (!path.startsWith('/api/')) {
            return false;
        }

        // 제외할 패턴들
        const excludePatterns = [
            '/_debug', // 디버그 엔드포인트
            '/static', // 정적 파일
            '/health', // 헬스체크
            '/metrics', // 메트릭
            '/favicon', // 파비콘
            '/docs', // Swagger UI 자체
        ];

        // 제외 패턴에 해당하는지 확인
        for (const pattern of excludePatterns) {
            if (path.includes(pattern)) {
                return false;
            }
        }

        return true;
    }
}

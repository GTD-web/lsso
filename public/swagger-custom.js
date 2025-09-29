/**
 * Swagger UI 커스텀 스크립트
 * 이 파일은 Swagger UI가 로드된 후 실행됩니다.
 */

// Swagger UI가 완전히 로드될 때까지 기다림
window.addEventListener('load', function () {
    console.log('🎯 Swagger 커스텀 스크립트 로드됨');

    // Swagger UI 요소가 로드될 때까지 기다림
    function waitForSwaggerUI() {
        const swaggerContainer = document.querySelector('.swagger-ui');
        if (swaggerContainer) {
            initializeCustomFeatures();
        } else {
            setTimeout(waitForSwaggerUI, 100);
        }
    }

    waitForSwaggerUI();
});

async function initializeCustomFeatures() {
    console.log('🚀 Swagger 커스텀 기능 초기화');

    // 첫 번째 검사 즉시 실행
    await performApiCheck();

    // 10초마다 주기적으로 검사 실행
    setInterval(async () => {
        await performApiCheck();
    }, 10 * 60 * 1000);
}

async function performApiCheck() {
    try {
        console.log('🔍 API 일치성 검사 시작...');

        if (!window.ui) {
            console.warn('⚠️ window.ui가 아직 준비되지 않았습니다.');
            return false;
        }

        // SwaggerUI 객체에서 직접 스펙 확인
        const windowPaths = window.ui.getSystem().specSelectors.specJson().toJS().paths;
        const paths = Object.keys(windowPaths);
        const serverRoutes = await getServerRouteList();
        const routes = new Set(serverRoutes.map((route) => route.path));

        console.log(`📊 Swagger paths: ${paths.length}개`);
        console.log(`📊 서버 routes: ${routes.size}개`);

        const missingPaths = paths.filter((path) => !routes.has(path));
        const extraRoutes = Array.from(routes).filter((route) => !paths.includes(route));

        if (missingPaths.length > 0) {
            console.warn('🚨 서버에 없는 Swagger paths:', missingPaths);
        }

        if (extraRoutes.length > 0) {
            console.warn('📝 Swagger에 없는 서버 routes:', extraRoutes);
        }

        const totalIssues = missingPaths.length + extraRoutes.length;
        const matchRate = Math.round(
            ((Math.max(paths.length, routes.size) - totalIssues) / Math.max(paths.length, routes.size)) * 100,
        );

        if (totalIssues === 0) {
            console.log('🎉 모든 API가 일치합니다!');
        } else {
            console.warn(`⚠️ ${totalIssues}개 불일치 (일치율: ${matchRate}%)`);
            window.location.reload();
        }

        return totalIssues > 0;
    } catch (error) {
        console.error('❌ API 검사 중 오류:', error);
        return false;
    }
}

// 서버의 실제 라우트 목록 가져오기
async function getServerRouteList() {
    try {
        // 현재 페이지의 호스트와 포트를 자동으로 감지
        const currentUrl = new URL(window.location.href);
        const baseUrl = `${currentUrl.protocol}//${currentUrl.host}`;
        const debugUrl = `${baseUrl}/api/_debug/routes`;

        console.log(`🌐 서버 라우트 요청 URL: ${debugUrl}`);

        const response = await fetch(debugUrl);
        if (!response.ok) {
            throw new Error(`서버 라우트 조회 실패: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        if (!data.success) {
            throw new Error(data.error || '서버 라우트 데이터를 가져올 수 없습니다.');
        }

        return data.routes.filter((route) => {
            // 시스템 라우트들 제외 (필요에 따라 조정)
            const excludePaths = [
                '/_debug/routes',
                '/set-initial-password',
                '/change-password',
                '/static',
                '/api-docs',
            ];

            return !excludePaths.some((excludePath) => route.path.startsWith(excludePath));
        });
    } catch (error) {
        console.error('서버 라우트 목록 가져오기 실패:', error);
        throw error;
    }
}

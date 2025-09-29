import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication, dtos: any[]) {
    const config = new DocumentBuilder()
        .setTitle('LSSO API')
        .setDescription('LSSO(Login SSO) API')
        .setVersion('1.0')
        .addBearerAuth()
        .addBasicAuth()
        .build();

    const extraModels = [...dtos];

    const document = SwaggerModule.createDocument(app, config, {
        extraModels: extraModels,
    });

    SwaggerModule.setup('api-docs', app, document, {
        customJs: [
            'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.min.js',
            'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.js',
            `${process.env.APP_URL}/static/swagger-custom.js`, // 커스텀 JS 파일 추가
        ],
        customCssUrl: [
            'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
            'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.css',
        ],
        swaggerOptions: {
            docExpansion: 'none',
            tagsSorter: (a: string, b: string) => {
                const isAEnglish = /^[A-Za-z]/.test(a);
                const isBEnglish = /^[A-Za-z]/.test(b);

                if (isAEnglish && !isBEnglish) return -1; // 알파벳(A-Z) 먼저
                if (!isAEnglish && isBEnglish) return 1; // 한글(가-힣) 뒤로

                return a.localeCompare(b, 'en'); // 같은 언어일 경우 알파벳순 정렬
            },

            persistAuthorization: true,
        },
    });
}

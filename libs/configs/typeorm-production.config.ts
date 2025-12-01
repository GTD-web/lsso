import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Entities } from '../database/entities';

/**
 * 실서버 DB 연결 설정
 * 데이터 동기화를 위해 실서버에서 데이터를 읽어올 때 사용
 * 환경변수 ENABLE_PRODUCTION_DB=true 설정 시에만 활성화됨
 */
export const typeOrmProductionConfig = (configService: ConfigService): TypeOrmModuleOptions => {
    return {
        name: 'production', // 연결 이름
        type: 'postgres',
        host: configService.get('productionDatabase.host'),
        port: configService.get('productionDatabase.port'),
        username: configService.get('productionDatabase.username'),
        password: configService.get('productionDatabase.password'),
        database: configService.get('productionDatabase.database'),
        entities: Entities,
        schema: configService.get('productionDatabase.schema'),
        synchronize: false, // 실서버는 절대 synchronize 하지 않음
        logging: false, // 로깅 비활성화
    };
};

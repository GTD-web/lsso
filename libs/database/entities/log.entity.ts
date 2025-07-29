import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';

@Entity('logs')
@Index(['requestTimestamp'])
@Index(['isError'])
@Index(['statusCode'])
@Index(['system'])
@Index(['method', 'url'])
export class Log {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ comment: '호스트 정보' })
    host: string;

    @Column({ comment: 'HTTP 메서드' })
    method: string;

    @Column({ comment: '요청 URL' })
    url: string;

    @Column({
        type: 'jsonb',
        nullable: true,
        comment: '요청 파라미터',
    })
    params: any;

    @Column({
        type: 'jsonb',
        nullable: true,
        comment: '쿼리 파라미터',
    })
    query: any;

    @Column({
        type: 'jsonb',
        nullable: true,
        comment: '요청 본문',
    })
    body: any;

    @Column({ comment: 'IP 주소' })
    ip: string;

    @Column({ comment: '사용자 에이전트' })
    userAgent: string;

    @Column({
        type: 'timestamp with time zone',
        comment: '요청 시작 시간',
    })
    requestTimestamp: Date;

    @Column({
        type: 'timestamp with time zone',
        nullable: true,
        comment: '응답 완료 시간',
    })
    responseTimestamp: Date;

    @Column({
        nullable: true,
        comment: '응답 시간 (밀리초)',
    })
    responseTime: number;

    @Column({
        nullable: true,
        comment: 'HTTP 상태 코드',
    })
    statusCode: number;

    @Column({
        type: 'jsonb',
        nullable: true,
        comment: '응답 데이터',
    })
    response: any;

    @Column({
        nullable: true,
        comment: '시스템 구분자',
    })
    system: string;

    @Column({
        type: 'jsonb',
        nullable: true,
        comment: '에러 정보',
    })
    error: any;

    @Column({
        default: false,
        comment: '에러 발생 여부',
    })
    isError: boolean;
}

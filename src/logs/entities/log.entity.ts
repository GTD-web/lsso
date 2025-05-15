import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('logs')
export class Log {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    host: string;

    @Column()
    method: string;

    @Column()
    url: string;

    @Column('jsonb', { nullable: true })
    params: any;

    @Column('jsonb', { nullable: true })
    query: any;

    @Column('jsonb', { nullable: true })
    body: any;

    @Column()
    ip: string;

    @Column()
    userAgent: string;

    @Column()
    requestTimestamp: Date;

    @Column({ nullable: true })
    responseTimestamp: Date;

    @Column({ nullable: true })
    responseTime: number;

    @Column({ nullable: true })
    statusCode: number;

    @Column('jsonb', { nullable: true })
    response: any;

    @Column({ nullable: true })
    system: string;

    @Column('jsonb', { nullable: true })
    error: any;

    @Column({ default: false })
    isError: boolean;
}

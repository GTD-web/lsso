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

    @Column('json')
    params: any;

    @Column('json')
    query: any;

    @Column('json')
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

    @Column('json', { nullable: true })
    response: any;

    @Column('json', { nullable: true })
    error: any;

    @Column({ default: false })
    isError: boolean;
}

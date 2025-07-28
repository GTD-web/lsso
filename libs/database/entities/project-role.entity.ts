import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export enum ProjectRoleType {
    LEADERSHIP = 'leadership', // 리더십 (PM, 팀장 등)
    ADVISORY = 'advisory', // 자문 (자문위원, 고문 등)
    TECHNICAL = 'technical', // 기술 (개발자, 아키텍트 등)
    BUSINESS = 'business', // 비즈니스 (기획자, 분석가 등)
    SUPPORT = 'support', // 지원 (디자이너, 운영 등)
    QUALITY = 'quality', // 품질 (QA, 테스터 등)
}

@Entity('project_roles')
export class ProjectRole {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ comment: '역할명' })
    roleName: string;

    @Column({ unique: true, comment: '역할 코드' })
    roleCode: string;

    @Column({
        comment: '역할 타입',
        type: 'enum',
        enum: ProjectRoleType,
    })
    roleType: ProjectRoleType;

    @Column({ comment: '역할 레벨 (높을수록 상위)', default: 1 })
    level: number;

    @Column({ comment: '프로젝트 권한 여부', default: false })
    hasProjectAuthority: boolean;

    @Column({ comment: '승인 권한 레벨', default: 0 })
    approvalLevel: number;

    @Column({ comment: '역할 설명', nullable: true })
    description?: string;

    @Column({ comment: '필요 스킬', type: 'jsonb', nullable: true })
    requiredSkills?: string[];

    @Column({ comment: '책임 범위', type: 'jsonb', nullable: true })
    responsibilities?: string[];

    @Column({ comment: '활성 여부', default: true })
    isActive: boolean;

    @CreateDateColumn({ comment: '생성일' })
    createdAt: Date;

    @UpdateDateColumn({ comment: '수정일' })
    updatedAt: Date;
}

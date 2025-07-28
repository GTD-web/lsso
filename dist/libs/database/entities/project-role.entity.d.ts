export declare enum ProjectRoleType {
    LEADERSHIP = "leadership",
    ADVISORY = "advisory",
    TECHNICAL = "technical",
    BUSINESS = "business",
    SUPPORT = "support",
    QUALITY = "quality"
}
export declare class ProjectRole {
    id: string;
    roleName: string;
    roleCode: string;
    roleType: ProjectRoleType;
    level: number;
    hasProjectAuthority: boolean;
    approvalLevel: number;
    description?: string;
    requiredSkills?: string[];
    responsibilities?: string[];
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

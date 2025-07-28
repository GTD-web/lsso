import { Employee } from './employee.entity';
import { Rank } from './rank.entity';
export declare enum PromotionType {
    INITIAL = "initial",
    PROMOTION = "promotion",
    DEMOTION = "demotion",
    ADJUSTMENT = "adjustment"
}
export declare class EmployeeRankHistory {
    id: string;
    employeeId: string;
    rankId: string;
    startDate: Date;
    endDate?: Date;
    isActive: boolean;
    promotionType: PromotionType;
    promotionDate: Date;
    evaluationScore?: number;
    reason?: string;
    previousRankId?: string;
    expectedNextPromotionDate?: Date;
    approvedBy?: string;
    appointmentNumber?: string;
    notes?: string;
    createdBy?: string;
    updatedBy?: string;
    employee: Promise<Employee>;
    rank: Promise<Rank>;
    previousRank?: Promise<Rank>;
    createdAt: Date;
    updatedAt: Date;
}

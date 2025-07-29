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
    createdAt: Date;
    updatedAt: Date;
    employee: Promise<Employee>;
    rank: Promise<Rank>;
}

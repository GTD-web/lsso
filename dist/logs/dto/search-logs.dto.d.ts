export declare enum SortOrder {
    ASC = "ASC",
    DESC = "DESC"
}
export declare class SearchLogsDto {
    method?: string;
    url?: string;
    ip?: string;
    statusCode?: number;
    isError?: boolean;
    startDate?: Date;
    endDate?: Date;
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: SortOrder;
}

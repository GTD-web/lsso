export class EmployeeDetailResponseDto {
    직원정보: {
        id: string;
        employeeNumber: string;
        name: string;
        email: string;
        phoneNumber?: string;
        dateOfBirth?: Date;
        gender?: string;
        hireDate: Date;
        status: string;
        currentRankId?: string;
    };
    현재조직: {
        부서?: {
            id: string;
            departmentName: string;
            departmentCode: string;
        };
        직책?: {
            id: string;
            positionName: string;
            level: number;
            hasManagementAuthority: boolean;
        };
        직급?: {
            id: string;
            rankName: string;
            level: number;
        };
    };
    이력: {
        직급변경이력: any[];
        부서이동이력: any[];
    };
}

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MigrationService = void 0;
const common_1 = require("@nestjs/common");
const employee_service_1 = require("../../domain/employee/employee.service");
const department_service_1 = require("../../domain/department/department.service");
const position_service_1 = require("../../domain/position/position.service");
const rank_service_1 = require("../../domain/rank/rank.service");
const employee_department_position_service_1 = require("../../domain/employee-department-position/employee-department-position.service");
const employee_rank_history_service_1 = require("../../domain/employee-rank-history/employee-rank-history.service");
const employee_response_dto_1 = require("./dto/employee-response.dto");
const axios_1 = require("axios");
const department_response_dto_1 = require("./dto/department-response.dto");
const position_response_dto_1 = require("./dto/position-response.dto");
const rank_response_dto_1 = require("./dto/rank-response.dto");
const user_service_1 = require("../../domain/user/user.service");
let MigrationService = class MigrationService {
    constructor(employeeService, departmentService, positionService, rankService, employeeDepartmentPositionService, employeeRankHistoryService, userService) {
        this.employeeService = employeeService;
        this.departmentService = departmentService;
        this.positionService = positionService;
        this.rankService = rankService;
        this.employeeDepartmentPositionService = employeeDepartmentPositionService;
        this.employeeRankHistoryService = employeeRankHistoryService;
        this.userService = userService;
    }
    async onApplicationBootstrap() {
        this.migrate();
    }
    async getEmployees() {
        const response = await axios_1.default.get(`${process.env.METADATA_MANAGER_URL}/api/employees?detailed=true`);
        const employees = response.data.map((employee) => new employee_response_dto_1.EmployeeResponseDto(employee));
        return employees;
    }
    async getDepartments() {
        const response = await axios_1.default.get(`${process.env.METADATA_MANAGER_URL}/api/departments?hierarchy=true`);
        const departments = response.data.map((department) => new department_response_dto_1.DepartmentResponseDto(department));
        return departments;
    }
    async getPositions() {
        const response = await axios_1.default.get(`${process.env.METADATA_MANAGER_URL}/api/positions`);
        const positions = response.data.map((position) => new position_response_dto_1.PositionResponseDto(position));
        return positions;
    }
    async getRanks() {
        const response = await axios_1.default.get(`${process.env.METADATA_MANAGER_URL}/api/ranks`);
        const ranks = response.data.map((rank) => new rank_response_dto_1.RankResponseDto(rank));
        return ranks;
    }
    async migrate() {
        const employees = await this.getEmployees();
        const departments = await this.getDepartments();
        const positions = await this.getPositions();
        const ranks = await this.getRanks();
        for (const rank of ranks) {
            const existingRank = await this.rankService.findByCode(rank.rank_code);
            if (existingRank) {
                console.log(`${rank.rank_name} 직급은 이미 존재합니다.`);
                continue;
            }
            await this.rankService.save({
                rankName: rank.rank_name,
                rankCode: rank.rank_code,
                level: rank.level,
            });
        }
        for (const position of positions) {
            const existingPosition = await this.positionService.findByCode(position.position_code);
            if (existingPosition) {
                console.log(`${position.position_title} 직책은 이미 존재합니다.`);
                continue;
            }
            await this.positionService.save({
                positionTitle: position.position_title,
                positionCode: position.position_code,
                hasManagementAuthority: position.level >= 5,
                level: position.level,
            });
        }
        const insertDepartments = async () => {
            const savedDepartmentIds = new Map();
            const saveDepartmentHierarchy = async (department, parentUuid = null) => {
                try {
                    const existingDepartment = await this.departmentService.findByCode(department.department_code);
                    if (existingDepartment) {
                        console.log(`${department.department_name} 부서는 이미 존재합니다.`);
                    }
                    else {
                        const savedDepartment = await this.departmentService.save({
                            departmentName: department.department_name,
                            departmentCode: department.department_code,
                            parentDepartmentId: parentUuid,
                            order: department.order || 0,
                        });
                        savedDepartmentIds.set(department._id, savedDepartment.id);
                    }
                    console.log(`부서 저장 완료: ${department.department_name} (${department.department_code}) - Parent: ${parentUuid || 'ROOT'}`);
                    if (department.child_departments && department.child_departments.length > 0) {
                        for (const childDepartment of department.child_departments) {
                            await saveDepartmentHierarchy(childDepartment, savedDepartmentIds.get(department._id));
                        }
                    }
                }
                catch (error) {
                    console.error(`부서 저장 실패: ${department.department_name}`, error);
                }
            };
            const rootDepartments = departments;
            for (const rootDepartment of rootDepartments) {
                await saveDepartmentHierarchy(rootDepartment);
            }
            console.log(`총 ${savedDepartmentIds.size}개 부서 저장 완료`);
            return savedDepartmentIds;
        };
        const departmentIdMap = await insertDepartments();
        for (const employee of employees) {
            let existingEmployee = await this.employeeService.findByEmployeeNumber(employee.employee_number);
            let rank = null, position = null, department = null;
            if (employee.rank) {
                rank = await this.rankService.findByCode(employee.rank.rank_code);
            }
            if (existingEmployee) {
                existingEmployee = await this.employeeService.update(existingEmployee.id, {
                    status: employee.status,
                    currentRankId: rank?.id,
                    hireDate: employee.hire_date,
                    dateOfBirth: employee.date_of_birth,
                    gender: employee.gender,
                });
            }
            else {
                existingEmployee = await this.employeeService.save({
                    employeeNumber: employee.employee_number,
                    name: employee.name,
                    email: employee.email,
                    phoneNumber: employee.phone_number || '',
                    status: employee.status,
                    currentRankId: rank?.id,
                    hireDate: employee.hire_date,
                    dateOfBirth: employee.date_of_birth,
                    gender: employee.gender,
                });
            }
            if (employee.position) {
                position = await this.positionService.findByCode(employee.position.position_code);
            }
            if (employee.department) {
                department = await this.departmentService.findByCode(employee.department.department_code);
            }
            const user = await this.userService.findByEmployeeNumber(employee.employee_number);
            if (!user) {
                console.log(`${employee.name} 직원은 유저 정보가 없습니다.`);
            }
            else {
                existingEmployee.password = user.password;
                existingEmployee.isInitialPasswordSet = user.isInitialPasswordSet;
            }
            const savedEmployee = await this.employeeService.save(existingEmployee);
            const existingEmployeeDepartmentPosition = await this.employeeDepartmentPositionService.findOne({
                where: {
                    employeeId: existingEmployee.id,
                },
            });
            if (!existingEmployeeDepartmentPosition && department && position) {
                await this.employeeDepartmentPositionService.save({
                    employeeId: savedEmployee.id,
                    departmentId: department?.id,
                    positionId: position?.id,
                });
            }
        }
    }
};
exports.MigrationService = MigrationService;
exports.MigrationService = MigrationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [employee_service_1.DomainEmployeeService,
        department_service_1.DomainDepartmentService,
        position_service_1.DomainPositionService,
        rank_service_1.DomainRankService,
        employee_department_position_service_1.DomainEmployeeDepartmentPositionService,
        employee_rank_history_service_1.DomainEmployeeRankHistoryService,
        user_service_1.DomainUserService])
], MigrationService);
//# sourceMappingURL=migration.service.js.map
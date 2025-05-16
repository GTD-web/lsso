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
exports.DashboardService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/services/users.service");
const tokens_service_1 = require("../tokens/services/tokens.service");
const logs_service_1 = require("../logs/services/logs.service");
const admin_usecase_1 = require("../logs/usecases/admin.usecase");
const systems_service_1 = require("../systems/services/systems.service");
let DashboardService = class DashboardService {
    constructor(usersService, tokensService, logsService, logsAdminUseCase, systemsService) {
        this.usersService = usersService;
        this.tokensService = tokensService;
        this.logsService = logsService;
        this.logsAdminUseCase = logsAdminUseCase;
        this.systemsService = systemsService;
    }
    async getDashboardSummary(limit = 3) {
        const users = await this.usersService.findAll();
        const activeUsers = users.filter((user) => user.status === '재직중').length;
        const totalUsers = users.length;
        const tokenStats = await this.getTokenStats();
        const systems = await this.systemsService.findAll();
        const activeSystems = systems.filter((system) => system.isActive).length;
        const totalSystems = systems.length;
        const systemStatus = await this.getSystemsStatus();
        const loginStats = await this.getLoginStats();
        const recentLogs = await this.getRecentLogs(limit);
        const avgResponseTime = this.calculateAvgResponseTime(recentLogs);
        const securityAlerts = await this.getSecurityAlerts(limit);
        return {
            activeUsers,
            totalUsers,
            tokenStats,
            activeSystems,
            totalSystems,
            loginStats,
            avgResponseTime,
            securityAlerts,
            recentLogs,
            systemStatus,
        };
    }
    async getSystemsStatus() {
        const systems = await this.systemsService.findAll();
        return systems.map((system) => ({
            id: system.id,
            name: system.name,
            status: system.isActive ? 'online' : 'offline',
            lastCheck: new Date().toISOString(),
            responseTime: Math.floor(Math.random() * 200) + 10,
            uptime: system.isActive ? 86400 * Math.floor(Math.random() * 30) : 0,
            healthCheckUrl: system.healthCheckUrl,
        }));
    }
    async getRecentLogs(limit = 5) {
        const { logs } = await this.logsAdminUseCase.findAll(1, limit);
        return logs;
    }
    async getLoginStats(days = 7) {
        const logs = await this.logsAdminUseCase.findLoginLogs(days);
        const total = logs.length;
        const success = logs.filter((log) => !log.error).length;
        const failed = total - success;
        const successRate = total > 0 ? Math.round((success / total) * 100) : 0;
        return {
            total,
            success,
            failed,
            successRate,
        };
    }
    async getSecurityAlerts(limit = 3) {
        const { logs } = await this.logsAdminUseCase.findAll(1, limit);
        return logs.map((log) => {
            let type = 'info';
            if (log.statusCode >= 500) {
                type = 'error';
            }
            else if (log.statusCode >= 400 && log.statusCode < 500) {
                type = 'warning';
            }
            return {
                id: log.id,
                type: type,
                message: log.error?.message || `${log.method} ${log.url}에 대한 ${log.statusCode} 응답`,
                timestamp: log.requestTimestamp.toISOString(),
                resolved: false,
                relatedLogId: log.id,
            };
        });
    }
    async getTokenStats() {
        const tokens = await this.tokensService.findAll();
        const now = new Date();
        const weekLater = new Date();
        weekLater.setDate(now.getDate() + 7);
        const total = tokens.length;
        const active = tokens.filter((token) => new Date(token.tokenExpiresAt) > now).length;
        const inactive = total - active;
        const expiringSoon = tokens.filter((token) => {
            const expireDate = new Date(token.tokenExpiresAt);
            return expireDate > now && expireDate < weekLater;
        }).length;
        return {
            total,
            active,
            inactive,
            expiringSoon,
        };
    }
    calculateAvgResponseTime(logs) {
        const validLogs = logs.filter((log) => log.responseTime);
        if (validLogs.length === 0)
            return 0;
        const total = validLogs.reduce((sum, log) => sum + log.responseTime, 0);
        return Math.round(total / validLogs.length);
    }
};
exports.DashboardService = DashboardService;
exports.DashboardService = DashboardService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        tokens_service_1.TokensService,
        logs_service_1.LogsService,
        admin_usecase_1.LogsAdminUseCase,
        systems_service_1.SystemsService])
], DashboardService);
//# sourceMappingURL=dashboard.service.js.map
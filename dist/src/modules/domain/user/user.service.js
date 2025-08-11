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
exports.DomainUserService = void 0;
const common_1 = require("@nestjs/common");
const user_repository_1 = require("./user.repository");
const base_service_1 = require("../../../../libs/common/services/base.service");
const bcrypt = require("bcrypt");
let DomainUserService = class DomainUserService extends base_service_1.BaseService {
    constructor(userRepository) {
        super(userRepository);
        this.userRepository = userRepository;
    }
    async findByEmployeeNumber(employeeNumber) {
        const user = await this.userRepository.findOne({ where: { employeeNumber } });
        return user;
    }
    async findByEmail(email) {
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user) {
            throw new common_1.NotFoundException('사용자를 찾을 수 없습니다.');
        }
        return user;
    }
    async checkEmployeeNumberExists(employeeNumber) {
        const user = await this.userRepository.findOne({ where: { employeeNumber } });
        return !!user;
    }
    async checkEmailExists(email) {
        const user = await this.userRepository.findOne({ where: { email } });
        return !!user;
    }
    async createUser(userData) {
        if (userData.employeeNumber && (await this.checkEmployeeNumberExists(userData.employeeNumber))) {
            throw new common_1.ConflictException('이미 존재하는 사번입니다.');
        }
        if (userData.email && (await this.checkEmailExists(userData.email))) {
            throw new common_1.ConflictException('이미 존재하는 이메일입니다.');
        }
        if (userData.password) {
            userData.password = await bcrypt.hash(userData.password, 10);
        }
        return await this.userRepository.save(userData);
    }
    async changePassword(userId, newPassword) {
        const user = await this.findOne({ where: { id: userId } });
        if (!user) {
            throw new common_1.NotFoundException('사용자를 찾을 수 없습니다.');
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.isInitialPasswordSet = true;
        return await this.userRepository.save(user);
    }
    async validatePassword(email, password) {
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user) {
            return null;
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        return isPasswordValid ? user : null;
    }
    async isInitialPasswordSet(userId) {
        const user = await this.findOne({ where: { id: userId } });
        return user?.isInitialPasswordSet || false;
    }
    async updateUserStatus(userId, status) {
        const user = await this.findOne({ where: { id: userId } });
        if (!user) {
            throw new common_1.NotFoundException('사용자를 찾을 수 없습니다.');
        }
        user.status = status;
        return await this.userRepository.save(user);
    }
    async updateUserInfo(userId, updateData) {
        const user = await this.findOne({ where: { id: userId } });
        if (!user) {
            throw new common_1.NotFoundException('사용자를 찾을 수 없습니다.');
        }
        const { password, isInitialPasswordSet, ...safeUpdateData } = updateData;
        Object.assign(user, safeUpdateData);
        return await this.userRepository.save(user);
    }
    async findActiveUsers() {
        return await this.userRepository.findAll({
            where: { status: '재직중' },
            order: { name: 'ASC' },
        });
    }
    async findUsersByDepartment(department) {
        return await this.userRepository.findAll({
            where: { department },
            order: { name: 'ASC' },
        });
    }
};
exports.DomainUserService = DomainUserService;
exports.DomainUserService = DomainUserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repository_1.DomainUserRepository])
], DomainUserService);
//# sourceMappingURL=user.service.js.map
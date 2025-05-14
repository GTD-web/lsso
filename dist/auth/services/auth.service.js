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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const admin_entity_1 = require("../entities/admin.entity");
const typeorm_2 = require("@nestjs/typeorm");
let AuthService = class AuthService {
    constructor(adminRepository) {
        this.adminRepository = adminRepository;
    }
    async findAll() {
        return this.adminRepository.find({
            select: ['id', 'email', 'name', 'role', 'createdAt', 'updatedAt'],
        });
    }
    async findOne(id) {
        const admin = await this.adminRepository.findOne({
            where: { id },
            select: ['id', 'email', 'name', 'role', 'createdAt', 'updatedAt'],
        });
        if (!admin) {
            throw new common_1.NotFoundException(`Admin with ID ${id} not found`);
        }
        return admin;
    }
    async findByEmail(email) {
        return this.adminRepository.findOne({
            where: { email },
        });
    }
    async create(adminData) {
        const admin = this.adminRepository.create(adminData);
        await this.adminRepository.save(admin);
        const { password, ...result } = admin;
        return result;
    }
    async update(id, adminData) {
        const admin = await this.findOne(id);
        Object.assign(admin, adminData);
        await this.adminRepository.save(admin);
        const { password, ...result } = admin;
        return result;
    }
    async remove(id) {
        const result = await this.adminRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Admin with ID ${id} not found`);
        }
    }
    async changePassword(id, currentPassword, newPassword) {
        const admin = await this.adminRepository.findOne({ where: { id } });
        if (!admin) {
            throw new common_1.NotFoundException(`Admin with ID ${id} not found`);
        }
        const isPasswordValid = await admin.validatePassword(currentPassword);
        if (!isPasswordValid) {
            return false;
        }
        admin.password = newPassword;
        await this.adminRepository.save(admin);
        return true;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(admin_entity_1.Admin)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], AuthService);
//# sourceMappingURL=auth.service.js.map
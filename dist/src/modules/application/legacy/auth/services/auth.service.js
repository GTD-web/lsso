"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
let AuthService = class AuthService {
    constructor() {
        this.hardcodedAdmin = {
            id: '987ade20-8278-4819-bd04-faeb1192cba5',
            email: 'admin@lumir.space',
            name: '관리자',
            role: 'admin',
            password: '$2b$10$Ja916Bwk1syQGShmQJMfQ.q28HF4mnLMvAPOwxfoT2xbRNNTqgPpm',
            createdAt: new Date('2025-04-16 00:47:14.872'),
            updatedAt: new Date('2025-04-16 00:47:14.872'),
            hashPassword: async function () { },
            validatePassword: async function (password) {
                return bcrypt.compare(password, this.password);
            },
        };
    }
    async findAll() {
        const { password, hashPassword, validatePassword, ...adminData } = this.hardcodedAdmin;
        return [adminData];
    }
    async findOne(id) {
        if (id !== this.hardcodedAdmin.id) {
            throw new common_1.NotFoundException(`Admin with ID ${id} not found`);
        }
        const { password, hashPassword, validatePassword, ...adminData } = this.hardcodedAdmin;
        return adminData;
    }
    async findByEmail(email) {
        if (email !== this.hardcodedAdmin.email) {
            return null;
        }
        return this.hardcodedAdmin;
    }
    async create(adminData) {
        throw new Error('Creating new admin is not supported in hardcoded mode');
    }
    async update(id, adminData) {
        throw new Error('Updating admin is not supported in hardcoded mode');
    }
    async remove(id) {
        throw new Error('Removing admin is not supported in hardcoded mode');
    }
    async changePassword(id, currentPassword, newPassword) {
        throw new Error('Changing password is not supported in hardcoded mode');
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)()
], AuthService);
//# sourceMappingURL=auth.service.js.map
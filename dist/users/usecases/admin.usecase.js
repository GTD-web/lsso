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
exports.AdminUsecase = void 0;
const typeorm_1 = require("typeorm");
const users_service_1 = require("../services/users.service");
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const mail_service_1 = require("../../mail/mail.service");
let AdminUsecase = class AdminUsecase {
    constructor(usersService, jwtService, mailService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.mailService = mailService;
    }
    async searchUsers(query) {
        if (!query) {
            return this.usersService.findAll();
        }
        const searchConditions = {
            where: [
                { name: (0, typeorm_1.Like)(`%${query}%`) },
                { email: (0, typeorm_1.Like)(`%${query}%`) },
                { employeeNumber: (0, typeorm_1.Like)(`%${query}%`) },
                { department: (0, typeorm_1.Like)(`%${query}%`) },
                { position: (0, typeorm_1.Like)(`%${query}%`) },
                { rank: (0, typeorm_1.Like)(`%${query}%`) },
            ],
            relations: ['tokens'],
        };
        return this.usersService.findAll(searchConditions);
    }
    async sendInitPassSetMail(email) {
        const user = await this.usersService.findByEmail(email);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        if (user.email !== email) {
            throw new common_1.NotFoundException('User not found');
        }
        const payload = {
            sub: user.id,
            employeeNumber: user.employeeNumber,
            type: 'access',
        };
        const token = this.jwtService.sign(payload, {
            expiresIn: '1h',
            secret: process.env.GLOBAL_SECRET,
        });
        const mail = await this.mailService.sendEmail({
            recipients: [user.email],
            subject: '[Lumir Backoffice] 초기 비밀번호 설정 안내',
            template: 'initial-password',
            context: {
                name: user.name,
                resetUrl: `${process.env.APP_URL}/set-initial-password?token=${token}`,
                expiresIn: '1h',
            },
        });
        console.log(mail);
        await this.usersService.save(user);
        return mail;
    }
    async sendTempPasswordMail(email) {
        const user = await this.usersService.findByEmail(email);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        if (user.email !== email) {
            throw new common_1.NotFoundException('User not found');
        }
        const tempPassword = Math.random().toString(36).substring(2, 15);
        const hashedPassword = this.usersService.hashPassword(tempPassword);
        user.password = hashedPassword;
        await this.usersService.save(user);
        const mail = await this.mailService.sendEmail({
            recipients: [user.email],
            subject: '[Lumir Backoffice] 임시 비밀번호 발급',
            template: 'temp-password',
            context: {
                name: user.name,
                tempPassword: tempPassword,
            },
        });
        console.log(mail);
        return mail;
    }
};
exports.AdminUsecase = AdminUsecase;
exports.AdminUsecase = AdminUsecase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService,
        mail_service_1.MailService])
], AdminUsecase);
//# sourceMappingURL=admin.usecase.js.map
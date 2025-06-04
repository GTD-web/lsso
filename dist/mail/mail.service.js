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
exports.MailService = void 0;
const common_1 = require("@nestjs/common");
const mailer_1 = require("@nestjs-modules/mailer");
const path_1 = require("path");
const fs = require("fs");
const handlebars = require("handlebars");
let MailService = class MailService {
    constructor(mailerService) {
        this.mailerService = mailerService;
        handlebars.registerHelper({
            multiply: (a, b) => a * b,
            divide: (a, b) => a / b,
            round: (num) => Math.round(num),
            gt: (a, b) => {
                if (Array.isArray(a)) {
                    return a.length > b;
                }
                return a > b;
            },
            eq: (a, b) => a === b,
            mod: (a, b) => a % b,
            times: function (n, block) {
                let accum = '';
                for (let i = 0; i < n; ++i)
                    accum += block.fn(i);
                return accum;
            },
            or: (a, b) => a || b,
            minutesToHours: (minutes) => {
                return Number((minutes / 60).toFixed(2));
            },
            substring: (str, start, end) => {
                if (!str)
                    return '';
                if (end === undefined) {
                    return str.substring(start);
                }
                return str.substring(start, end);
            },
            formatExpiresIn: (expiresIn) => {
                if (!expiresIn)
                    return '';
                const unit = expiresIn.slice(-1);
                const value = expiresIn.slice(0, -1);
                switch (unit) {
                    case 'h':
                        return `${value}시간`;
                    case 'm':
                        return `${value}분`;
                    case 'd':
                        return `${value}일`;
                    case 's':
                        return `${value}초`;
                    default:
                        return expiresIn;
                }
            },
        });
    }
    async sendEmail(dto) {
        console.log(dto);
        let { recipients: to, subject, template, context } = dto;
        const templatePath = (0, path_1.join)(__dirname, '..', '..', 'src', 'mail', 'templates', `${template}.hbs`);
        let source = '';
        try {
            source = fs.readFileSync(templatePath, 'utf-8');
        }
        catch (error) {
            console.error(`Error reading template file: ${error}`);
            throw new common_1.BadRequestException('해당 경로에 파일이 존재하지 않습니다.');
        }
        const compiledTemplate = handlebars.compile(source);
        const html = compiledTemplate(context);
        await this.mailerService.sendMail({
            from: `"No Reply" <${process.env.GMAIL_USER}>`,
            to: to,
            subject: subject,
            html: html,
        });
    }
};
exports.MailService = MailService;
exports.MailService = MailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [mailer_1.MailerService])
], MailService);
//# sourceMappingURL=mail.service.js.map
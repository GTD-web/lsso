import { FindManyOptions, FindOptionsWhere, Like } from 'typeorm';
import { User } from '../entities/user.entity';
import { UsersService } from '../services/users.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class AdminUsecase {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
        private readonly mailService: MailService,
    ) {}

    /**
     * 검색 조건에 맞는 사용자를 조회합니다.
     * @param query 검색어 (이름, 이메일, 직원번호, 부서, 직책 등)
     * @returns 검색 조건에 맞는 사용자 목록
     */
    async searchUsers(query: string): Promise<User[]> {
        if (!query) {
            return this.usersService.findAll();
        }

        // 검색 조건 설정
        const searchConditions: FindManyOptions<User> = {
            where: [
                { name: Like(`%${query}%`) },
                { email: Like(`%${query}%`) },
                { employeeNumber: Like(`%${query}%`) },
                { department: Like(`%${query}%`) },
                { position: Like(`%${query}%`) },
                { rank: Like(`%${query}%`) },
            ],
            relations: ['tokens'],
        };

        return this.usersService.findAll(searchConditions);
    }

    async sendInitPassSetMail(email: string) {
        const user = await this.usersService.findByEmail(email);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        if (user.email !== email) {
            throw new NotFoundException('User not found');
        }
        const payload = {
            sub: user.id,
            employeeNumber: user.employeeNumber,
            type: 'access',
        };

        // 액세스 토큰 생성
        const token = this.jwtService.sign(payload, {
            expiresIn: '1h',
            secret: process.env.GLOBAL_SECRET,
        });
        const mail = await this.mailService.sendEmail({
            recipients: [user.email],
            subject: '초기 비밀번호 설정 안내',
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

    async sendTempPasswordMail(email: string) {
        const user = await this.usersService.findByEmail(email);
        if (!user) {
            throw new NotFoundException('User not found');
        }

        if (user.email !== email) {
            throw new NotFoundException('User not found');
        }

        const tempPassword = Math.random().toString(36).substring(2, 15);
        const hashedPassword = this.usersService.hashPassword(tempPassword);
        user.password = hashedPassword;
        await this.usersService.save(user);

        const mail = await this.mailService.sendEmail({
            recipients: [user.email],
            subject: '임시 비밀번호 발급',
            template: 'temp-password',
            context: {
                name: user.name,
                tempPassword: tempPassword,
            },
        });
        console.log(mail);
        return mail;
    }
}

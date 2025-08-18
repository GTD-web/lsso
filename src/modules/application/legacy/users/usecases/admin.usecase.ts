import { Like } from 'typeorm';
import { Employee } from '../../../../../../libs/database/entities/employee.entity';
import { IRepositoryOptions } from '../../../../../../libs/common/interfaces/repository.interface';
import { UsersService } from '../services/users.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MailService } from '../../mail/mail.service';
import { DomainTokenService } from 'src/modules/domain/token/token.service';
import { AuthorizationContextService } from 'src/modules/context/authorization/authorization-context.service';

@Injectable()
export class AdminUsecase {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
        private readonly mailService: MailService,
        private readonly authorizationContextService: AuthorizationContextService,
    ) {}

    /**
     * 검색 조건에 맞는 사용자를 조회합니다.
     * @param query 검색어 (이름, 이메일, 직원번호, 부서, 직책 등)
     * @returns 검색 조건에 맞는 사용자 목록
     */
    async searchUsers(query: string): Promise<Employee[]> {
        if (!query) {
            return this.usersService.findAll();
        }

        // 검색 조건 설정 (Employee 엔티티는 관계형 구조를 사용)
        const searchConditions: IRepositoryOptions<Employee> = {
            where: [
                { name: Like(`%${query}%`) },
                { email: Like(`%${query}%`) },
                { employeeNumber: Like(`%${query}%`) },
            ],
            relations: ['currentRank'],
        };

        return this.usersService.findAll(searchConditions);
    }

    async sendInitPassSetMail(email: string) {
        const employee = await this.usersService.findByEmail(email);
        if (!employee) {
            throw new NotFoundException('Employee not found');
        }
        if (employee.email !== email) {
            throw new NotFoundException('Employee not found');
        }
        // const payload = {
        //     sub: employee.id,
        //     employeeNumber: employee.employeeNumber,
        //     type: 'access',
        // };

        // 액세스 토큰 생성
        // const token = this.jwtService.sign(payload, {
        //     expiresIn: '1d',
        //     secret: process.env.GLOBAL_SECRET,
        // });

        const token = await this.authorizationContextService.토큰정보를_생성한다(employee);

        const mail = await this.mailService.sendEmail({
            recipients: [employee.email],
            subject: '[Lumir Backoffice] 초기 비밀번호 설정 안내',
            template: 'initial-password',
            context: {
                name: employee.name,
                resetUrl: `${process.env.APP_URL}/set-initial-password?token=${token.accessToken}`,
                expiresIn: '1d',
            },
        });
        console.log(mail);
        await this.usersService.save(employee);
        return mail;
    }

    async sendTempPasswordMail(email: string) {
        const employee = await this.usersService.findByEmail(email);
        if (!employee) {
            throw new NotFoundException('Employee not found');
        }

        if (employee.email !== email) {
            throw new NotFoundException('Employee not found');
        }

        const tempPassword = Math.random().toString(36).substring(2, 15);
        const hashedPassword = this.usersService.hashPassword(tempPassword);
        employee.password = hashedPassword;
        await this.usersService.save(employee);

        const mail = await this.mailService.sendEmail({
            recipients: [employee.email],
            subject: '[Lumir Backoffice] 임시 비밀번호 발급',
            template: 'temp-password',
            context: {
                name: employee.name,
                tempPassword: tempPassword,
            },
        });
        console.log(mail);
        return mail;
    }
}

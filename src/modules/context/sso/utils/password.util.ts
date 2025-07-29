import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswordUtil {
    private readonly saltRounds = 10;

    /**
     * 비밀번호를 해싱합니다
     */
    async hashPassword(plainPassword: string): Promise<string> {
        return bcrypt.hash(plainPassword, this.saltRounds);
    }

    /**
     * 비밀번호를 검증합니다
     */
    async comparePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
        return bcrypt.compare(plainPassword, hashedPassword);
    }

    /**
     * 랜덤 비밀번호를 생성합니다
     */
    generateRandomPassword(length: number = 12): string {
        const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
        let password = '';

        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            password += charset[randomIndex];
        }

        return password;
    }

    /**
     * 비밀번호 강도를 검증합니다
     */
    validatePasswordStrength(password: string): {
        isValid: boolean;
        errors: string[];
    } {
        const errors: string[] = [];

        if (password.length < 8) {
            errors.push('비밀번호는 최소 8자 이상이어야 합니다.');
        }

        if (!/[a-z]/.test(password)) {
            errors.push('비밀번호에 소문자가 포함되어야 합니다.');
        }

        if (!/[A-Z]/.test(password)) {
            errors.push('비밀번호에 대문자가 포함되어야 합니다.');
        }

        if (!/[0-9]/.test(password)) {
            errors.push('비밀번호에 숫자가 포함되어야 합니다.');
        }

        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            errors.push('비밀번호에 특수문자가 포함되어야 합니다.');
        }

        return {
            isValid: errors.length === 0,
            errors,
        };
    }
}

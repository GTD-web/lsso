import { Injectable, NotFoundException } from '@nestjs/common';
import { Admin } from '../entities/admin.entity';
import * as bcrypt from '@node-rs/bcrypt';

@Injectable()
export class AuthService {
    // 하드코딩된 관리자 데이터
    private readonly hardcodedAdmin: Admin = {
        id: '987ade20-8278-4819-bd04-faeb1192cba5',
        email: 'admin@lumir.space',
        name: '관리자',
        role: 'admin',
        password: '$2b$10$Ja916Bwk1syQGShmQJMfQ.q28HF4mnLMvAPOwxfoT2xbRNNTqgPpm',
        createdAt: new Date('2025-04-16 00:47:14.872'),
        updatedAt: new Date('2025-04-16 00:47:14.872'),
        hashPassword: async function () {},
        validatePassword: async function (password: string): Promise<boolean> {
            return bcrypt.compare(password, this.password);
        },
    };

    /**
     * 모든 관리자 계정 조회
     */
    async findAll(): Promise<Admin[]> {
        const { password, hashPassword, validatePassword, ...adminData } = this.hardcodedAdmin;
        return [adminData as Admin];
    }

    /**
     * 특정 ID의 관리자 계정 조회
     */
    async findOne(id: string): Promise<Admin> {
        if (id !== this.hardcodedAdmin.id) {
            throw new NotFoundException(`Admin with ID ${id} not found`);
        }

        const { password, hashPassword, validatePassword, ...adminData } = this.hardcodedAdmin;
        return adminData as Admin;
    }

    /**
     * 이메일로 관리자 계정 조회 (비밀번호 포함)
     */
    async findByEmail(email: string): Promise<Admin | null> {
        if (email !== this.hardcodedAdmin.email) {
            return null;
        }

        return this.hardcodedAdmin;
    }

    /**
     * 새 관리자 계정 생성 (하드코딩 모드에서는 지원하지 않음)
     */
    async create(adminData: Partial<Admin>): Promise<Admin> {
        throw new Error('Creating new admin is not supported in hardcoded mode');
    }

    /**
     * 관리자 계정 정보 수정 (하드코딩 모드에서는 지원하지 않음)
     */
    async update(id: string, adminData: Partial<Admin>): Promise<Admin> {
        throw new Error('Updating admin is not supported in hardcoded mode');
    }

    /**
     * 관리자 계정 삭제 (하드코딩 모드에서는 지원하지 않음)
     */
    async remove(id: string): Promise<void> {
        throw new Error('Removing admin is not supported in hardcoded mode');
    }

    /**
     * 비밀번호 변경 (하드코딩 모드에서는 지원하지 않음)
     */
    async changePassword(id: string, currentPassword: string, newPassword: string): Promise<boolean> {
        throw new Error('Changing password is not supported in hardcoded mode');
    }
}

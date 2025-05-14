import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Admin } from '../entities/admin.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Admin)
        private adminRepository: Repository<Admin>,
    ) {}

    /**
     * 모든 관리자 계정 조회
     */
    async findAll(): Promise<Admin[]> {
        return this.adminRepository.find({
            select: ['id', 'email', 'name', 'role', 'createdAt', 'updatedAt'],
        });
    }

    /**
     * 특정 ID의 관리자 계정 조회
     */
    async findOne(id: string): Promise<Admin> {
        const admin = await this.adminRepository.findOne({
            where: { id },
            select: ['id', 'email', 'name', 'role', 'createdAt', 'updatedAt'],
        });

        if (!admin) {
            throw new NotFoundException(`Admin with ID ${id} not found`);
        }

        return admin;
    }

    /**
     * 이메일로 관리자 계정 조회 (비밀번호 포함)
     */
    async findByEmail(email: string): Promise<Admin | null> {
        return this.adminRepository.findOne({
            where: { email },
        });
    }

    /**
     * 새 관리자 계정 생성
     */
    async create(adminData: Partial<Admin>): Promise<Admin> {
        const admin = this.adminRepository.create(adminData);
        await this.adminRepository.save(admin);

        // 비밀번호 제외하고 반환
        const { password, ...result } = admin;
        return result as Admin;
    }

    /**
     * 관리자 계정 정보 수정
     */
    async update(id: string, adminData: Partial<Admin>): Promise<Admin> {
        const admin = await this.findOne(id);

        // 변경할 데이터 적용
        Object.assign(admin, adminData);

        // 저장
        await this.adminRepository.save(admin);

        // 비밀번호 제외하고 반환
        const { password, ...result } = admin;
        return result as Admin;
    }

    /**
     * 관리자 계정 삭제
     */
    async remove(id: string): Promise<void> {
        const result = await this.adminRepository.delete(id);

        if (result.affected === 0) {
            throw new NotFoundException(`Admin with ID ${id} not found`);
        }
    }

    /**
     * 비밀번호 변경
     */
    async changePassword(id: string, currentPassword: string, newPassword: string): Promise<boolean> {
        // 전체 정보 조회 (비밀번호 포함)
        const admin = await this.adminRepository.findOne({ where: { id } });

        if (!admin) {
            throw new NotFoundException(`Admin with ID ${id} not found`);
        }

        // 현재 비밀번호 검증
        const isPasswordValid = await admin.validatePassword(currentPassword);

        if (!isPasswordValid) {
            return false;
        }

        // 새 비밀번호 설정
        admin.password = newPassword;
        await this.adminRepository.save(admin);

        return true;
    }
}

import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { DomainUserRepository } from './user.repository';
import { BaseService } from '../../../../libs/common/services/base.service';
import { User } from '../../../../libs/database/entities/user.entity';
import * as bcrypt from '@node-rs/bcrypt';

@Injectable()
export class DomainUserService extends BaseService<User> {
    constructor(private readonly userRepository: DomainUserRepository) {
        super(userRepository);
    }

    // 사번으로 사용자 찾기
    async findByEmployeeNumber(employeeNumber: string): Promise<User> {
        const user = await this.userRepository.findOne({ where: { employeeNumber } });
        return user;
    }

    // 이메일로 사용자 찾기
    async findByEmail(email: string): Promise<User> {
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user) {
            throw new NotFoundException('사용자를 찾을 수 없습니다.');
        }
        return user;
    }

    // 사번 중복 확인
    async checkEmployeeNumberExists(employeeNumber: string): Promise<boolean> {
        const user = await this.userRepository.findOne({ where: { employeeNumber } });
        return !!user;
    }

    // 이메일 중복 확인
    async checkEmailExists(email: string): Promise<boolean> {
        const user = await this.userRepository.findOne({ where: { email } });
        return !!user;
    }

    // 사용자 생성 (비밀번호 해싱 포함)
    async createUser(userData: Partial<User>): Promise<User> {
        // 사번 중복 확인
        if (userData.employeeNumber && (await this.checkEmployeeNumberExists(userData.employeeNumber))) {
            throw new ConflictException('이미 존재하는 사번입니다.');
        }

        // 이메일 중복 확인
        if (userData.email && (await this.checkEmailExists(userData.email))) {
            throw new ConflictException('이미 존재하는 이메일입니다.');
        }

        // 비밀번호 해싱
        if (userData.password) {
            userData.password = await bcrypt.hash(userData.password, 10);
        }

        return await this.userRepository.save(userData);
    }

    // 비밀번호 변경
    async changePassword(userId: string, newPassword: string): Promise<User> {
        const user = await this.findOne({ where: { id: userId } });
        if (!user) {
            throw new NotFoundException('사용자를 찾을 수 없습니다.');
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.isInitialPasswordSet = true;

        return await this.userRepository.save(user);
    }

    // 비밀번호 검증
    async validatePassword(email: string, password: string): Promise<User | null> {
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user) {
            return null;
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        return isPasswordValid ? user : null;
    }

    // 초기 비밀번호 설정 여부 확인
    async isInitialPasswordSet(userId: string): Promise<boolean> {
        const user = await this.findOne({ where: { id: userId } });
        return user?.isInitialPasswordSet || false;
    }

    // 사용자 상태 업데이트
    async updateUserStatus(userId: string, status: string): Promise<User> {
        const user = await this.findOne({ where: { id: userId } });
        if (!user) {
            throw new NotFoundException('사용자를 찾을 수 없습니다.');
        }

        user.status = status;
        return await this.userRepository.save(user);
    }

    // 사용자 기본 정보 업데이트
    async updateUserInfo(userId: string, updateData: Partial<User>): Promise<User> {
        const user = await this.findOne({ where: { id: userId } });
        if (!user) {
            throw new NotFoundException('사용자를 찾을 수 없습니다.');
        }

        // 민감한 필드는 별도 메서드로 처리
        const { password, isInitialPasswordSet, ...safeUpdateData } = updateData;

        Object.assign(user, safeUpdateData);
        return await this.userRepository.save(user);
    }

    // 활성 사용자 목록 조회
    async findActiveUsers(): Promise<User[]> {
        return await this.userRepository.findAll({
            where: { status: '재직중' },
            order: { name: 'ASC' },
        });
    }

    // 부서별 사용자 조회
    async findUsersByDepartment(department: string): Promise<User[]> {
        return await this.userRepository.findAll({
            where: { department },
            order: { name: 'ASC' },
        });
    }
}

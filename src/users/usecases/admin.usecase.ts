import { FindManyOptions, FindOptionsWhere, Like } from 'typeorm';
import { User } from '../entities/user.entity';
import { UsersService } from '../services/users.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AdminUsecase {
    constructor(private readonly usersService: UsersService) {}

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
        };

        return this.usersService.findAll(searchConditions);
    }
}

import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { AuthService } from '../services/auth.service';
import { CreateAdminDto, UpdateAdminDto, ChangePasswordDto, AdminResponseDto } from '../dto/admin';
import { Admin } from '../entities/admin.entity';

@ApiTags('도메인 인증 API')
@Controller('domain/auth')
export class DomainAuthController {
    constructor(private readonly authService: AuthService) {}

    @Get()
    @ApiOperation({ summary: '관리자 목록 조회' })
    @ApiResponse({
        status: 200,
        description: '관리자 목록',
        type: [AdminResponseDto],
    })
    async findAll(): Promise<Admin[]> {
        return this.authService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: '관리자 상세 조회' })
    @ApiParam({ name: 'id', description: '관리자 ID' })
    @ApiResponse({
        status: 200,
        description: '관리자 상세 정보',
        type: AdminResponseDto,
    })
    async findOne(@Param('id') id: string): Promise<Admin> {
        return this.authService.findOne(id);
    }

    @Post()
    @ApiOperation({ summary: '관리자 계정 생성' })
    @ApiBody({ type: CreateAdminDto })
    @ApiResponse({
        status: 201,
        description: '관리자 계정 생성 성공',
        type: AdminResponseDto,
    })
    async create(@Body() createAdminDto: CreateAdminDto): Promise<Admin> {
        return this.authService.create(createAdminDto);
    }

    @Put(':id')
    @ApiOperation({ summary: '관리자 정보 수정' })
    @ApiParam({ name: 'id', description: '관리자 ID' })
    @ApiBody({ type: UpdateAdminDto })
    @ApiResponse({
        status: 200,
        description: '관리자 정보 수정 성공',
        type: AdminResponseDto,
    })
    async update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto): Promise<Admin> {
        return this.authService.update(id, updateAdminDto);
    }

    @Put(':id/password')
    @ApiOperation({ summary: '관리자 비밀번호 변경' })
    @ApiParam({ name: 'id', description: '관리자 ID' })
    @ApiBody({ type: ChangePasswordDto })
    @ApiResponse({
        status: 200,
        description: '비밀번호 변경 성공',
        type: Boolean,
    })
    async changePassword(
        @Param('id') id: string,
        @Body() changePasswordDto: ChangePasswordDto,
    ): Promise<{ success: boolean }> {
        const result = await this.authService.changePassword(
            id,
            changePasswordDto.currentPassword,
            changePasswordDto.newPassword,
        );
        return { success: result };
    }

    @Delete(':id')
    @ApiOperation({ summary: '관리자 계정 삭제' })
    @ApiParam({ name: 'id', description: '관리자 ID' })
    @ApiResponse({
        status: 200,
        description: '관리자 계정 삭제 성공',
    })
    async remove(@Param('id') id: string): Promise<void> {
        return this.authService.remove(id);
    }
}

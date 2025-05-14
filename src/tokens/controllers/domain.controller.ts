import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { TokensService } from '../services/tokens.service';
import { Token } from '../entities/token.entity';
import { CreateTokenDto } from '../dto/create-token.dto';

@ApiTags('도메인 토큰 API')
@Controller('domain/tokens')
export class DomainTokensController {
    constructor(private readonly tokensService: TokensService) {}

    @Get()
    @ApiOperation({ summary: '토큰 목록 조회' })
    @ApiResponse({
        status: 200,
        description: '토큰 목록',
        type: [Token],
    })
    async findAll(@Query() options?: any): Promise<Token[]> {
        return await this.tokensService.findAll(options);
    }

    @Get(':id')
    @ApiOperation({ summary: '토큰 상세 조회' })
    @ApiParam({ name: 'id', description: '토큰 ID' })
    @ApiResponse({
        status: 200,
        description: '토큰 상세 정보',
        type: Token,
    })
    async findOne(@Param('id') id: string): Promise<Token> {
        return await this.tokensService.findOne(id);
    }

    @Get('user/:userId')
    @ApiOperation({ summary: '사용자별 토큰 조회' })
    @ApiParam({ name: 'userId', description: '사용자 ID' })
    @ApiResponse({
        status: 200,
        description: '사용자별 토큰 목록',
        type: [Token],
    })
    async findByUserId(@Param('userId') userId: string): Promise<Token[]> {
        return await this.tokensService.findByUserId(userId);
    }

    @Post()
    @ApiOperation({ summary: '토큰 생성' })
    @ApiBody({ type: CreateTokenDto })
    @ApiResponse({
        status: 201,
        description: '토큰 생성 성공',
        type: Token,
    })
    async create(@Body() createTokenDto: CreateTokenDto): Promise<Token> {
        return await this.tokensService.create(createTokenDto);
    }

    @Put(':id')
    @ApiOperation({ summary: '토큰 정보 수정' })
    @ApiParam({ name: 'id', description: '토큰 ID' })
    @ApiResponse({
        status: 200,
        description: '토큰 수정 성공',
        type: Token,
    })
    async update(@Param('id') id: string, @Body() updateData: Partial<Token>): Promise<Token> {
        return await this.tokensService.update(id, updateData);
    }

    @Delete(':id')
    @ApiOperation({ summary: '토큰 삭제' })
    @ApiParam({ name: 'id', description: '토큰 ID' })
    @ApiResponse({
        status: 200,
        description: '토큰 삭제 성공',
    })
    async remove(@Param('id') id: string): Promise<void> {
        return await this.tokensService.remove(id);
    }
}

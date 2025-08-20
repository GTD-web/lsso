import { Controller, Post, Get, Delete, Body, HttpCode, HttpStatus, UseGuards, Query } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { FcmTokenManagementApplicationService } from '../fcm-token-management-application.service';
import {
    FcmSubscribeRequestDto,
    FcmSubscribeResponseDto,
    FcmTokenResponseDto,
    FcmUnsubscribeResponseDto,
} from '../dto';
import { JwtAuthGuard } from '../../../../../libs/common/guards/jwt-auth.guard';
import { User, AuthenticatedUser } from '../../../../../libs/common/decorators/user.decorator';

@ApiTags('FCM 토큰 관리 API')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('fcm')
export class FcmTokenManagementApplicationController {
    constructor(private readonly fcmTokenManagementApplicationService: FcmTokenManagementApplicationService) {}

    @Post('subscribe')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        summary: 'FCM 토큰 구독',
        description: '사용자의 FCM 토큰을 등록하거나 업데이트합니다.',
    })
    @ApiResponse({
        status: 200,
        description: 'FCM 토큰 구독 성공',
        type: FcmSubscribeResponseDto,
    })
    @ApiResponse({ status: 400, description: '잘못된 요청 형식' })
    @ApiResponse({ status: 401, description: '인증이 필요합니다' })
    @ApiResponse({ status: 404, description: '직원 정보를 찾을 수 없음' })
    async subscribeFcm(
        @User() user: AuthenticatedUser,
        @Body() body: FcmSubscribeRequestDto,
    ): Promise<FcmSubscribeResponseDto> {
        return this.fcmTokenManagementApplicationService.FCM토큰을_구독한다(user.id, body);
    }

    @Get('token')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        summary: 'FCM 토큰 조회',
        description: '현재 사용자의 FCM 토큰을 조회합니다.',
    })
    @ApiResponse({
        status: 200,
        description: 'FCM 토큰 조회 성공',
        type: FcmTokenResponseDto,
    })
    @ApiResponse({ status: 401, description: '인증이 필요합니다' })
    @ApiResponse({ status: 404, description: '직원 정보를 찾을 수 없음' })
    async getFcmToken(@User() user: AuthenticatedUser): Promise<FcmTokenResponseDto> {
        return this.fcmTokenManagementApplicationService.FCM토큰을_조회한다(user.id);
    }

    @Delete('unsubscribe')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        summary: 'FCM 토큰 구독 해지',
        description: '사용자의 FCM 토큰 구독을 해지합니다.',
    })
    @ApiResponse({
        status: 200,
        description: 'FCM 토큰 구독 해지 성공',
        type: FcmUnsubscribeResponseDto,
    })
    @ApiResponse({ status: 401, description: '인증이 필요합니다' })
    @ApiResponse({ status: 404, description: '직원 정보를 찾을 수 없음' })
    async unsubscribeFcm(@User() user: AuthenticatedUser): Promise<FcmUnsubscribeResponseDto> {
        return this.fcmTokenManagementApplicationService.FCM토큰_구독을_해지한다(user.id);
    }

    @Get('tokens')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        summary: '여러 직원의 FCM 토큰 조회 (알림서버용)',
        description: '알림서버에서 사용할 여러 직원의 FCM 토큰을 조회합니다.',
    })
    @ApiQuery({
        name: 'employeeIds',
        description: '직원 ID 배열 (쉼표로 구분)',
        required: true,
        type: String,
        example: 'emp123,emp456,emp789',
    })
    @ApiResponse({
        status: 200,
        description: 'FCM 토큰 목록 조회 성공',
        type: [FcmTokenResponseDto],
    })
    @ApiResponse({ status: 401, description: '인증이 필요합니다' })
    @ApiResponse({ status: 404, description: '직원 정보를 조회할 수 없음' })
    async getFcmTokens(
        @User() user: AuthenticatedUser,
        @Query('employeeIds') employeeIds: string,
    ): Promise<FcmTokenResponseDto[]> {
        // 쉼표로 구분된 문자열을 배열로 변환
        const employeeIdsArray = employeeIds
            .split(',')
            .map((id) => id.trim())
            .filter((id) => id.length > 0);

        return this.fcmTokenManagementApplicationService.여러_직원의_FCM토큰을_조회한다(employeeIdsArray);
    }
}

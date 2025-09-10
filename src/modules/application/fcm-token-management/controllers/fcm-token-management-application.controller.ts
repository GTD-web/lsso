import { Controller, Post, Get, Delete, Body, HttpCode, HttpStatus, UseGuards, Query } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { FcmTokenManagementApplicationService } from '../fcm-token-management-application.service';
import {
    FcmSubscribeRequestDto,
    FcmSubscribeResponseDto,
    FcmTokenRequestDto,
    FcmTokenResponseDto,
    FcmUnsubscribeRequestDto,
    FcmUnsubscribeResponseDto,
} from '../dto';

@ApiTags('FCM 토큰 관리 API')
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
    @ApiResponse({ status: 404, description: '직원 정보를 찾을 수 없음' })
    async subscribeFcm(@Body() body: FcmSubscribeRequestDto): Promise<FcmSubscribeResponseDto> {
        return this.fcmTokenManagementApplicationService.FCM토큰을_구독한다(body.employeeNumber, body);
    }

    @Post('token')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        summary: 'FCM 토큰 조회',
        description: '직원번호로 FCM 토큰을 조회합니다.',
    })
    @ApiResponse({
        status: 200,
        description: 'FCM 토큰 조회 성공',
        type: FcmTokenResponseDto,
    })
    @ApiResponse({ status: 400, description: '잘못된 요청 형식' })
    @ApiResponse({ status: 404, description: '직원 정보를 찾을 수 없음' })
    async getFcmToken(@Body() body: FcmTokenRequestDto): Promise<FcmTokenResponseDto> {
        return this.fcmTokenManagementApplicationService.FCM토큰을_조회한다(body.employeeNumber);
    }

    @Post('unsubscribe')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        summary: 'FCM 토큰 구독 해지',
        description: '직원번호로 FCM 토큰 구독을 해지합니다.',
    })
    @ApiResponse({
        status: 200,
        description: 'FCM 토큰 구독 해지 성공',
        type: FcmUnsubscribeResponseDto,
    })
    @ApiResponse({ status: 400, description: '잘못된 요청 형식' })
    @ApiResponse({ status: 404, description: '직원 정보를 찾을 수 없음' })
    async unsubscribeFcm(@Body() body: FcmUnsubscribeRequestDto): Promise<FcmUnsubscribeResponseDto> {
        return this.fcmTokenManagementApplicationService.FCM토큰_구독을_해지한다(body.employeeNumber);
    }

    @Get('tokens')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        summary: '여러 직원의 FCM 토큰 조회 (알림서버용)',
        description: '알림서버에서 사용할 여러 직원의 FCM 토큰을 조회합니다.',
    })
    @ApiQuery({
        name: 'employeeNumbers',
        description: '직원번호 배열 (쉼표로 구분)',
        required: true,
        type: String,
        example: '25001,25002,25003',
    })
    @ApiResponse({
        status: 200,
        description: 'FCM 토큰 목록 조회 성공',
        type: [FcmTokenResponseDto],
    })
    @ApiResponse({ status: 400, description: '잘못된 요청 형식' })
    @ApiResponse({ status: 404, description: '직원 정보를 조회할 수 없음' })
    async getFcmTokens(@Query('employeeNumbers') employeeNumbers: string): Promise<FcmTokenResponseDto[]> {
        // 쉼표로 구분된 문자열을 배열로 변환
        const employeeNumbersArray = employeeNumbers
            .split(',')
            .map((num) => num.trim())
            .filter((num) => num.length > 0);

        return this.fcmTokenManagementApplicationService.여러_직원의_FCM토큰을_조회한다(employeeNumbersArray);
    }
}

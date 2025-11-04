import {
    Controller,
    Post,
    Get,
    Delete,
    Body,
    HttpCode,
    HttpStatus,
    UseGuards,
    Query,
    BadRequestException,
} from '@nestjs/common';
import { ApiTags, ApiResponse, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { FcmTokenManagementApplicationService } from '../fcm-token-management-application.service';
import {
    FcmSubscribeRequestDto,
    FcmSubscribeResponseDto,
    FcmTokenRequestDto,
    FcmTokenResponseDto,
    FcmTokensResponseDto,
    MultipleFcmTokensResponseDto,
    FcmUnsubscribeRequestDto,
    FcmUnsubscribeResponseDto,
    BaseEmployeeIdentifierDto,
    FcmRemoveTokenRequestDto,
    FcmRemoveTokenResponseDto,
} from '../dto';

@ApiTags('Client - FCM 토큰 관리 API')
@Controller('fcm')
export class FcmTokenManagementApplicationController {
    constructor(private readonly fcmTokenManagementApplicationService: FcmTokenManagementApplicationService) {}

    @Post('subscribe')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        summary: 'FCM 토큰 구독',
        description:
            '사용자의 FCM 토큰을 등록하거나 업데이트합니다. ' +
            'employeeId와 employeeNumber가 둘 다 제공된 경우 정합성을 체크합니다.',
    })
    @ApiResponse({
        status: 200,
        description: 'FCM 토큰 구독 성공',
        type: FcmSubscribeResponseDto,
    })
    @ApiResponse({ status: 400, description: '잘못된 요청 형식 또는 employeeId와 employeeNumber 정합성 오류' })
    @ApiResponse({ status: 404, description: '직원 정보를 찾을 수 없음' })
    async subscribeFcm(@Body() body: FcmSubscribeRequestDto): Promise<FcmSubscribeResponseDto> {
        return this.fcmTokenManagementApplicationService.FCM토큰을_구독한다(body);
    }

    @Get('token')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        summary: 'FCM 토큰 조회',
        description:
            'employeeId 또는 employeeNumber로 직원의 모든 FCM 토큰을 조회합니다. ' +
            '둘 다 제공된 경우 같은 직원을 가리키는지 정합성을 체크합니다.',
    })
    @ApiQuery({
        name: 'employeeId',
        description: '직원 ID (UUID)',
        required: false,
        type: String,
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    @ApiQuery({
        name: 'employeeNumber',
        description: '직원 번호',
        required: false,
        type: String,
        example: '25001',
    })
    @ApiResponse({
        status: 200,
        description: 'FCM 토큰 조회 성공',
        type: FcmTokensResponseDto,
    })
    @ApiResponse({ status: 400, description: '잘못된 요청 형식 또는 employeeId와 employeeNumber 정합성 오류' })
    @ApiResponse({ status: 404, description: '직원 정보를 찾을 수 없음' })
    async getFcmToken(@Query() baseEmployeeIdentifierDto: BaseEmployeeIdentifierDto): Promise<FcmTokensResponseDto> {
        return this.fcmTokenManagementApplicationService.FCM토큰을_조회한다(baseEmployeeIdentifierDto);
    }

    @Post('unsubscribe')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        summary: 'FCM 토큰 구독 해지',
        description:
            'employeeId 또는 employeeNumber로 FCM 토큰 구독을 해지합니다. ' + '둘 다 제공된 경우 정합성을 체크합니다.',
    })
    @ApiResponse({
        status: 200,
        description: 'FCM 토큰 구독 해지 성공',
        type: Boolean,
    })
    @ApiResponse({ status: 400, description: '잘못된 요청 형식 또는 employeeId와 employeeNumber 정합성 오류' })
    @ApiResponse({ status: 404, description: '직원 정보를 찾을 수 없음' })
    async unsubscribeFcm(@Body() body: FcmUnsubscribeRequestDto): Promise<boolean> {
        return this.fcmTokenManagementApplicationService.FCM토큰_구독을_해지한다(body);
    }

    @Get('tokens')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        summary: '여러 직원의 FCM 토큰 조회 (알림서버용)',
        description:
            '알림서버에서 사용할 여러 직원의 FCM 토큰을 조회합니다. employeeIds 또는 employeeNumbers 중 하나를 제공해야 합니다.',
    })
    @ApiQuery({
        name: 'employeeNumbers',
        description: '직원번호 배열 (쉼표로 구분)',
        required: false,
        type: String,
        example: '25001,25002,25003',
    })
    @ApiQuery({
        name: 'employeeIds',
        description: '직원 ID 배열 (쉼표로 구분, UUID)',
        required: false,
        type: String,
        example: '123e4567-e89b-12d3-a456-426614174000,123e4567-e89b-12d3-a456-426614174001',
    })
    @ApiResponse({
        status: 200,
        description: 'FCM 토큰 목록 조회 성공',
        type: MultipleFcmTokensResponseDto,
    })
    @ApiResponse({ status: 400, description: '잘못된 요청 형식' })
    @ApiResponse({ status: 404, description: '직원 정보를 조회할 수 없음' })
    async getFcmTokens(
        @Query('employeeNumbers') employeeNumbers?: string,
        @Query('employeeIds') employeeIds?: string,
    ): Promise<MultipleFcmTokensResponseDto> {
        // employeeIds가 있으면 우선 사용
        if (employeeIds) {
            const employeeIdsArray = employeeIds
                .split(',')
                .map((id) => id.trim())
                .filter((id) => id.length > 0);
            return this.fcmTokenManagementApplicationService.여러_직원의_FCM토큰을_ID로_조회한다(employeeIdsArray);
        }

        // employeeNumbers 사용
        if (employeeNumbers) {
            const employeeNumbersArray = employeeNumbers
                .split(',')
                .map((num) => num.trim())
                .filter((num) => num.length > 0);
            return this.fcmTokenManagementApplicationService.여러_직원의_FCM토큰을_조회한다(employeeNumbersArray);
        }

        throw new BadRequestException('employeeIds 또는 employeeNumbers 중 하나는 반드시 제공되어야 합니다.');
    }

    @Delete('tokens')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        summary: '여러 직원의 여러 FCM 토큰 일괄 제거',
        description:
            '직원별 토큰 정보 배열을 받아서 각 직원의 토큰들을 일괄 제거합니다. ' +
            '각 직원 정보와 토큰 정보가 모두 존재하고 연결되어 있어야 합니다. ' +
            '연결 관계를 삭제한 후, 다른 직원이 사용하지 않는 경우 토큰도 함께 삭제합니다. ' +
            '일부 삭제가 실패해도 나머지는 계속 처리되며, 각 결과를 반환합니다.',
    })
    @ApiResponse({
        status: 200,
        description: 'FCM 토큰 일괄 제거 완료 (성공/실패 결과 포함)',
        type: FcmRemoveTokenResponseDto,
    })
    @ApiResponse({ status: 400, description: '잘못된 요청 형식' })
    async removeFcmTokens(@Body() body: FcmRemoveTokenRequestDto): Promise<FcmRemoveTokenResponseDto> {
        return this.fcmTokenManagementApplicationService.여러_직원의_여러_토큰을_일괄제거한다(body);
    }
}

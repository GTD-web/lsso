import { ApiProperty } from '@nestjs/swagger';

export class ErrorResponseDto {
    @ApiProperty({ description: '오류 코드' })
    code: string;

    @ApiProperty({ description: '오류 메시지' })
    message: string;

    constructor(code: string, message: string) {
        this.code = code;
        this.message = message;
    }
}

export class ApiResponseDto<T> {
    @ApiProperty({ description: 'API 요청 성공 여부' })
    success: boolean;

    @ApiProperty({ description: '요청이 성공한 경우 반환되는 데이터', required: false })
    data?: T;

    @ApiProperty({
        description: '요청이 실패한 경우 반환되는 오류 정보',
        required: false,
        type: ErrorResponseDto,
    })
    error?: ErrorResponseDto;

    private constructor(success: boolean, data?: T, error?: ErrorResponseDto) {
        this.success = success;

        if (data !== undefined) {
            this.data = data;
        }

        if (error !== undefined) {
            this.error = error;
        }
    }

    static success<T>(data: T): ApiResponseDto<T> {
        return new ApiResponseDto<T>(true, data);
    }

    static error<T>(code: string, message: string): ApiResponseDto<T> {
        return new ApiResponseDto<T>(false, undefined, new ErrorResponseDto(code, message));
    }
}

import { IsString, IsNotEmpty, IsArray, ArrayMinSize, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class EmployeeFcmTokensDto {
    @ApiProperty({
        description: '직원 번호',
        example: '25001',
    })
    @IsString()
    @IsNotEmpty()
    employeeNumber: string;

    @ApiProperty({
        description: '해당 직원의 FCM 토큰 값 배열',
        example: ['fcm_token_example_12345...', 'fcm_token_example_67890...'],
        type: [String],
    })
    @IsArray()
    @ArrayMinSize(1, { message: '최소 하나 이상의 FCM 토큰이 필요합니다.' })
    @IsString({ each: true })
    @IsNotEmpty({ each: true })
    fcmTokens: string[];
}

export class FcmRemoveTokenRequestDto {
    @ApiProperty({
        description: '직원별 토큰 정보 배열',
        example: [
            {
                employeeNumber: '25001',
                fcmTokens: ['fcm_token_example_12345...', 'fcm_token_example_67890...'],
            },
            {
                employeeNumber: '25002',
                fcmTokens: ['fcm_token_example_11111...'],
            },
        ],
        type: [EmployeeFcmTokensDto],
    })
    @IsArray()
    @ArrayMinSize(1, { message: '최소 하나 이상의 직원 정보가 필요합니다.' })
    @ValidateNested({ each: true })
    @Type(() => EmployeeFcmTokensDto)
    employees: EmployeeFcmTokensDto[];
}

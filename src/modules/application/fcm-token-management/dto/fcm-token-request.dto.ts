import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FcmTokenRequestDto {
    @ApiProperty({
        description: '직원 번호',
        example: '25001',
    })
    @IsString()
    @IsNotEmpty()
    employeeNumber: string;
}

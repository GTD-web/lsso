import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty } from 'class-validator';

export class UpdateTokenStatusDto {
    @ApiProperty({
        description: '토큰 활성화 상태',
        example: true,
    })
    @IsNotEmpty()
    @IsBoolean()
    isActive: boolean;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty } from 'class-validator';

export class UpdateSystemStatusDto {
    @ApiProperty({ description: '활성화 상태', example: true })
    @IsBoolean()
    @IsNotEmpty()
    isActive: boolean;
}

import { ApiProperty } from '@nestjs/swagger';

export class SystemAuthResponseDto {
    @ApiProperty({ description: '시스템 ID' })
    systemId: string;

    @ApiProperty({ description: '시스템 이름' })
    systemName: string;
}

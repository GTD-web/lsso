import { ApiProperty } from '@nestjs/swagger';

export class SendMailDto {
    @ApiProperty({ type: [String] })
    recipients: string[];

    @ApiProperty({ type: String })
    subject: string;

    @ApiProperty({ type: String })
    template: string;

    @ApiProperty({ type: Object })
    context: any;
}

export class SystemAuthRequestDto {
    clientId: string;
    clientSecret: string;
}

export class SystemAuthResponseDto {
    id: string;
    clientId: string;
    name: string;
    description?: string;
    domain: string;
    allowedOrigin: string[];
    isActive: boolean;
    healthCheckUrl?: string;
}

export declare const ENV: NodeJS.ProcessEnv;
declare const _default: (() => {
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
    schema: string;
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
    schema: string;
}>;
export default _default;
export declare const JWT_CONFIG: (() => {
    secret: string;
    expiresIn: string;
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    secret: string;
    expiresIn: string;
}>;
export declare const WEB_PUSH_CONFIG: (() => {
    publicKey: string;
    privateKey: string;
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    publicKey: string;
    privateKey: string;
}>;
export declare const APP_CONFIG: (() => {
    url: string;
    port: number;
    storage: {
        type: string;
    };
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    url: string;
    port: number;
    storage: {
        type: string;
    };
}>;
export declare const FIREBASE_CONFIG: (() => {
    type: string;
    projectId: string;
    privateKeyId: string;
    privateKey: string;
    clientEmail: string;
    clientId: string;
    authUri: string;
    tokenUri: string;
    authProviderX509CertUrl: string;
    clientX509CertUrl: string;
    universeDomain: string;
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    type: string;
    projectId: string;
    privateKeyId: string;
    privateKey: string;
    clientEmail: string;
    clientId: string;
    authUri: string;
    tokenUri: string;
    authProviderX509CertUrl: string;
    clientX509CertUrl: string;
    universeDomain: string;
}>;

// src/vercel.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';

let server: ReturnType<typeof express> | undefined;

async function bootstrap() {
    const expressApp = express();
    const app = await NestFactory.create(AppModule, new ExpressAdapter(expressApp));
    await app.init(); // 서버리스: listen() 금지
    return expressApp; // req,res를 받을 수 있는 함수(Express)
}

export default async function handler(req: any, res: any) {
    server = server ?? (await bootstrap());
    return server(req, res);
}

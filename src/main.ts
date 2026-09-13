import { config } from 'dotenv';

config();

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from '@src/app.module';
import { Logger } from 'nestjs-pino';
import { config as serverConfig } from './config/server.config';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());
  const logger = app.get(Logger);
  app.useLogger(logger);
  app.useGlobalPipes(new ValidationPipe());

  const allowedOrigins = [
    process.env.FRONTEND_URL?.trim(),
    'chrome-extension://flnheeellpciglgpaodhkhmapeljopja',
    'electron://altair',
  ]
    .filter(Boolean)
    .join(',')
    .split(',');

  const allowedPrefixes = ['http://localhost', 'http://0.0.0.0', 'http://192.168.15.7'];

  app.enableCors({
    origin: (origin, callback) => {
      if (
        !origin ||
        allowedOrigins.includes(origin) ||
        allowedPrefixes.some((prefix) => origin.startsWith(prefix))
      ) {
        callback(null, true);
      } else {
        logger.warn(`CORS: Origin ${origin} not allowed`);
        callback(new Error(`Origin ${origin} not allowed by CORS`), false);
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'X-Requested-With',
      'Accept',
      'Origin',
      'Access-Control-Request-Method',
      'Access-Control-Request-Headers',
    ],
    exposedHeaders: ['Content-Length', 'Content-Type'],
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });

  const { host, port } = serverConfig;
  const url = new URL(`http://${host}:${port}/`);

  await app.listen(port, host, () => {
    logger.log(`Listening at ${url}`);
    logger.log(`Health check: ${url}health`);
    logger.log(`GraphQL API: ${url}graphql`);
  });
}

bootstrap();

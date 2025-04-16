import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import supertokens from 'supertokens-node';
import { SupertokensExceptionFilter } from './auth/auth.filter';
import * as SuperTokensConfig from './config';
import { join } from 'path';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import  logger  from './loggerfile/logger';
import * as express from 'express';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './config/allexception.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }))
  // Set JSON payload size limit
  app.use(express.json({ limit: '100mb' })); // Adjust size as needed
  app.use(express.urlencoded({ limit: '100mb', extended: true }));

  app.enableCors({
    origin: true,
    credentials: true,
    allowedHeaders: ['content-type', ...supertokens.getAllCORSHeaders()],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  });
  
  
  
  
  app.useGlobalFilters(new SupertokensExceptionFilter());

  const options = new DocumentBuilder()
    .setTitle('monitoring-server')
    .setVersion('1.0')
    .addBearerAuth({
      type: "http",
      scheme: "bearer",
      bearerFormat: "JWT",
      name: "JWT",
      description: "Enter JWT Access Token",
      in: "header"
    }, "JWT-auth").build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(`${process.env.APP_PORT}`, () => {
    logger.info(`NestJs API server started on : ${process.env.APP_PORT}`);
  });
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();

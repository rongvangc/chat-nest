import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import { AppModule } from './app.module';
import { MongoExceptionFilter } from './exceptions/mongo.exception';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new MongoExceptionFilter());
  app.setGlobalPrefix('api');
  app.use(cookieParser());
  app.use(
    session({
      name: 'JWT',
      secret: 'my-secret',
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 60 * 60,
        httpOnly: true,
        secure: false,
      },
    }),
  );

  await app.listen(process.env.PORT || 4000);
}
bootstrap();

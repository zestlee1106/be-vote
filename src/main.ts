import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // DTO 에 선언되지 않은 것들은 whitelist 에 넣어줌
      forbidNonWhitelisted: true, // whitelist 에 없는 것들은 400 대 에러 내려줌
      transform: true, // type 을 바꿔준다 (예: qs 는 string 인데 number 로)
    }),
  );
  await app.listen(3333);
}
bootstrap();

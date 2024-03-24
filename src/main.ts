import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Validate body in post method
  app.useGlobalPipes(new ValidationPipe());

  // Setup swagger docs
  const config = new DocumentBuilder()
    .setTitle('TypeScript RSA encryption and decryption')
    .setDescription('RSA encryption and decryption APIs')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(3000);
}
bootstrap();

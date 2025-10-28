import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Get config service
  const configService = app.get(ConfigService);
  const port = configService.get('PORT') || 3001;
  const frontendUrl = configService.get('FRONTEND_URL') || 'http://localhost:5173';

  // Enable CORS
  app.enableCors({
    origin: frontendUrl,
    credentials: true,
  });

  // Enable validation pipes globally
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  await app.listen(port);
  console.log(`🚀 Application is running on: http://localhost:${port}`);
}

bootstrap();

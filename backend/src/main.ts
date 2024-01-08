import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const port = parseInt(process.env.SERVER_PORT || '3000');
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: true });
  await app.listen(port);
}
bootstrap();

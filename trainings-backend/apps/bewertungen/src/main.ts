import { NestFactory } from '@nestjs/core';
import { BewertungenModule } from './bewertungen.module';

async function bootstrap() {
  const app = await NestFactory.create(BewertungenModule);
  app.enableCors({ allowedHeaders: ['content-type', 'traceparent', 'sentry-trace'] });
  await app.listen(3000);
}
bootstrap();

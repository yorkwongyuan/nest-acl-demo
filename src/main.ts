import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: 'http://localhost:5173',
      credentials: true,
    },
  });
  app.use(
    session({
      secret: 'jack',
      resave: false,
      saveUninitialized: false,
    }),
  );
  await app.listen(3000);
}
bootstrap();

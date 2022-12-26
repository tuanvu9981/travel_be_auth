import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { API_PREFIX } from './common/constant/api.tags';
import { AppLogger } from './common/log/log.index';
import { initApiDocument } from './config/config.api';
import { getConfig } from './config/config.db';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); //allow share common resources ??
  
  // app.useGlobalFilters(new Filter);
  app.setGlobalPrefix(API_PREFIX);
  initApiDocument(app);
  await app.listen(getConfig().PORT);
  AppLogger.log(`Server is listening to PORT: ${getConfig().PORT}`);
}
bootstrap();

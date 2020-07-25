import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import * as config from 'config'

async function bootstrap() {
  const logger = new Logger('bootstrap')
  const app = await NestFactory.create(AppModule);
  const serverConfig = config.get('server')

  // if (process.env.NODE_ENV === 'development') {
    app.enableCors()
  // } else {
    // app.enableCors({ origin: serverConfig.origin })
  // }
  await app.listen(serverConfig.port);
  logger.log(`app is renning on port ${serverConfig.port}`)
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import bodyParser from 'body-parser';
import { AppModule } from './app.module';
import {API_DESCRIPTION} from './core/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // global prefix
  app.setGlobalPrefix('api/v1');

  const options = new DocumentBuilder()
    .setTitle('GK-triol back-end')
    .setDescription('Описание методов api GK-triol')
    .setVersion('1.0')
    .addTag('gk-triol')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(API_DESCRIPTION, app, document);
  
  
  
  await app.listen(3000);
}
bootstrap();

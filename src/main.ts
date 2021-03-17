import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('GK-triol back-end')
    .setDescription('Описание методов api GK-triol')
    .setVersion('1.0')
    .addTag('gk-triol')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);


  // global prefix
  app.setGlobalPrefix('api/v1');
  await app.listen(3000);
}
bootstrap();

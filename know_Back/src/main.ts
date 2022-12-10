import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ValidationPipe} from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const PORT = process.env.PORT || 5500
  const app = await NestFactory.create(AppModule, {cors : true});
  app.getHttpAdapter().getInstance().disable('x-powered-by');

  app.useGlobalPipes(
    new ValidationPipe({
      transform : true,
      whitelist : true,
      forbidNonWhitelisted : true, 
    })
  )

  app.setGlobalPrefix('api');

  const config = new DocumentBuilder().setTitle('KNOW DEV DOCS')
                  .setDescription('Documentation of Rest API')
                  .setVersion('1.0.0').addTag('some tags').build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('/docs', app, document)
  await app.listen(PORT, ()=> {console.log(`server started on PORT : ${PORT}`)});
}
bootstrap();

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const PORT : number = Number(process.env.PORT)
  const app = await NestFactory.create(AppModule, {cors : true});
  app.getHttpAdapter().getInstance().disable('x-powered-by');

  app.useGlobalPipes(
    new ValidationPipe({
      transform : true,
      whitelist : true,
      forbidNonWhitelisted : true, 
    })
  )

  const config = new DocumentBuilder()
        .setTitle('welbex test')
        .setDescription('REST API')
        .setVersion('1.0.0')
        .addTag('swagger documentation')
        .addBearerAuth()
        .build()
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document)

  // app.setGlobalPrefix('api');
  await app.listen(PORT, ()=>{console.log(`server started on port:${PORT}`)});
}
bootstrap();

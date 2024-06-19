import { NestFactory } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { AppModule } from './app.module'
import * as cookieParser from 'cookie-parser'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.use(cookieParser())

  const config = new DocumentBuilder()
    .setTitle('Outil_veille_API')
    .setDescription(
      'API de récupération de différentes sources de veille techniques',
    )
    .setVersion('1.0')
    .addTag('veille')
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  await app.listen(3000)
  console.log('Application is running on: ', await app.getUrl())
}
bootstrap()

import { AppModule } from './app.module'
import { Model } from 'objection'
import { NestFactory } from '@nestjs/core'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import { knex } from 'db/knex'

// eslint-disable-next-line
require('dotenv').config()

async function bootstrap() {
  Model.knex(knex)
  const app = await NestFactory.create(AppModule)
  app.use(helmet())
  app.use(cookieParser())
  await app.listen(4000)
}
void bootstrap()

import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthMiddleware } from './common/middlewares/auth.middleware'
import { JwtParserMiddleware } from './common/middlewares/jwt-parser.middleware'
import { TodoController } from './todo/todo.controller'
import { TodoModule } from './todo/todo.module'
import { UserModule } from './user/user.module'

@Module({
  imports: [UserModule, TodoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtParserMiddleware)
      .forRoutes('/')
      .apply(AuthMiddleware)
      .forRoutes(TodoController)
  }
}

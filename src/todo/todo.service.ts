import { CreateTodoDto } from './dto/create-todo.dto'
import { Injectable } from '@nestjs/common'
import { Todo } from './entities/todo.entity'
import { UpdateTodoDto } from './dto/update-todo.dto'

@Injectable()
export class TodoService {
  create(userId: string, createTodoDto: CreateTodoDto) {
    return Todo.query().insert({ ...createTodoDto, user_id: userId })
  }

  findAll(userId: string) {
    return Todo.query().where('user_id', userId)
  }

  findOne(userId: string, id: string) {
    return Todo.query().findOne('id', id).andWhere('user_id', userId)
  }

  update(userId: string, id: string, updateTodoDto: UpdateTodoDto) {
    return this.findOne(userId, id).patch(updateTodoDto)
  }

  remove(userId: string, id: string) {
    return this.findOne(userId, id).delete()
  }
}

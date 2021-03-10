import { Controller, Get, Post, Body, Put, Param, Delete, Req } from '@nestjs/common'
import { TodoService } from './todo.service'
import { CreateTodoDto } from './dto/create-todo.dto'
import { UpdateTodoDto } from './dto/update-todo.dto'
import { Request } from 'express'

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  async create(@Body() createTodoDto: CreateTodoDto, @Req() req: Request) {
    return this.todoService.create(req.userId, createTodoDto)
  }

  @Get()
  async findAll(@Req() req: Request) {
    return this.todoService.findAll(req.userId)
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Req() req: Request) {
    return this.todoService.findOne(req.userId, id)
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto, @Req() req: Request) {
    return (await this.todoService.update(req.userId, id, updateTodoDto)) > 0
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req: Request) {
    return (await this.todoService.remove(req.userId, id)) > 0
  }
}

import { Model, RelationMappings } from 'objection'

import { Todo } from 'src/todo/entities/todo.entity'

export class User extends Model {
  static get tableName() {
    return 'user'
  }

  id: string
  username: string
  email: string
  password: string
  todos: Todo[]

  static get relationMappings(): RelationMappings {
    return {
      todos: {
        relation: Model.HasManyRelation,
        modelClass: Todo,
        join: {
          from: 'user.id',
          to: 'todo.user_id',
        },
      },
    }
  }
}

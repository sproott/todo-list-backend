import { Model } from 'objection'

export class Todo extends Model {
  static get tableName() {
    return 'todo'
  }

  id: string
  name: string
  done: boolean
  user_id: string
}

import Knex from 'knex'
import { uuid } from '../lib'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('todo', function (table) {
    uuid(table, knex)
    table.string('name').unique().notNullable()
    table.boolean('done').defaultTo(false)
    table.uuid('user_id').references('id').inTable('user').notNullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('todo')
}

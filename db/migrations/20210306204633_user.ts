import Knex from 'knex'
import { uuid } from '../lib'

export async function up(knex: Knex): Promise<void> {
  await knex.raw('create extension if not exists "uuid-ossp"')
  return knex.schema.createTable('user', function (table) {
    uuid(table, knex)
    table.string('username').unique().notNullable()
    table.string('password').notNullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('user')
  return knex.raw('drop extension if exists "uuid-ossp"')
}

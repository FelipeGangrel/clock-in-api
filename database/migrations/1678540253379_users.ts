import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import { UserRole } from 'App/Contracts/Users'

export default class extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('first_name').notNullable()
      table.string('last_name').notNullable()
      table.enum('role', Object.values(UserRole)).defaultTo(UserRole.COLLABORATOR).notNullable()
      table.string('email', 255).notNullable().unique()
      table.string('password', 180).notNullable()
      table.string('password_reset_token', 10).nullable()
      table.string('remember_me_token').nullable()
      table.timestamp('blocked_at', { useTz: true }).defaultTo(null)
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()
      table.timestamp('deleted_at', { useTz: true }).defaultTo(null)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}

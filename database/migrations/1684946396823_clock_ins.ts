import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import { ClockInType } from 'App/Contracts/ClockIns'

export default class extends BaseSchema {
  protected tableName = 'clock_ins'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.enum('type', Object.values(ClockInType)).defaultTo(ClockInType.ON_TIME).notNullable()
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.string('latitude').notNullable()
      table.string('longitude').notNullable()
      table.timestamp('date_time', { useTz: true }).notNullable()
      table.text('comment').defaultTo(null)
      table
        .integer('validated_by')
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .defaultTo(null)
      table.timestamp('validated_at', { useTz: true }).defaultTo(null)
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}

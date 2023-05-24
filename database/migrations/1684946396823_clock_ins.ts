import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import { ClockInType } from 'App/Contracts/ClockIns'

export default class extends BaseSchema {
  protected tableName = 'clock_ins'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.enum('type', Object.values(ClockInType)).defaultTo(ClockInType.IN).notNullable()

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}

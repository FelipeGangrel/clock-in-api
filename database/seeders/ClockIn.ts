import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import ClockIn from 'App/Models/ClockIn'
import { ClockInFactory } from 'Database/factories/ClockIn'

export default class ClockInSeeder extends BaseSeeder {
  public async run() {
    await ClockIn.truncate()

    await ClockInFactory.createMany(100)
  }
}

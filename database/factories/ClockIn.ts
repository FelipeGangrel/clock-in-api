import Factory from '@ioc:Adonis/Lucid/Factory'
import ClockIn from 'App/Models/ClockIn'
import { DateTime } from 'luxon'

function integerBetween(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export const ClockInFactory = Factory.define(ClockIn, async ({ faker }) => {
  return {
    userId: integerBetween(1, 10),
    latitude: faker.address.latitude(),
    longitude: faker.address.longitude(),
    dateTime: DateTime.fromJSDate(faker.date.recent()),
  }
}).build()

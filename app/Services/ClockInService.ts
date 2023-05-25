import type {
  ClockInCalendarEntry,
  FindClockInsCalendarEntries,
  RegisterLateClockIn,
  RegisterOnTimeClockIn,
} from 'App/Contracts/ClockIns'
import User from 'App/Models/User'
import ClockIn from 'App/Models/ClockIn'
import Database from '@ioc:Adonis/Lucid/Database'
import { DateTime } from 'luxon'

export default class ClockInService {
  public registerOnTime(payload: RegisterOnTimeClockIn, user: User): Promise<ClockIn> {
    const { latitude, longitude } = payload

    return ClockIn.create({
      userId: user.id,
      latitude,
      longitude,
    })
  }

  public registerLate(payload: RegisterLateClockIn, user: User): Promise<ClockIn> {
    const { latitude, longitude, comment, dateTime } = payload

    return ClockIn.create({
      userId: user.id,
      latitude,
      longitude,
      comment,
      dateTime,
    })
  }

  public async findClockIns(payload: FindClockInsCalendarEntries): Promise<ClockInCalendarEntry[]> {
    const {
      userId,
      startDate = DateTime.local().startOf('week').minus({ day: 1 }).toFormat('yyyy-MM-dd'),
      endDate = DateTime.local().endOf('week').minus({ day: 1 }).toFormat('yyyy-MM-dd'),
    } = payload

    const daysInInterval = this.getIntervalDates(
      DateTime.fromISO(startDate),
      DateTime.fromISO(endDate)
    )

    const validDaysForInterval: { date: string; total: number }[] = await Database.rawQuery(`
      SELECT
        DATE(date_time) AS date,
        COUNT(*) AS total
      FROM clock_ins WHERE user_id = ${userId} AND date_time BETWEEN '${startDate}' AND '${endDate}'
      GROUP BY date
      ORDER BY date asc
    `)

    const result: ClockInCalendarEntry[] = daysInInterval.map((day) => {
      const validDay = validDaysForInterval.find(
        (validDay) => validDay.date === day.toFormat('yyyy-MM-dd')
      )

      return {
        date: day.toFormat('yyyy-MM-dd'),
        total: validDay ? validDay.total : 0,
        weekday: day.toFormat('EEEE'),
        clockIns: [],
      }
    })

    for (const day of result) {
      if (day.total === 0) {
        continue
      }

      day.clockIns = await ClockIn.query()
        .where('userId', userId)
        .andWhereRaw(`DATE(date_time) = '${day.date}'`)
        .orderBy('dateTime', 'asc')
    }

    return result
  }

  private getIntervalDates(startDate: DateTime, endDate: DateTime): DateTime[] {
    const daysInInterval: DateTime[] = []

    for (let date = startDate; date <= endDate; date = date.plus({ days: 1 })) {
      daysInInterval.push(date)
    }

    return daysInInterval
  }
}

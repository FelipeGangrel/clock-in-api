import type { RegisterLateClockIn, RegisterOnTimeClockIn } from 'App/Contracts/ClockIns'
import User from 'App/Models/User'
import ClockIn from 'App/Models/ClockIn'

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
}

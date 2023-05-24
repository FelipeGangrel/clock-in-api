import type {
  FindClockIns,
  RegisterLateClockIn,
  RegisterOnTimeClockIn,
} from 'App/Contracts/ClockIns'
import User from 'App/Models/User'
import ClockIn from 'App/Models/ClockIn'
import { PaginatedResponse } from 'App/Contracts/Common'
import { ModelQueryBuilderContract } from '@ioc:Adonis/Lucid/Orm'

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

  public async findClockIns(payload: FindClockIns): Promise<PaginatedResponse> {
    const { page = 1, limit = 10, direction = 'desc', orderBy = 'dateTime', userId } = payload

    const query = this.getBaseQuery()

    if (userId) {
      query.where('userId', userId)
    }

    query.orderBy(orderBy, direction)

    const clockIns = await query.paginate(page, limit)

    return clockIns.serialize()
  }

  private getBaseQuery(): ModelQueryBuilderContract<typeof ClockIn> {
    return ClockIn.query().select('id', 'userId', 'latitude', 'longitude', 'comment', 'dateTime')
  }
}

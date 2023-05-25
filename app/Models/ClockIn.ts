import { DateTime } from 'luxon'
import { BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import { ClockInType } from 'App/Contracts/ClockIns'
import BaseModel from './BaseModel'
import User from './User'

export default class ClockIn extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public type: ClockInType

  @column()
  public userId: number

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @column()
  public latitude: string

  @column()
  public longitude: string

  @column.dateTime({ autoCreate: true })
  public dateTime: DateTime

  @column()
  public comment: string | null

  @column()
  public validatedBy: number | null

  @column.dateTime()
  public validatedAt: DateTime | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({
    autoCreate: true,
    autoUpdate: true,
  })
  public updatedAt: DateTime
}

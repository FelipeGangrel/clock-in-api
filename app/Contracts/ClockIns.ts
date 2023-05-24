import { DateTime } from 'luxon'
import { FindMany } from './Common'

export enum ClockInType {
  ON_TIME = 'ON_TIME',
  LATE = 'LATE',
  ADJUSTED = 'ADJUSTED',
}

export interface RegisterOnTimeClockIn {
  latitude: string
  longitude: string
}

export interface RegisterLateClockIn extends RegisterOnTimeClockIn {
  comment: string
  dateTime: DateTime
}

export interface FindClockIns extends FindMany {
  userId?: number
}

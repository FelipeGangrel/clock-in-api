import { DateTime } from 'luxon'

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

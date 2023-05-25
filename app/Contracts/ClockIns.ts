import { DateTime } from 'luxon'
import ClockIn from 'App/Models/ClockIn'

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

export interface FindClockInsCalendarEntries {
  userId: number
  startDate?: string
  endDate?: string
}

export interface ClockInCalendarEntry {
  date: string
  weekday: string
  total: number
  clockIns: ClockIn[]
}

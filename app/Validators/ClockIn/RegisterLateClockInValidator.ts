import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ValidationExceptionReporter from 'App/Exceptions/ValidationExceptionReporter'

export default class RegisterLateClockInValidator {
  constructor(protected ctx: HttpContextContract) {}

  public reporter = ValidationExceptionReporter

  public schema = schema.create({
    latitude: schema.string({ trim: true }),
    longitude: schema.string({ trim: true }),
    dateTime: schema.date({ format: 'yyyy-MM-dd HH:mm:ss' }),
    comment: schema.string({ trim: true }),
  })

  public messages: CustomMessages = {
    'latitude.required': 'Informe a latitude',
    'longitude.required': 'Informe a longitude',
    'datetime.required': 'Informe o horário',
    'comment.required': 'Informe sua justificativa',
  }
}

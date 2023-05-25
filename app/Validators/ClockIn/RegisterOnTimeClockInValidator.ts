import { schema, type CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ValidationExceptionReporter from 'App/Exceptions/ValidationExceptionReporter'

export default class RegisterOnTimeClockInValidator {
  constructor(protected ctx: HttpContextContract) {}

  public reporter = ValidationExceptionReporter

  public schema = schema.create({
    latitude: schema.string({ trim: true }),
    longitude: schema.string({ trim: true }),
  })

  public messages: CustomMessages = {
    'latitude.required': 'Informe a latitude',
    'longitude.required': 'Informe a longitude',
  }
}

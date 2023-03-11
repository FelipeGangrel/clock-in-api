/*
|--------------------------------------------------------------------------
| Http Exception Handler
|--------------------------------------------------------------------------
|
| AdonisJs will forward all exceptions occurred during an HTTP request to
| the following class. You can learn more about exception handling by
| reading docs.
|
| The exception handler extends a base `HttpExceptionHandler` which is not
| mandatory, however it can do lot of heavy lifting to handle the errors
| properly.
|
*/

import Logger from '@ioc:Adonis/Core/Logger'
import HttpExceptionHandler from '@ioc:Adonis/Core/HttpExceptionHandler'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ValidationException as CoreValidationException } from '@ioc:Adonis/Core/Validator'
import AuthorizationException from './AuthorizationException'
import ValidationException from './ValidationException'
import GenericException from './GenericException'

export default class ExceptionHandler extends HttpExceptionHandler {
  constructor() {
    super(Logger)
  }

  public async handle(error: any, ctx: HttpContextContract): Promise<void> {
    if (error instanceof CoreValidationException) {
      return error.handle(error, ctx)
    }

    if (error instanceof AuthorizationException) {
      return error.handle(error, ctx)
    }

    if (error instanceof ValidationException) {
      return error.handle(error, ctx)
    }

    if (error instanceof GenericException) {
      return error.handle(error, ctx)
    }

    ctx.response.status(error.status || 500).send({
      message: error.message || 'Erro ao realizar sua requisição',
      code: error.code || 'E_EXCEPTION',
    })
  }
}

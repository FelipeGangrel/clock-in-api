import { Exception } from '@adonisjs/core/build/standalone'
import type { HttpContextContract } from 'App/Contracts/Common'

interface ValidationError {
  message: string
  field: string
}

/**
 * Use this to throw a validation exception anywhere in your application.
 */
export default class ValdiationException extends Exception {
  private readonly validationErrors: ValidationError[]
  constructor(
    validationErrors: ValidationError[] = [],
    message: string = 'Seu formulário possui erros de validação',
    status: number = 422,
    code: string = 'E_VALIDATION_EXCEPTION'
  ) {
    super(message, status, code)
    this.validationErrors = validationErrors
  }

  public async handle(error: this, ctx: HttpContextContract): Promise<void> {
    ctx.response.status(error.status).send({
      message: error.message.replace(`${error?.code}: `, ''),
      validationErrors: error.validationErrors,
      code: error.code,
    })
  }
}

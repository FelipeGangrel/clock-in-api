import { Exception } from '@adonisjs/core/build/standalone'
import type { HttpContextContract } from 'App/Contracts/Common'

export default class GenericException extends Exception {
  constructor(
    message: string = 'Não foi possível executar sua requisição',
    status: number = 400,
    code: string = 'E_EXCEPTION'
  ) {
    super(message, status, code)
  }

  public async handle(error: this, ctx: HttpContextContract): Promise<void> {
    ctx.response.status(error.status).send({
      message: error.message,
      code: error.code,
    })
  }
}

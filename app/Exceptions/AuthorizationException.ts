import { Exception } from '@adonisjs/core/build/standalone'
import type { HttpContextContract } from 'App/Contracts/Common'

export default class AuthorizationException extends Exception {
  constructor(
    message: string = 'Você não possui permissões para realizar esta ação',
    status: number = 401,
    code: string = 'E_UNAUTHORIZED'
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

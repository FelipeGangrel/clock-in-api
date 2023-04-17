import type { AuthenticationResponse, GeneratePasswordResetTokenPayload } from 'App/Contracts/Auth'
import type { HttpContextContract } from 'App/Contracts/Common'
import AuthService from 'App/Services/AuthService'
import GeneratePasswordResetTokenValidator from 'App/Validators/Auth/GeneratePasswordResetTokenValidator'
import LoginValidator from 'App/Validators/Auth/LoginValidator'

export default class AuthController {
  private readonly service = new AuthService()

  public async login(payload: HttpContextContract): Promise<AuthenticationResponse> {
    await payload.request.validate(LoginValidator)
    return this.service.login(payload)
  }

  public logout(payload: HttpContextContract): Promise<void> {
    return this.service.logout(payload)
  }

  public me(payload: HttpContextContract): AuthenticationResponse['profile'] {
    return this.service.me(payload)
  }

  public async generatePasswordResetToken({ request }: HttpContextContract): Promise<void> {
    const payload: GeneratePasswordResetTokenPayload = await request.validate(
      GeneratePasswordResetTokenValidator
    )
    return this.service.generatePasswordResetToken(payload)
  }
}

import type { AuthenticationResponse } from 'App/Contracts/auth'
import type { HttpContextContract } from 'App/Contracts/Common'
import AuthService from 'App/Services/AuthService'

export default class AuthController {
  private readonly service = new AuthService()

  public login(payload: HttpContextContract): Promise<AuthenticationResponse> {
    return this.service.login(payload)
  }

  public logout(payload: HttpContextContract): Promise<void> {
    return this.service.logout(payload)
  }
}

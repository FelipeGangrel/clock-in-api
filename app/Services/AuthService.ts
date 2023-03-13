import type { AuthenticationResponse } from 'App/Contracts/Auth'
import { HttpContextContract } from 'App/Contracts/Common'
import AuthorizationException from 'App/Exceptions/AuthorizationException'
import User from 'App/Models/User'

export default class AuthService {
  public async login({ request, auth }: HttpContextContract): Promise<AuthenticationResponse> {
    try {
      const { email, password } = request.body()
      const { token, user } = await auth.use('api').attempt(email, password, {
        expiresIn: '1 days',
      })

      if (!user) {
        throw new AuthorizationException('Credenciais de acesso inválidas')
      }

      return this.generateAuthenticationResponse(token, user)
    } catch (error) {
      if (error instanceof AuthorizationException) {
        throw error
      } else {
        throw new AuthorizationException('E-mail e/ou senha incorretos')
      }
    }
  }

  public logout({ auth }: HttpContextContract): Promise<void> {
    return auth.use('api').logout()
  }

  public me({ auth }): AuthenticationResponse['profile'] {
    if (!auth?.user) {
      throw new AuthorizationException('Usuário não autenticado')
    }

    const user: User = auth?.user

    return {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
    }
  }

  private generateAuthenticationResponse(token: string, user: User): AuthenticationResponse {
    return {
      token,
      profile: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
    }
  }
}

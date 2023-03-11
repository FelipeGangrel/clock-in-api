import type { HttpContextContract, PaginatedResponse } from 'App/Contracts/Common'
import UsersService from 'App/Services/UsersService'

export default class UsersController {
  private readonly service = new UsersService()

  public index({ request }: HttpContextContract): Promise<PaginatedResponse> {
    return this.service.findUsers(request.qs())
  }
}

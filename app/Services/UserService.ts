import { ModelQueryBuilderContract } from '@ioc:Adonis/Lucid/Orm'
import { PaginatedResponse } from 'App/Contracts/common'
import { FindUsers } from 'App/Contracts/user'
import User from 'App/Models/User'

export default class UserService {
  public async findUsers(payload: FindUsers): Promise<PaginatedResponse> {
    const { page = 1, limit = 10, direction = 'asc', orderBy = 'firstName', search = '' } = payload

    const query = this.getBaseQuery()

    if (search) {
      query.where('firstName', 'like', `%${search}%`).orWhere('lastName', 'like', `%${search}%`)
    }

    query.orderBy(orderBy, direction)

    const users = await query.paginate(page, limit)

    return users.serialize()
  }

  private getBaseQuery(): ModelQueryBuilderContract<typeof User> {
    return User.query().select('id', 'firstName', 'lastName', 'email', 'role', 'blockedAt')
  }
}

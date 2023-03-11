import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'
import { UserRole } from 'App/Contracts/user'
import { UserFactory } from 'Database/factories/User'

type AdminEntry = Pick<User, 'firstName' | 'lastName' | 'email' | 'role'>

const admins: AdminEntry[] = [
  {
    firstName: 'Suporte',
    lastName: 'Clock In',
    email: 'admin@example.com',
    role: UserRole.ADMIN,
  },
]

export default class UserSeeder extends BaseSeeder {
  public async run() {
    await User.truncate()

    await UserFactory.merge(admins)
      .apply('AdminRole')
      .createMany(admins.length + 4)

    await UserFactory.createMany(10)
  }
}

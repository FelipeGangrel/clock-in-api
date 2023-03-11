import Factory from '@ioc:Adonis/Lucid/Factory'
import User from 'App/Models/User'
import { UserRole } from 'App/Contracts/user'

export const UserFactory = Factory.define(User, async ({ faker }) => {
  const firstName = faker.name.firstName()
  const lastName = faker.name.lastName()
  const email = faker.internet.email(firstName, lastName).toLowerCase()

  return {
    firstName,
    lastName,
    email,
    password: '123456',
  }
})
  .state('AdminRole', (user) => {
    user.role = UserRole.ADMIN
  })
  .build()

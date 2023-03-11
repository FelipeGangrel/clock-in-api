import Route from '@ioc:Adonis/Core/Route'

const c = 'UsersController'

Route.group(() => {
  Route.get('/', `${c}.findUsers`)
})
  .prefix('users')
  .middleware(['auth'])

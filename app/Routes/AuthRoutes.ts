import Route from '@ioc:Adonis/Core/Route'

const c = 'AuthController'

Route.group(() => {
  Route.get('/login', `${c}.login`)
}).prefix('auth')

Route.group(() => {
  Route.get('/logout', `${c}.logout`)
})
  .prefix('auth')
  .middleware(['auth'])

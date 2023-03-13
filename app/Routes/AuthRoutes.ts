import Route from '@ioc:Adonis/Core/Route'

const c = 'AuthController'

Route.group(() => {
  Route.post('/login', `${c}.login`)
}).prefix('auth')

Route.group(() => {
  Route.get('/me', `${c}.me`)
  Route.get('/logout', `${c}.logout`)
})
  .prefix('auth')
  .middleware(['auth'])

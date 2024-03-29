import Route from '@ioc:Adonis/Core/Route'

const c = 'AuthController'

Route.group(() => {
  Route.post('/login', `${c}.login`)
  Route.post('/generate-password-reset-token', `${c}.generatePasswordResetToken`)
  Route.post('/reset-password', `${c}.resetPassword`)
}).prefix('auth')

Route.group(() => {
  Route.get('/me', `${c}.me`)
  Route.get('/logout', `${c}.logout`)
})
  .prefix('auth')
  .middleware(['auth'])

import Route from '@ioc:Adonis/Core/Route'
import 'App/Routes/UserRoutes'
import 'App/Routes/AuthRoutes'
import 'App/Routes/ClockInRoutes'

Route.get('/', async () => {
  return { hello: 'world' }
})

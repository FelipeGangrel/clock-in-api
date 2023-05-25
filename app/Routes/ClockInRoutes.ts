import Route from '@ioc:Adonis/Core/Route'

const c = 'ClockInController'

Route.group(() => {
  Route.get('/', `${c}.findClockIns`)
  Route.post('/on-time', `${c}.registerOnTime`)
  Route.post('/late', `${c}.registerLate`)
})
  .prefix('clock-ins')
  .middleware(['auth'])

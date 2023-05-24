import { HttpContextContract } from 'App/Contracts/Common'
import ClockIn from 'App/Models/ClockIn'
import ClockInService from 'App/Services/ClockInService'
import RegisterLateClockInValidator from 'App/Validators/ClockIn/RegisterLateClockInValidator'
import RegisterOnTimeClockInValidator from 'App/Validators/ClockIn/RegisterOnTimeClockInValidator'

export default class ClockInController {
  private readonly service = new ClockInService()

  public async registerOnTime({ request, auth }: HttpContextContract): Promise<ClockIn> {
    const payload = await request.validate(RegisterOnTimeClockInValidator)
    return this.service.registerOnTime(payload, auth.user!)
  }

  public async registerLate({ request, auth }: HttpContextContract): Promise<ClockIn> {
    const payload = await request.validate(RegisterLateClockInValidator)
    return this.service.registerLate(payload, auth.user!)
  }
}

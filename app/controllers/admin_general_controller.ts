import type { HttpContext } from '@adonisjs/core/http'

export default class AdminGeneralController {

  async overview ({inertia}: HttpContext) {
    return inertia.render('_protected/administrators/overview', {})
  }
}
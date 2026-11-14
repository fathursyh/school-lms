import type { HttpContext } from '@adonisjs/core/http'

export default class TeachersGeneralController {

  async overview ({inertia}: HttpContext) {
    return inertia.render('_protected/teachers/overview', {})
  }
}
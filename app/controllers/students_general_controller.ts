import type { HttpContext } from '@adonisjs/core/http'

export default class StudentsGeneralController {

  async overview ({inertia}: HttpContext) {
    return inertia.render('_protected/students/overview', {})
  }
}
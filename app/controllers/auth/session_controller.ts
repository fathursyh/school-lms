import { FlashEnum } from '#enums/flash_enum'
import User from '#models/user'
import { loginValidator } from '#validators/auth_validator'
import type { HttpContext } from '@adonisjs/core/http'

export default class SessionController {
  async create({ inertia }: HttpContext) {
    return inertia.render('auth/login', {})
  }

  async store({ request, auth, session, response }: HttpContext) {
    const { email, password, rememberMe } = await request.validateUsing(loginValidator)
    const user = await User.verifyCredentials(email, password)

    await auth.use('web').login(user, rememberMe)

    session.flash(FlashEnum.SUCCESS, `Welcome back, ${user.name}!`)
    switch (user.role) {
      case 'ADMIN':
        return response.redirect().toRoute('administrators.overview')
      case 'TEACHER':
        return response.redirect().toRoute('teachers.overview')
      case 'STUDENT':
        return response.redirect().toRoute('students.overview')
    }
  }

  async destroy({ auth, response, session }: HttpContext) {
    await auth.use('web').logout()
    session.flash(FlashEnum.SUCCESS, 'You have been logged out successfully.')
    response.redirect().toRoute('session.create')
  }
}

import { FlashEnum } from '#enums/flash_enum'
import User from '#models/user'
import TeacherTransformer from '#transformers/teacher_transformer'
import { createUserSchema, updateUserSchema } from '#validators/user_validator'
import type { HttpContext } from '@adonisjs/core/http'

export default class AdminTeachersController {
  async index({ inertia }: HttpContext) {
    const teachers = await User.query()
      .where('role', 'TEACHER')
      .preload('homeroomClasses', (classQuery) => {
        classQuery.whereHas('academicYear', (yearQuery) => {
          yearQuery.where('is_active', true)
        })
      })

    return inertia.render('_protected/administrators/teachers/index', {
      teachers: TeacherTransformer.transform(teachers),
    })
  }

  async store({ request, response, session }: HttpContext) {
    const payload = await request.validateUsing(createUserSchema)

    const trashed = await User.onlyTrashed()
      .where((query) => {
        query.where('email', payload.email).orWhere('identifier', payload.identifier)
      })
      .first()

    if (trashed) {
      trashed.merge({
        ...payload,
        role: 'TEACHER',
      })
      await trashed.restore()
      session.flash(FlashEnum.SUCCESS, 'Teacher has been restored.')
      return response.redirect().back()
    }

    await User.create({
      ...payload,
      role: 'TEACHER',
    })

    session.flash(FlashEnum.SUCCESS, 'Teacher has been successfully created.')

    return response.redirect().back()
  }

  async update({ params, request, response, session }: HttpContext) {
    const teacher = await User.query().where('id', params.id).where('role', 'TEACHER').firstOrFail()

    const payload = await request.validateUsing(updateUserSchema)

    teacher.merge({
      identifier: payload.identifier,
      name: payload.name,
      email: payload.email,
      ...(payload.password ? { password: payload.password } : {}),
    })
    await teacher.save()

    session.flash(FlashEnum.SUCCESS, 'Teacher has been successfully updated.')

    return response.redirect().back()
  }

  async destroy({ params, response, session }: HttpContext) {
    const teacher = await User.query().where('id', params.id).where('role', 'TEACHER').firstOrFail()

    await teacher.delete()

    session.flash(FlashEnum.SUCCESS, 'Teacher has been successfully deleted.')

    return response.redirect().back()
  }
}

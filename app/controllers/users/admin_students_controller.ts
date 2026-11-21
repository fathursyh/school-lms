import { FlashEnum } from '#enums/flash_enum'
import User from '#models/user'
import StudentTransformer from '#transformers/student_transformer'
import { createUserSchema, updateUserSchema } from '#validators/user_validator'
import type { HttpContext } from '@adonisjs/core/http'

export default class AdminStudentsController {
  async index({ inertia }: HttpContext) {
    const students = await User.query()
      .where('role', 'STUDENT')
      .preload('enrolledClasses', (classQuery) => {
        classQuery
          .whereHas('academicYear', (yearQuery) => {
            yearQuery.where('is_active', true)
          })
          .preload('homeroomTeacher')
      })

    return inertia.render('_protected/administrators/students/index', {
      students: StudentTransformer.transform(students),
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
        role: 'STUDENT',
      })
      await trashed.restore()
      session.flash(FlashEnum.SUCCESS, 'Student has been restored.')
      return response.redirect().back()
    }

    await User.create({
      ...payload,
      role: 'STUDENT',
    })

    session.flash(FlashEnum.SUCCESS, 'Student has been successfully created.')

    return response.redirect().back()
  }

  async update({ params, request, response, session }: HttpContext) {
    const student = await User.query().where('id', params.id).where('role', 'STUDENT').firstOrFail()

    const payload = await request.validateUsing(updateUserSchema)

    student.merge({
      identifier: payload.identifier,
      name: payload.name,
      email: payload.email,
      ...(payload.password ? { password: payload.password } : {}),
    })
    await student.save()

    session.flash(FlashEnum.SUCCESS, 'Student has been successfully updated.')

    return response.redirect().back()
  }

  async destroy({ params, response, session }: HttpContext) {
    const student = await User.query().where('id', params.id).where('role', 'STUDENT').firstOrFail()

    await student.delete()

    session.flash(FlashEnum.SUCCESS, 'Student has been successfully deleted.')

    return response.redirect().back()
  }
}

import { FlashEnum } from '#enums/flash_enum'
import User from '#models/user'
import UserTransformer from '#transformers/user_transformer'
import { createUserSchema, updateUserSchema } from '#validators/user_validator'
import type { HttpContext } from '@adonisjs/core/http'

export default class AdminAdministratorsController {
  async index({ inertia }: HttpContext) {
    const administrators = await User.query().where('role', 'ADMIN')

    return inertia.render('_protected/administrators/administrators/index', {
      administrators: UserTransformer.transform(administrators),
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
        role: 'ADMIN',
      })
      await trashed.restore()
      session.flash(FlashEnum.SUCCESS, 'Administrator has been restored.')
      return response.redirect().back()
    }

    await User.create({
      ...payload,
      role: 'ADMIN',
    })

    session.flash(FlashEnum.SUCCESS, 'Administrator has been successfully created.')

    return response.redirect().back()
  }

  async update({ params, request, response, session }: HttpContext) {
    const administrator = await User.query()
      .where('id', params.id)
      .where('role', 'ADMIN')
      .firstOrFail()

    const payload = await request.validateUsing(updateUserSchema)

    administrator.merge({
      identifier: payload.identifier,
      name: payload.name,
      email: payload.email,
      ...(payload.password ? { password: payload.password } : {}),
    })
    await administrator.save()

    session.flash(FlashEnum.SUCCESS, 'Administrator has been successfully updated.')

    return response.redirect().back()
  }

  async destroy({ auth, params, response, session }: HttpContext) {
    const administrator = await User.query()
      .where('id', params.id)
      .where('role', 'ADMIN')
      .firstOrFail()

    if (administrator.id === auth.user?.id) {
      session.flash(FlashEnum.ERROR, 'You cannot delete your own account.')
      return response.redirect().back()
    }

    await administrator.delete()

    session.flash(FlashEnum.SUCCESS, 'Administrator has been successfully deleted.')

    return response.redirect().back()
  }
}

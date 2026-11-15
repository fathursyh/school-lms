import { UserRole } from '#database/migrations/1761885935168_create_users_table'
import { FlashEnum } from '#enums/flash_enum'
import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

/**
 * Role middleware checks whether the authenticated user has one of
 * the allowed roles (`ADMIN`, `TEACHER`, or `STUDENT`).
 */
export default class RoleMiddleware {
  async handle(ctx: HttpContext, next: NextFn, allowedRoles: UserRole[]) {
    const user = ctx.auth.user

    const reqAccepts = ctx.request.accepts(['json', 'html'])

    if (!user || !allowedRoles.includes(user.role as UserRole)) {
      if (reqAccepts === 'json') return ctx.response.forbidden('You do not have permission to access this resource.')
      ctx.session.flash(FlashEnum.ERROR, 'You do not have permission to access this resource.')
      return ctx.response.redirect().back()
    }

    return next()
  }
}

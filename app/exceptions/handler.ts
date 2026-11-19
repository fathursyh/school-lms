import app from '@adonisjs/core/services/app'
import { type HttpContext, ExceptionHandler } from '@adonisjs/core/http'
import type { StatusPageRange, StatusPageRenderer } from '@adonisjs/core/types/http'
import { Exception } from '@adonisjs/core/exceptions'
import { FlashEnum } from '#enums/flash_enum'

export default class HttpExceptionHandler extends ExceptionHandler {
  /**
   * In debug mode, the exception handler will display verbose errors
   * with pretty printed stack traces.
   */
  protected debug = !app.inProduction

  /**
   * Status pages are used to display a custom HTML pages for certain error
   * codes. You might want to enable them in production only, but feel
   * free to enable them in development as well.
   */
  protected renderStatusPages = app.inProduction

  /**
   * Status pages is a collection of error code range and a callback
   * to return the HTML contents to send as a response.
   */
  protected statusPages: Record<StatusPageRange, StatusPageRenderer> = {
    '404': (_, { inertia }) => inertia.render('errors/not_found', {}),
    '500..599': (_, { inertia }) => inertia.render('errors/server_error', {}),
  }

  /**
   * The method is used for handling errors and returning
   * response to the client
   */
  async handle(error: unknown, ctx: HttpContext) {
    const exception = error as Exception & { status?: number; code?: string }
    const status = exception.status ?? 500

    if (status === 422 || exception.code === 'E_UNAUTHORIZED_ACCESS') {
      return super.handle(error, ctx)
    }

    if (exception.code === 'ER_DUP_ENTRY' || exception.code === 'SQLITE_CONSTRAINT_UNIQUE') {
      ctx.session?.flash(FlashEnum.ERROR, 'This record already exists.')
      return ctx.response.redirect().back()
    }

    if (
      exception.code === 'ER_ROW_IS_REFERENCED_2' ||
      exception.code === 'SQLITE_CONSTRAINT_FOREIGNKEY'
    ) {
      ctx.session?.flash(
        FlashEnum.ERROR,
        'Cannot delete this record because it is still referenced by other data.'
      )
      return ctx.response.redirect().back()
    }

    if (exception.code === 'E_BAD_CSRF_TOKEN') {
      ctx.session?.flash(FlashEnum.ERROR, 'Session expired. Please refresh and try again.')
      return ctx.response.redirect().back()
    }

    if (ctx.request.method() === 'GET') {
      return super.handle(error, ctx)
    }

    const safeMessage =
      status >= 500 && app.inProduction
        ? 'Something went wrong. Please try again later.'
        : exception.message || 'Request failed.'

    ctx.session?.flash(FlashEnum.ERROR, safeMessage)
    return ctx.response.redirect().back()
  }

  /**
   * The method is used to report error to the logging service or
   * the a third party error monitoring service.
   *
   * @note You should not attempt to send a response from this method.
   */
  async report(error: unknown, ctx: HttpContext) {
    return super.report(error, ctx)
  }
}

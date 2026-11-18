import { FlashEnum } from '#enums/flash_enum'
import Subject from '#models/subject'
import SubjectTransformer from '#transformers/subject_transformer'
import { createSubjectSchema, updateSubjectSchema } from '#validators/subject_validator'
import type { HttpContext } from '@adonisjs/core/http'

export default class AdminSubjectsController {
  /**
   * Display a list of resource
   */
  async index({ inertia }: HttpContext) {
    const subjects = await Subject.all()
    return inertia.render('_protected/administrators/subjects/index', {
      subjects: SubjectTransformer.transform(subjects),
    })
  }

  /**
   * Display form to create a new record
   */
  async create({}: HttpContext) {}

  /**
   * Handle form submission for the create action
   */
  async store({ request, response, session }: HttpContext) {
    const payload = await request.validateUsing(createSubjectSchema)

    const trashed = await Subject.onlyTrashed().where('code', payload.code).first()

    if (trashed) {
      trashed.name = payload.name
      await trashed.restore()
      session.flash(FlashEnum.SUCCESS, 'Subject has been restored.')
      return response.redirect().back()
    }

    await Subject.create(payload)

    session.flash(FlashEnum.SUCCESS, 'Subject has been successfully created.')

    return response.redirect().back()
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {
    console.log(params)
  }

  /**
   * Edit individual record
   */
  async edit({ params }: HttpContext) {
    console.log(params)
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response, session }: HttpContext) {
    const subject = await Subject.findOrFail(params.id)
    const payload = await request.validateUsing(updateSubjectSchema)

    subject.merge({
      name: payload.name,
      code: payload.code,
    })
    await subject.save()

    session.flash(FlashEnum.SUCCESS, 'Subject has been successfully updated.')

    return response.redirect().back()
  }

  /**
   * Delete record
   */
  async destroy({ params, response, session }: HttpContext) {
    const subject = await Subject.findOrFail(params.id)
    await subject.delete()

    session.flash(FlashEnum.SUCCESS, 'Subject has been successfully deleted.')

    return response.redirect().back()
  }
}

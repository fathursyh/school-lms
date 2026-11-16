import { FlashEnum } from '#enums/flash_enum';
import AcademicYear from '#models/academic_year'
import AcademicYearTransformer from '#transformers/academic_year_transformer'
import { createAcademicYearSchema, updateAcademicYearSchema } from '#validators/academic_year_validator';
import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'

export default class AdminAcademicYearsController {
  /**
   * Display a list of resource
   */
  async index({ inertia }: HttpContext) {
    const academicYears = await AcademicYear.all();
    return inertia.render('_protected/administrators/academic_years/index', {
      academicYears: AcademicYearTransformer.transform(academicYears)
    })
  }

  /**
   * Display form to create a new record
   */
  async create({ }: HttpContext) { }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response, session }: HttpContext) {
    const academicYear = await request.validateUsing(createAcademicYearSchema)

    await AcademicYear.create(academicYear)

    session.flash(FlashEnum.SUCCESS, 'Academic year has been successfully created.')

    return response.redirect().back()

  }

  /**
   * Show individual record
   */
  async show({ }: HttpContext) { }

  /**
   * Edit individual record
   */
  async edit({ }: HttpContext) { }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response, session }: HttpContext) {
    const academicYear = await AcademicYear.findOrFail(params.id)
    const payload = await request.validateUsing(updateAcademicYearSchema)

    academicYear.merge({
      year: payload.year,
      semester: payload.semester,
    })
    await academicYear.save()

    session.flash(FlashEnum.SUCCESS, 'Academic year has been successfully updated.')

    return response.redirect().back()
  }

  /**
   * Set an academic year as active and deactivate all others
   */
  async activate({ params, response, session }: HttpContext) {
    const academicYear = await AcademicYear.findOrFail(params.id)

    await db.transaction(async (trx) => {
      await AcademicYear.query({ client: trx }).update({ isActive: false })
      academicYear.useTransaction(trx)
      academicYear.isActive = true
      await academicYear.save()
    })

    session.flash(FlashEnum.SUCCESS, 'Academic year has been set as active.')

    return response.redirect().back()
  }

  /**
   * Delete record
   */
  async destroy({ params, response, session }: HttpContext) {
    const academicYear = await AcademicYear.findOrFail(params.id)
    await academicYear.delete()

    session.flash(FlashEnum.SUCCESS, 'Academic year has been successfully deleted.')

    return response.redirect().back()
  }
}
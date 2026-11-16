import { FlashEnum } from '#enums/flash_enum';
import AcademicYear from '#models/academic_year'
import AcademicYearTransformer from '#transformers/academic_year_transformer'
import { createAcademicYearSchema } from '#validators/academic_year_validator';
import type { HttpContext } from '@adonisjs/core/http'

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
  async store({request, response, session}: HttpContext) {

    const academicYear = await request.validateUsing(createAcademicYearSchema)

    await AcademicYear.create(academicYear)

    session.flash(FlashEnum.SUCCESS, 'Academic year has been successfully created.')
    return response.redirect().back()
  }

  /**
   * Show individual record
   */
  async show({}: HttpContext) { }

  /**
   * Edit individual record
   */
  async edit({}: HttpContext) { }

  /**
   * Handle form submission for the edit action
   */
  async update({}: HttpContext) { }

  /**
   * Delete record
   */
  async destroy({}: HttpContext) { }
}
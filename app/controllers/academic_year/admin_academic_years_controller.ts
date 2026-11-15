import AcademicYear from '#models/academic_year'
import AcademicYearTransformer from '#transformers/academic_year_transformer'
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
  async store({}: HttpContext) { }

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
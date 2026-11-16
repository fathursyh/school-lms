import type { HttpContext } from '@adonisjs/core/http'

export default class AdminExtracurricularsController {
  /**
   * Display a list of resource
   */
  async index({inertia}: HttpContext) {
    return inertia.render('_protected/administrators/extracurriculars/index', {})
  }

  /**
   * Display form to create a new record
   */
  async create({}: HttpContext) {}

  /**
   * Handle form submission for the create action
   */
  async store({ request }: HttpContext) {
    console.log(request)
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
  async update({ params }: HttpContext) {
    console.log(params)
  }

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {
    console.log(params)
  }
}
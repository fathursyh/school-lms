import AcademicYear from '#models/academic_year'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await AcademicYear.updateOrCreateMany(['year', 'semester'], [
      {
        year: 2026,
        semester: 'ODD',
        isActive: true,
      },
      {
        year: 2026,
        semester: 'EVEN',
        isActive: false,
      },
    ])
  }
}

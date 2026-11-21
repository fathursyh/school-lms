import { controllers } from "#generated/controllers";
import router from "@adonisjs/core/services/router";

export default function AdminAcademicYearsRoutes() {
  return router.group(() => {
    router.resource('academic_years', controllers.academicYears.AdminAcademicYears)
    router
      .patch('academic_years/:id/activate', [controllers.academicYears.AdminAcademicYears, 'activate'])
      .as('academic_years.activate')
  })
}
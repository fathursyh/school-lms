import { controllers } from "#generated/controllers";
import router from "@adonisjs/core/services/router";

export default function AdminAcademicYearsRoutes() {
  return router.group(() => {
    router.resource('academic_years', controllers.academicYear.AdminAcademicYears)
  })
}
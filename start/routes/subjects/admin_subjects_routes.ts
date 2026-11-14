import { controllers } from "#generated/controllers";
import router from "@adonisjs/core/services/router";


export default function AdminSubjectsRoutes() {
  return router.group(() => {
    router.resource('subjects', controllers.subjects.AdminSubjects)
  })
}

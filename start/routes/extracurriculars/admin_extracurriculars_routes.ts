import { controllers } from "#generated/controllers";
import router from "@adonisjs/core/services/router";


export default function AdminExtracurricularsRoutes() {
  return router.group(() => {
    router.resource('extracurriculars', controllers.extracurriculars.AdminExtracurriculars)
  })
}

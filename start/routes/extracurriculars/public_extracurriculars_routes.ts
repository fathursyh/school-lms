import { controllers } from "#generated/controllers"
import router from "@adonisjs/core/services/router"

export default function PublicExtracurricularsRoutes() {
  return router.group(() => {
   router.resource('extracurriculars', controllers.extracurricular.PublicExtracurriculars)
   .only(['index'])
  })
}

import { controllers } from "#generated/controllers";
import router from "@adonisjs/core/services/router";

export default function StudentsGeneralRoutes() {
  return router.group(() => {
    router.get('overview', [controllers.StudentsGeneral, 'overview']).as('overview')
  })
}
import { controllers } from "#generated/controllers";
import router from "@adonisjs/core/services/router";

export default function TeachersGeneralRoutes() {
  return router.group(() => {
    router.get('overview', [controllers.TeachersGeneral, 'overview']).as('overview')
  })
}
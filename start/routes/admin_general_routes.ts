import { controllers } from "#generated/controllers";
import router from "@adonisjs/core/services/router";

export default function AdminGeneralRoutes() {
  return router.group(() => {
    router.get('overview', [controllers.AdminGeneral, 'overview']).as('overview')
  })
}
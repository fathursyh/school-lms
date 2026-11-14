import { controllers } from "#generated/controllers"
import { middleware } from "#start/kernel"
import router from "@adonisjs/core/services/router"

export default function AuthRoutes() {
  return router.group(() => {
    router
      .group(() => {
        router.get('signup', [controllers.auth.NewAccount, 'create'])
        router.post('signup', [controllers.auth.NewAccount, 'store'])

        router.get('login', [controllers.auth.Session, 'create'])
        router.post('login', [controllers.auth.Session, 'store'])
      })
      .use(middleware.guest())

    router
      .group(() => {
        router.post('logout', [controllers.auth.Session, 'destroy'])
      })
      .use(middleware.auth())
  })
}
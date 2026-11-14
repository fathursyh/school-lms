import router from '@adonisjs/core/services/router'
import PublicExtracurricularsRoutes from './routes/extracurriculars/public_extracurriculars_routes.ts'
import AuthRoutes from './routes/auth/auth_routes.ts'
import { middleware } from './kernel.ts'
import AdminExtracurricularsRoutes from './routes/extracurriculars/admin_extracurriculars_routes.ts'
import StudentsGeneralRoutes from './routes/students_general_routes.ts'

router.on('/').redirect('session.create').as('home')

AuthRoutes()

router.group(() => {
  PublicExtracurricularsRoutes()
})
.as('public')

router.group(() => {
  StudentsGeneralRoutes()
})
  .prefix('students')
  .as('students')
  .use(middleware.auth())
  .use(middleware.role(['STUDENT']))

router.group(() => {
  AdminExtracurricularsRoutes()
})
  .prefix('administrator')
  .as('administrator')
  .use(middleware.auth())
  .use(middleware.role(['ADMIN']))
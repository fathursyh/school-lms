import router from '@adonisjs/core/services/router'
import PublicExtracurricularsRoutes from './routes/extracurriculars/public_extracurriculars_routes.ts'
import AuthRoutes from './routes/auth/auth_routes.ts'
import { middleware } from './kernel.ts'
import AdminExtracurricularsRoutes from './routes/extracurriculars/admin_extracurriculars_routes.ts'
import StudentsGeneralRoutes from './routes/students_general_routes.ts'
import TeachersGeneralRoutes from './routes/teachers_general_routes.ts'
import AdminGeneralRoutes from './routes/admin_general_routes.ts'
import AdminAcademicYearsRoutes from './routes/academic_year/admin_academic_year_routes.ts'
import AdminSubjectsRoutes from './routes/subjects/admin_subjects_routes.ts'
import AdminUsersRoutes from './routes/users/admin_users_routes.ts'

router.on('/').renderInertia('home', {}).as('home')

// AUTH
AuthRoutes()

// PUBLIC
router.group(() => {
  PublicExtracurricularsRoutes()
})
  .as('public')

// STUDENTS
router.group(() => {
  StudentsGeneralRoutes()
})
  .prefix('students')
  .as('students')
  .use(middleware.auth())
  .use(middleware.role(['STUDENT']))

// TEACHER
router.group(() => {
  TeachersGeneralRoutes()
})
  .prefix('teachers')
  .as('teachers')
  .use(middleware.auth())
  .use(middleware.role(['TEACHER']))

// ADMIN
router.group(() => {
  AdminGeneralRoutes()
  AdminUsersRoutes()
  AdminAcademicYearsRoutes()
  AdminSubjectsRoutes()
  AdminExtracurricularsRoutes()
})
  .prefix('administrators')
  .as('administrators')
  .use(middleware.auth())
  .use(middleware.role(['ADMIN']))
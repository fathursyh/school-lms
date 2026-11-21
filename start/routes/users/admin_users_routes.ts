import { controllers } from '#generated/controllers'
import router from '@adonisjs/core/services/router'

export default function AdminUsersRoutes() {
  return router.group(() => {
    router
      .resource('students', controllers.users.AdminStudents)
      .only(['index', 'store', 'update', 'destroy'])
    router
      .resource('teachers', controllers.users.AdminTeachers)
      .only(['index', 'store', 'update', 'destroy'])
    router
      .resource('administrators', controllers.users.AdminAdministrators)
      .only(['index', 'store', 'update', 'destroy'])
  })
}

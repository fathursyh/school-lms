import type User from '#models/user'
import { BaseTransformer } from '@adonisjs/core/transformers'

export default class StudentTransformer extends BaseTransformer<User> {
  toObject() {
    const activeClass = this.resource.enrolledClasses?.[0] ?? null

    return {
      ...this.pick(this.resource, [
        'id',
        'identifier',
        'name',
        'email',
        'createdAt',
        'updatedAt',
        'initials',
      ]),
      currentClass: activeClass
        ? {
            id: activeClass.id,
            name: activeClass.name,
            grade: activeClass.grade,
            homeroomTeacher: activeClass.homeroomTeacher
              ? {
                  id: activeClass.homeroomTeacher.id,
                  name: activeClass.homeroomTeacher.name,
                }
              : null,
          }
        : null,
    }
  }
}

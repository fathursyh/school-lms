import type User from '#models/user'
import { BaseTransformer } from '@adonisjs/core/transformers'

export default class TeacherTransformer extends BaseTransformer<User> {
  toObject() {
    const homeroomClass = this.resource.homeroomClasses?.[0] ?? null

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
      homeroomClass: homeroomClass
        ? {
            id: homeroomClass.id,
            name: homeroomClass.name,
            grade: homeroomClass.grade,
          }
        : null,
    }
  }
}

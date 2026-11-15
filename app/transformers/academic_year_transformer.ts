import { BaseTransformer } from '@adonisjs/core/transformers'
import AcademicYear from '#models/academic_year'

export default class AcademicYearTransformer extends BaseTransformer<AcademicYear> {
  toObject() {
    return this.pick(this.resource, [
      'id',
      'year',
      'semester',
      'isActive',
      'createdAt',
      'updatedAt'
    ])
  }
}
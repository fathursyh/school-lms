import { AcademicYearSchema } from '#database/schema'
import { compose } from '@adonisjs/core/helpers'
import { beforeCreate } from '@adonisjs/lucid/orm'
import { ulid } from 'ulid'
import { SoftDeletes } from '@codenameryuu/adonis-lucid-soft-deletes'

export default class AcademicYear extends compose(AcademicYearSchema, SoftDeletes) {
  static selfAssignPrimaryKey = true

  @beforeCreate()
  static assignUlid(model: AcademicYear) {
    if (!model.id) {
      model.id = ulid()
    }
  }
}
import { SubjectSchema } from '#database/schema'
import { compose } from '@adonisjs/core/helpers'
import { beforeCreate } from '@adonisjs/lucid/orm'
import { SoftDeletes } from '@codenameryuu/adonis-lucid-soft-deletes'
import { ulid } from 'ulid'

export default class Subject extends compose(SubjectSchema, SoftDeletes) {
  static selfAssignPrimaryKey = true

  @beforeCreate()
  static assignUlid(model: Subject) {
    if (!model.id) {
      model.id = ulid()
    }
  }
}

import { AcademicYearSchema } from '#database/schema'
import { beforeCreate } from '@adonisjs/lucid/orm'
import { ulid } from 'ulid'

export default class AcademicYear extends AcademicYearSchema {
  static selfAssignPrimaryKey = true



  @beforeCreate()
  static assignUlid(model: AcademicYear) {
    if (!model.id) {
      model.id = ulid()
    }
  }
}
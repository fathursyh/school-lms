import { ClassSchema } from '#database/schema'
import AcademicYear from '#models/academic_year'
import User from '#models/user'
import { compose } from '@adonisjs/core/helpers'
import { beforeCreate, belongsTo, manyToMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, ManyToMany } from '@adonisjs/lucid/types/relations'
import { SoftDeletes } from '@codenameryuu/adonis-lucid-soft-deletes'
import { ulid } from 'ulid'

export default class SchoolClass extends compose(ClassSchema, SoftDeletes) {
  static table = 'classes'
  static selfAssignPrimaryKey = true

  @belongsTo(() => AcademicYear)
  declare academicYear: BelongsTo<typeof AcademicYear>

  @belongsTo(() => User, { foreignKey: 'homeroomTeacherId' })
  declare homeroomTeacher: BelongsTo<typeof User>

  @manyToMany(() => User, {
    pivotTable: 'class_students',
    pivotForeignKey: 'class_id',
    pivotRelatedForeignKey: 'student_id',
  })
  declare students: ManyToMany<typeof User>

  @beforeCreate()
  static assignUlid(model: SchoolClass) {
    if (!model.id) {
      model.id = ulid()
    }
  }
}

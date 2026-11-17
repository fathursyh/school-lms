import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tables = [
    'users',
    'academic_years',
    'subjects',
    'classes',
    'class_subjects',
    'assignments',
    'attendance_sessions',
  ]

  async up() {
    for (const tableName of this.tables) {
      this.schema.alterTable(tableName, (table) => {
        table.timestamp('deleted_at').nullable()
      })
    }
  }

  async down() {
    for (const tableName of this.tables) {
      this.schema.alterTable(tableName, (table) => {
        table.dropColumn('deleted_at')
      })
    }
  }
}

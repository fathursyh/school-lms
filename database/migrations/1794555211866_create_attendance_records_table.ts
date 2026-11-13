import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'attendance_records'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id', 26).primary().notNullable()
      table
        .string('attendance_session_id', 26)
        .notNullable()
        .references('id')
        .inTable('attendance_sessions')
        .onDelete('CASCADE')
      table
        .string('student_id', 26)
        .notNullable()
        .references('id')
        .inTable('users')
        .onDelete('RESTRICT')
      table.enum('status', ['PRESENT', 'SICK', 'PERMIT', 'ABSENT']).notNullable()
      table.text('notes').nullable()

      table.unique(['attendance_session_id', 'student_id'])

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}

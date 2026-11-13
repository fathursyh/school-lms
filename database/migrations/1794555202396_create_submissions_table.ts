import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'submissions'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id', 26).primary().notNullable()
      table
        .string('assignment_id', 26)
        .notNullable()
        .references('id')
        .inTable('assignments')
        .onDelete('CASCADE')
      table
        .string('student_id', 26)
        .notNullable()
        .references('id')
        .inTable('users')
        .onDelete('RESTRICT')
      table.string('file_url').nullable()
      table.text('notes').nullable()
      table.decimal('score', 5, 2).nullable()
      table.text('feedback').nullable()
      table.dateTime('graded_at').nullable()

      table.unique(['assignment_id', 'student_id'])

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}

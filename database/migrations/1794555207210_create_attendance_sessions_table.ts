import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'attendance_sessions'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id', 26).primary().notNullable()
      table
        .string('class_subject_id', 26)
        .notNullable()
        .references('id')
        .inTable('class_subjects')
        .onDelete('CASCADE')
      table.integer('meeting_number').notNullable()
      table.string('title').nullable()
      table.date('date').notNullable()
      table.timestamp('open_at').nullable()
      table.timestamp('closed_at').nullable()

      table.unique(['class_subject_id', 'meeting_number'])

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}

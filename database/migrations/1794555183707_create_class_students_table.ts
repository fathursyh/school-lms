import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'class_students'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id', 26).primary().notNullable()
      table
        .string('class_id', 26)
        .notNullable()
        .references('id')
        .inTable('classes')
        .onDelete('CASCADE')
      table
        .string('student_id', 26)
        .notNullable()
        .references('id')
        .inTable('users')
        .onDelete('RESTRICT')

      table.unique(['class_id', 'student_id'])

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}

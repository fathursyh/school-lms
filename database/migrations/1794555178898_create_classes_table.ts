import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'classes'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id', 26).primary().notNullable()
      table
        .string('academic_year_id', 26)
        .notNullable()
        .references('id')
        .inTable('academic_years')
        .onDelete('RESTRICT')
      table.string('name').notNullable()
      table.integer('grade').notNullable()
      table
        .string('homeroom_teacher_id', 26)
        .nullable()
        .references('id')
        .inTable('users')
        .onDelete('SET NULL')

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}

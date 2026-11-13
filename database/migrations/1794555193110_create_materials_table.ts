import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'materials'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id', 26).primary().notNullable()
      table
        .string('class_subject_id', 26)
        .notNullable()
        .references('id')
        .inTable('class_subjects')
        .onDelete('CASCADE')
      table.string('title').notNullable()
      table.text('description').nullable()
      table.string('file_path').nullable()

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}

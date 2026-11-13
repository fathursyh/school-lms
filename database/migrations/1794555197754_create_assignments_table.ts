import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'assignments'

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
      table.text('instructions').nullable()
      table.integer('passing_score').notNullable().defaultTo(65)
      table.dateTime('due_at').nullable()

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}

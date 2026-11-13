import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'academic_years'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id', 26).primary().notNullable()
      table.integer('year').notNullable()
      table.enum('semester', ['EVEN', 'ODD']).notNullable()
      table.boolean('is_active').notNullable().defaultTo(false)

      table.unique(['year', 'semester'])

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}

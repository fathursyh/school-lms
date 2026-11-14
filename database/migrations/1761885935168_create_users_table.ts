import { BaseSchema } from '@adonisjs/lucid/schema'

const userRole = ['ADMIN', 'TEACHER', 'STUDENT'] as const;
export type UserRole = typeof userRole[number]

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id', 26).primary().notNullable()
      table.string('identifier').notNullable().unique()
      table.string('email', 254).notNullable().unique()
      table.string('name').notNullable()
      table.string('password').notNullable()
      table.enum('role', userRole).defaultTo('STUDENT' satisfies UserRole)
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}

import { UserSchema } from '#database/schema'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { DbRememberMeTokensProvider } from '@adonisjs/auth/session'
import { beforeCreate, column } from '@adonisjs/lucid/orm'
import { ulid } from 'ulid'
import type { UserRole } from '#database/migrations/1761885935168_create_users_table'

export default class User extends compose(UserSchema, withAuthFinder(hash)) {
  static selfAssignPrimaryKey = true
  static rememberMeTokens = DbRememberMeTokensProvider.forModel(User)

  @column()
  declare role: UserRole

  get initials() {
    const [first, last] = this.name ? this.name.split(' ') : this.email.split('@')
    if (first && last) {
      return `${first.charAt(0)}${last.charAt(0)}`.toUpperCase()
    }
    return `${first.slice(0, 2)}`.toUpperCase()
  }

  @beforeCreate()
  static assignUlid(model: User) {
    if (!model.id) {
      model.id = ulid()
    }
  }
}

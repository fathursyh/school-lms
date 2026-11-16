import User from '#models/user'
import env from '#start/env'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    const ADMIN = {
      identifier: 'ADMIN-001-START',
      email: env.get('ROOT_EMAIL'),
      name: 'Administrator',
      role: 'ADMIN' as User['role'],
      password: env.get('ROOT_PASSWORD'),
    }

    const TEACHER = {
      identifier: 'teacher-123',
      email: 'teacher@gmail.com',
      name: 'Teacher Example',
      role: 'TEACHER' as User['role'],
      password: 'password',
    }

    const STUDENT = {
      identifier: 'student-123',
      email: 'student@gmail.com',
      name: 'Student Example',
      role: 'STUDENT' as User['role'],
      password: 'password',
    }

    await User.createMany([
      ADMIN,
      TEACHER,
      STUDENT,
    ])
  }
}
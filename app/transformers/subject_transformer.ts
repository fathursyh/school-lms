import { BaseTransformer } from '@adonisjs/core/transformers'
import type Subject from '#models/subject'

export default class SubjectTransformer extends BaseTransformer<Subject> {
  toObject() {
    return this.pick(this.resource, ['id', 'name', 'code', 'createdAt', 'updatedAt'])
  }
}

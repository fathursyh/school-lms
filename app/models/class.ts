import { ClassSchema } from '#database/schema'
import { compose } from '@adonisjs/core/helpers';
import { SoftDeletes } from '@codenameryuu/adonis-lucid-soft-deletes';

export default class Class extends compose(ClassSchema, SoftDeletes) {
}
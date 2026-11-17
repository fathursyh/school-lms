import { AssignmentSchema } from '#database/schema'
import { compose } from '@adonisjs/core/helpers';
import { SoftDeletes } from '@codenameryuu/adonis-lucid-soft-deletes';

export default class Assignment extends compose(AssignmentSchema, SoftDeletes) {
}
/* eslint-disable prettier/prettier */
import type { AdonisEndpoint } from '@tuyau/core/types'
import type { Registry } from './schema.d.ts'
import type { ApiDefinition } from './tree.d.ts'

export type { Route, Path } from './schema.d.ts'

const placeholder: any = {}

const routes = {
  'home': {
    methods: ["GET","HEAD"],
    pattern: '/',
    tokens: [[0,"/"]],
    types: placeholder as Registry['home']['types'],
  },
  'new_account.create': {
    methods: ["GET","HEAD"],
    pattern: '/signup',
    tokens: [[0,"signup"]],
    types: placeholder as Registry['new_account.create']['types'],
  },
  'new_account.store': {
    methods: ["POST"],
    pattern: '/signup',
    tokens: [[0,"signup"]],
    types: placeholder as Registry['new_account.store']['types'],
  },
  'session.create': {
    methods: ["GET","HEAD"],
    pattern: '/login',
    tokens: [[0,"login"]],
    types: placeholder as Registry['session.create']['types'],
  },
  'session.store': {
    methods: ["POST"],
    pattern: '/login',
    tokens: [[0,"login"]],
    types: placeholder as Registry['session.store']['types'],
  },
  'session.destroy': {
    methods: ["POST"],
    pattern: '/logout',
    tokens: [[0,"logout"]],
    types: placeholder as Registry['session.destroy']['types'],
  },
  'public.extracurriculars.index': {
    methods: ["GET","HEAD"],
    pattern: '/extracurriculars',
    tokens: [[0,"extracurriculars"]],
    types: placeholder as Registry['public.extracurriculars.index']['types'],
  },
  'students.overview': {
    methods: ["GET","HEAD"],
    pattern: '/students/overview',
    tokens: [[0,"students"],[0,"overview"]],
    types: placeholder as Registry['students.overview']['types'],
  },
  'teachers.overview': {
    methods: ["GET","HEAD"],
    pattern: '/teachers/overview',
    tokens: [[0,"teachers"],[0,"overview"]],
    types: placeholder as Registry['teachers.overview']['types'],
  },
  'administrators.overview': {
    methods: ["GET","HEAD"],
    pattern: '/administrators/overview',
    tokens: [[0,"administrators"],[0,"overview"]],
    types: placeholder as Registry['administrators.overview']['types'],
  },
  'administrators.academic_years.index': {
    methods: ["GET","HEAD"],
    pattern: '/administrators/academic_years',
    tokens: [[0,"administrators"],[0,"academic_years"]],
    types: placeholder as Registry['administrators.academic_years.index']['types'],
  },
  'administrators.academic_years.create': {
    methods: ["GET","HEAD"],
    pattern: '/administrators/academic_years/create',
    tokens: [[0,"administrators"],[0,"academic_years"],[0,"create"]],
    types: placeholder as Registry['administrators.academic_years.create']['types'],
  },
  'administrators.academic_years.store': {
    methods: ["POST"],
    pattern: '/administrators/academic_years',
    tokens: [[0,"administrators"],[0,"academic_years"]],
    types: placeholder as Registry['administrators.academic_years.store']['types'],
  },
  'administrators.academic_years.show': {
    methods: ["GET","HEAD"],
    pattern: '/administrators/academic_years/:id',
    tokens: [[0,"administrators"],[0,"academic_years"],[1,"id"]],
    types: placeholder as Registry['administrators.academic_years.show']['types'],
  },
  'administrators.academic_years.edit': {
    methods: ["GET","HEAD"],
    pattern: '/administrators/academic_years/:id/edit',
    tokens: [[0,"administrators"],[0,"academic_years"],[1,"id"],[0,"edit"]],
    types: placeholder as Registry['administrators.academic_years.edit']['types'],
  },
  'administrators.academic_years.update': {
    methods: ["PUT","PATCH"],
    pattern: '/administrators/academic_years/:id',
    tokens: [[0,"administrators"],[0,"academic_years"],[1,"id"]],
    types: placeholder as Registry['administrators.academic_years.update']['types'],
  },
  'administrators.academic_years.destroy': {
    methods: ["DELETE"],
    pattern: '/administrators/academic_years/:id',
    tokens: [[0,"administrators"],[0,"academic_years"],[1,"id"]],
    types: placeholder as Registry['administrators.academic_years.destroy']['types'],
  },
  'administrators.subjects.index': {
    methods: ["GET","HEAD"],
    pattern: '/administrators/subjects',
    tokens: [[0,"administrators"],[0,"subjects"]],
    types: placeholder as Registry['administrators.subjects.index']['types'],
  },
  'administrators.subjects.create': {
    methods: ["GET","HEAD"],
    pattern: '/administrators/subjects/create',
    tokens: [[0,"administrators"],[0,"subjects"],[0,"create"]],
    types: placeholder as Registry['administrators.subjects.create']['types'],
  },
  'administrators.subjects.store': {
    methods: ["POST"],
    pattern: '/administrators/subjects',
    tokens: [[0,"administrators"],[0,"subjects"]],
    types: placeholder as Registry['administrators.subjects.store']['types'],
  },
  'administrators.subjects.show': {
    methods: ["GET","HEAD"],
    pattern: '/administrators/subjects/:id',
    tokens: [[0,"administrators"],[0,"subjects"],[1,"id"]],
    types: placeholder as Registry['administrators.subjects.show']['types'],
  },
  'administrators.subjects.edit': {
    methods: ["GET","HEAD"],
    pattern: '/administrators/subjects/:id/edit',
    tokens: [[0,"administrators"],[0,"subjects"],[1,"id"],[0,"edit"]],
    types: placeholder as Registry['administrators.subjects.edit']['types'],
  },
  'administrators.subjects.update': {
    methods: ["PUT","PATCH"],
    pattern: '/administrators/subjects/:id',
    tokens: [[0,"administrators"],[0,"subjects"],[1,"id"]],
    types: placeholder as Registry['administrators.subjects.update']['types'],
  },
  'administrators.subjects.destroy': {
    methods: ["DELETE"],
    pattern: '/administrators/subjects/:id',
    tokens: [[0,"administrators"],[0,"subjects"],[1,"id"]],
    types: placeholder as Registry['administrators.subjects.destroy']['types'],
  },
  'administrators.extracurriculars.index': {
    methods: ["GET","HEAD"],
    pattern: '/administrators/extracurriculars',
    tokens: [[0,"administrators"],[0,"extracurriculars"]],
    types: placeholder as Registry['administrators.extracurriculars.index']['types'],
  },
  'administrators.extracurriculars.create': {
    methods: ["GET","HEAD"],
    pattern: '/administrators/extracurriculars/create',
    tokens: [[0,"administrators"],[0,"extracurriculars"],[0,"create"]],
    types: placeholder as Registry['administrators.extracurriculars.create']['types'],
  },
  'administrators.extracurriculars.store': {
    methods: ["POST"],
    pattern: '/administrators/extracurriculars',
    tokens: [[0,"administrators"],[0,"extracurriculars"]],
    types: placeholder as Registry['administrators.extracurriculars.store']['types'],
  },
  'administrators.extracurriculars.show': {
    methods: ["GET","HEAD"],
    pattern: '/administrators/extracurriculars/:id',
    tokens: [[0,"administrators"],[0,"extracurriculars"],[1,"id"]],
    types: placeholder as Registry['administrators.extracurriculars.show']['types'],
  },
  'administrators.extracurriculars.edit': {
    methods: ["GET","HEAD"],
    pattern: '/administrators/extracurriculars/:id/edit',
    tokens: [[0,"administrators"],[0,"extracurriculars"],[1,"id"],[0,"edit"]],
    types: placeholder as Registry['administrators.extracurriculars.edit']['types'],
  },
  'administrators.extracurriculars.update': {
    methods: ["PUT","PATCH"],
    pattern: '/administrators/extracurriculars/:id',
    tokens: [[0,"administrators"],[0,"extracurriculars"],[1,"id"]],
    types: placeholder as Registry['administrators.extracurriculars.update']['types'],
  },
  'administrators.extracurriculars.destroy': {
    methods: ["DELETE"],
    pattern: '/administrators/extracurriculars/:id',
    tokens: [[0,"administrators"],[0,"extracurriculars"],[1,"id"]],
    types: placeholder as Registry['administrators.extracurriculars.destroy']['types'],
  },
} as const satisfies Record<string, AdonisEndpoint>

export { routes }

export const registry = {
  routes,
  $tree: {} as ApiDefinition,
}

declare module '@tuyau/core/types' {
  export interface UserRegistry {
    routes: typeof routes
    $tree: ApiDefinition
  }
}

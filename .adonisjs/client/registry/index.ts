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
  'administrator.extracurriculars.index': {
    methods: ["GET","HEAD"],
    pattern: '/administrator/extracurriculars',
    tokens: [[0,"administrator"],[0,"extracurriculars"]],
    types: placeholder as Registry['administrator.extracurriculars.index']['types'],
  },
  'administrator.extracurriculars.create': {
    methods: ["GET","HEAD"],
    pattern: '/administrator/extracurriculars/create',
    tokens: [[0,"administrator"],[0,"extracurriculars"],[0,"create"]],
    types: placeholder as Registry['administrator.extracurriculars.create']['types'],
  },
  'administrator.extracurriculars.store': {
    methods: ["POST"],
    pattern: '/administrator/extracurriculars',
    tokens: [[0,"administrator"],[0,"extracurriculars"]],
    types: placeholder as Registry['administrator.extracurriculars.store']['types'],
  },
  'administrator.extracurriculars.show': {
    methods: ["GET","HEAD"],
    pattern: '/administrator/extracurriculars/:id',
    tokens: [[0,"administrator"],[0,"extracurriculars"],[1,"id"]],
    types: placeholder as Registry['administrator.extracurriculars.show']['types'],
  },
  'administrator.extracurriculars.edit': {
    methods: ["GET","HEAD"],
    pattern: '/administrator/extracurriculars/:id/edit',
    tokens: [[0,"administrator"],[0,"extracurriculars"],[1,"id"],[0,"edit"]],
    types: placeholder as Registry['administrator.extracurriculars.edit']['types'],
  },
  'administrator.extracurriculars.update': {
    methods: ["PUT","PATCH"],
    pattern: '/administrator/extracurriculars/:id',
    tokens: [[0,"administrator"],[0,"extracurriculars"],[1,"id"]],
    types: placeholder as Registry['administrator.extracurriculars.update']['types'],
  },
  'administrator.extracurriculars.destroy': {
    methods: ["DELETE"],
    pattern: '/administrator/extracurriculars/:id',
    tokens: [[0,"administrator"],[0,"extracurriculars"],[1,"id"]],
    types: placeholder as Registry['administrator.extracurriculars.destroy']['types'],
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

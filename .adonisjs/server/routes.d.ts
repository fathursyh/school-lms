import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'home': { paramsTuple?: []; params?: {} }
    'new_account.create': { paramsTuple?: []; params?: {} }
    'new_account.store': { paramsTuple?: []; params?: {} }
    'session.create': { paramsTuple?: []; params?: {} }
    'session.store': { paramsTuple?: []; params?: {} }
    'session.destroy': { paramsTuple?: []; params?: {} }
    'public.extracurriculars.index': { paramsTuple?: []; params?: {} }
    'students.overview': { paramsTuple?: []; params?: {} }
    'administrator.extracurriculars.index': { paramsTuple?: []; params?: {} }
    'administrator.extracurriculars.create': { paramsTuple?: []; params?: {} }
    'administrator.extracurriculars.store': { paramsTuple?: []; params?: {} }
    'administrator.extracurriculars.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'administrator.extracurriculars.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'administrator.extracurriculars.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'administrator.extracurriculars.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  GET: {
    'home': { paramsTuple?: []; params?: {} }
    'new_account.create': { paramsTuple?: []; params?: {} }
    'session.create': { paramsTuple?: []; params?: {} }
    'public.extracurriculars.index': { paramsTuple?: []; params?: {} }
    'students.overview': { paramsTuple?: []; params?: {} }
    'administrator.extracurriculars.index': { paramsTuple?: []; params?: {} }
    'administrator.extracurriculars.create': { paramsTuple?: []; params?: {} }
    'administrator.extracurriculars.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'administrator.extracurriculars.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  HEAD: {
    'home': { paramsTuple?: []; params?: {} }
    'new_account.create': { paramsTuple?: []; params?: {} }
    'session.create': { paramsTuple?: []; params?: {} }
    'public.extracurriculars.index': { paramsTuple?: []; params?: {} }
    'students.overview': { paramsTuple?: []; params?: {} }
    'administrator.extracurriculars.index': { paramsTuple?: []; params?: {} }
    'administrator.extracurriculars.create': { paramsTuple?: []; params?: {} }
    'administrator.extracurriculars.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'administrator.extracurriculars.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  POST: {
    'new_account.store': { paramsTuple?: []; params?: {} }
    'session.store': { paramsTuple?: []; params?: {} }
    'session.destroy': { paramsTuple?: []; params?: {} }
    'administrator.extracurriculars.store': { paramsTuple?: []; params?: {} }
  }
  PUT: {
    'administrator.extracurriculars.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  PATCH: {
    'administrator.extracurriculars.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  DELETE: {
    'administrator.extracurriculars.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}
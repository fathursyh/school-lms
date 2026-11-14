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
    'teachers.overview': { paramsTuple?: []; params?: {} }
    'administrators.overview': { paramsTuple?: []; params?: {} }
    'administrators.academic_years.index': { paramsTuple?: []; params?: {} }
    'administrators.academic_years.create': { paramsTuple?: []; params?: {} }
    'administrators.academic_years.store': { paramsTuple?: []; params?: {} }
    'administrators.academic_years.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'administrators.academic_years.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'administrators.academic_years.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'administrators.academic_years.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'administrators.subjects.index': { paramsTuple?: []; params?: {} }
    'administrators.subjects.create': { paramsTuple?: []; params?: {} }
    'administrators.subjects.store': { paramsTuple?: []; params?: {} }
    'administrators.subjects.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'administrators.subjects.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'administrators.subjects.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'administrators.subjects.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'administrators.extracurriculars.index': { paramsTuple?: []; params?: {} }
    'administrators.extracurriculars.create': { paramsTuple?: []; params?: {} }
    'administrators.extracurriculars.store': { paramsTuple?: []; params?: {} }
    'administrators.extracurriculars.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'administrators.extracurriculars.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'administrators.extracurriculars.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'administrators.extracurriculars.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  GET: {
    'home': { paramsTuple?: []; params?: {} }
    'new_account.create': { paramsTuple?: []; params?: {} }
    'session.create': { paramsTuple?: []; params?: {} }
    'public.extracurriculars.index': { paramsTuple?: []; params?: {} }
    'students.overview': { paramsTuple?: []; params?: {} }
    'teachers.overview': { paramsTuple?: []; params?: {} }
    'administrators.overview': { paramsTuple?: []; params?: {} }
    'administrators.academic_years.index': { paramsTuple?: []; params?: {} }
    'administrators.academic_years.create': { paramsTuple?: []; params?: {} }
    'administrators.academic_years.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'administrators.academic_years.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'administrators.subjects.index': { paramsTuple?: []; params?: {} }
    'administrators.subjects.create': { paramsTuple?: []; params?: {} }
    'administrators.subjects.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'administrators.subjects.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'administrators.extracurriculars.index': { paramsTuple?: []; params?: {} }
    'administrators.extracurriculars.create': { paramsTuple?: []; params?: {} }
    'administrators.extracurriculars.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'administrators.extracurriculars.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  HEAD: {
    'home': { paramsTuple?: []; params?: {} }
    'new_account.create': { paramsTuple?: []; params?: {} }
    'session.create': { paramsTuple?: []; params?: {} }
    'public.extracurriculars.index': { paramsTuple?: []; params?: {} }
    'students.overview': { paramsTuple?: []; params?: {} }
    'teachers.overview': { paramsTuple?: []; params?: {} }
    'administrators.overview': { paramsTuple?: []; params?: {} }
    'administrators.academic_years.index': { paramsTuple?: []; params?: {} }
    'administrators.academic_years.create': { paramsTuple?: []; params?: {} }
    'administrators.academic_years.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'administrators.academic_years.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'administrators.subjects.index': { paramsTuple?: []; params?: {} }
    'administrators.subjects.create': { paramsTuple?: []; params?: {} }
    'administrators.subjects.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'administrators.subjects.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'administrators.extracurriculars.index': { paramsTuple?: []; params?: {} }
    'administrators.extracurriculars.create': { paramsTuple?: []; params?: {} }
    'administrators.extracurriculars.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'administrators.extracurriculars.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  POST: {
    'new_account.store': { paramsTuple?: []; params?: {} }
    'session.store': { paramsTuple?: []; params?: {} }
    'session.destroy': { paramsTuple?: []; params?: {} }
    'administrators.academic_years.store': { paramsTuple?: []; params?: {} }
    'administrators.subjects.store': { paramsTuple?: []; params?: {} }
    'administrators.extracurriculars.store': { paramsTuple?: []; params?: {} }
  }
  PUT: {
    'administrators.academic_years.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'administrators.subjects.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'administrators.extracurriculars.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  PATCH: {
    'administrators.academic_years.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'administrators.subjects.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'administrators.extracurriculars.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  DELETE: {
    'administrators.academic_years.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'administrators.subjects.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'administrators.extracurriculars.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}
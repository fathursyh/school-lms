/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  home: typeof routes['home']
  newAccount: {
    create: typeof routes['new_account.create']
    store: typeof routes['new_account.store']
  }
  session: {
    create: typeof routes['session.create']
    store: typeof routes['session.store']
    destroy: typeof routes['session.destroy']
  }
  public: {
    extracurriculars: {
      index: typeof routes['public.extracurriculars.index']
    }
  }
  students: {
    overview: typeof routes['students.overview']
  }
  teachers: {
    overview: typeof routes['teachers.overview']
  }
  administrators: {
    overview: typeof routes['administrators.overview']
    academicYears: {
      index: typeof routes['administrators.academic_years.index']
      create: typeof routes['administrators.academic_years.create']
      store: typeof routes['administrators.academic_years.store']
      show: typeof routes['administrators.academic_years.show']
      edit: typeof routes['administrators.academic_years.edit']
      update: typeof routes['administrators.academic_years.update']
      destroy: typeof routes['administrators.academic_years.destroy']
    }
    subjects: {
      index: typeof routes['administrators.subjects.index']
      create: typeof routes['administrators.subjects.create']
      store: typeof routes['administrators.subjects.store']
      show: typeof routes['administrators.subjects.show']
      edit: typeof routes['administrators.subjects.edit']
      update: typeof routes['administrators.subjects.update']
      destroy: typeof routes['administrators.subjects.destroy']
    }
    extracurriculars: {
      index: typeof routes['administrators.extracurriculars.index']
      create: typeof routes['administrators.extracurriculars.create']
      store: typeof routes['administrators.extracurriculars.store']
      show: typeof routes['administrators.extracurriculars.show']
      edit: typeof routes['administrators.extracurriculars.edit']
      update: typeof routes['administrators.extracurriculars.update']
      destroy: typeof routes['administrators.extracurriculars.destroy']
    }
  }
}

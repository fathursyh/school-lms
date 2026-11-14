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
  administrator: {
    extracurriculars: {
      index: typeof routes['administrator.extracurriculars.index']
      create: typeof routes['administrator.extracurriculars.create']
      store: typeof routes['administrator.extracurriculars.store']
      show: typeof routes['administrator.extracurriculars.show']
      edit: typeof routes['administrator.extracurriculars.edit']
      update: typeof routes['administrator.extracurriculars.update']
      destroy: typeof routes['administrator.extracurriculars.destroy']
    }
  }
}

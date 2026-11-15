import '@adonisjs/inertia/types'

import type React from 'react'
import type { Prettify } from '@adonisjs/core/types/common'

type ExtractProps<T> =
  T extends React.FC<infer Props>
    ? Prettify<Omit<Props, 'children'>>
    : T extends React.Component<infer Props>
      ? Prettify<Omit<Props, 'children'>>
      : never

declare module '@adonisjs/inertia/types' {
  export interface InertiaPages {
    '_protected/administrators/academic_years/index': ExtractProps<(typeof import('../../inertia/pages/_protected/administrators/academic_years/index.tsx'))['default']>
    '_protected/administrators/extracurriculars/index': ExtractProps<(typeof import('../../inertia/pages/_protected/administrators/extracurriculars/index.tsx'))['default']>
    '_protected/administrators/overview': ExtractProps<(typeof import('../../inertia/pages/_protected/administrators/overview.tsx'))['default']>
    '_protected/administrators/subjects/index': ExtractProps<(typeof import('../../inertia/pages/_protected/administrators/subjects/index.tsx'))['default']>
    '_protected/students/overview': ExtractProps<(typeof import('../../inertia/pages/_protected/students/overview.tsx'))['default']>
    '_protected/teachers/overview': ExtractProps<(typeof import('../../inertia/pages/_protected/teachers/overview.tsx'))['default']>
    'auth/login': ExtractProps<(typeof import('../../inertia/pages/auth/login.tsx'))['default']>
    'auth/signup': ExtractProps<(typeof import('../../inertia/pages/auth/signup.tsx'))['default']>
    'errors/not_found': ExtractProps<(typeof import('../../inertia/pages/errors/not_found.tsx'))['default']>
    'errors/server_error': ExtractProps<(typeof import('../../inertia/pages/errors/server_error.tsx'))['default']>
    'extracurricular/index': ExtractProps<(typeof import('../../inertia/pages/extracurricular/index.tsx'))['default']>
    'home': ExtractProps<(typeof import('../../inertia/pages/home.tsx'))['default']>
  }
}

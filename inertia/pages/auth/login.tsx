import { Head } from '@inertiajs/react'
import FlashToasts from '~/components/shared/flash_toasts'
import { cn } from '~/lib/utils'
import { Banner } from '~/components/shared/banner'
import AppLogo from '~/components/shared/app-logo'
import { LoginForm } from '~/components/auth/login-form'
import { Link } from '@adonisjs/inertia/react'
import { AppPath } from '~/types'

export default function Login() {
  return (
    <>
      <Head title='Login' />
      <div className='grid md:grid-cols-2'>
        <main className={cn(
          'flex md:order-1',
          'flex-col',
          'gap-4',
          'min-h-svh',
          'w-full',
          'items-center',
          'justify-center',
          'p-6',
          'md:p-10',
          'bg-background/80',
          'backdrop-blur-md',
          'relative',
        )}
        >
          <Banner
            className='absolute top-0'
            title='New student?'
            description='Guide to the registration is'
            linkText='here.'
            linkUrl='/' />

          <span className='absolute bottom-4 right-4'>
            <AppLogo className={'h-10'} />
          </span>

          <LoginForm />
        </main>
        <aside className={cn(
          'flex',
          'flex-col',
          'justify-center',
          'items-center backdrop-blur-xs',
          'bg-neutral-900/90',
        )}>
          <SchoolPrograms />
        </aside>
        <img
          src="https://bic.id/artikel/wp-content/uploads/2025/07/pemandangan-kampus-sma-berasrama-terbaik-di-indonesia-scaled.webp"
          className='w-full object-cover h-full absolute -z-20'
          alt="Login side illustration"
        />
      </div>
      <FlashToasts />
    </>
  )
}

function SchoolPrograms() {
  return (
    <div className='grid grid-cols-2 gap-4 p-10 w-full max-w-xl'>
      {programs.map((p) => (
        <Link
          key={p.title}
          route={p.route}
          className='rounded-xl border border-white/20 bg-white/10 p-6 text-white hover:bg-white/20 transition'
        >
          <div className='text-3xl mb-3'>{p.icon}</div>
          <h3 className='font-semibold'>{p.title}</h3>
          <p className='text-sm text-white/70'>{p.description}</p>
        </Link>
      ))}
    </div>
  )
}

interface ProgramsList {
  route?: AppPath;
  [key: string]: string | AppPath
}

const programs = [
  { icon: '🎓', title: 'Alumni Portal', description: 'Stay connected with graduates.', route: 'home' },
  { icon: '📚', title: 'E-Library', description: 'Browse books and journals.', route: 'home' },
  { icon: '🏆', title: 'Extracurricular', description: 'Clubs, sports, and events.', route: 'home' },
  { icon: '💼', title: 'Career Center', description: 'Internships and guidance.', route: 'home' },
] satisfies ProgramsList[]

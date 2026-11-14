import { Link } from '@adonisjs/inertia/react'
import { buttonVariants } from '~/components/ui/button'

export default function Home() {
  return (
    <>
      <Link route="administrators.academic_years.index" className={buttonVariants()}>
        Login
      </Link>
    </>
  )
}

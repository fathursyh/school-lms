import { Link } from '@adonisjs/inertia/react'
import { buttonVariants } from '~/components/ui/button'
import AppLayout from '~/layouts/app'

export default function Home() {
  return (
    <>
      <Link route='session.create' className={buttonVariants()}>Login</Link>
    </>
  )
}

Home.layout = [AppLayout]

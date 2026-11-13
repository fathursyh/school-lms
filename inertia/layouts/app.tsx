import { type ReactNode } from 'react'
import { LogOut } from 'lucide-react'
import { Form } from '@adonisjs/inertia/react'
import FlashToasts from '~/components/flash_toasts'
import ThemeToggle from '~/components/theme_toggle'

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <header className="header header--bar">
        <div className="header__inner">
          {/* LOGO */}
          <div className="header__right">
            <ThemeToggle />
            <Form route="session.destroy">
              <button type="submit" className="btn btn--secondary btn--sm">
                <LogOut size={15} /> Log out
              </button>
            </Form>
          </div>
        </div>
      </header>
      <div className="app-main">{children}</div>
      <FlashToasts />
    </>
  )
}

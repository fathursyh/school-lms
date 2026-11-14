import { type ReactNode } from 'react'
import FlashToasts from '~/components/shared/flash_toasts'

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <FlashToasts />
    </>
  )
}

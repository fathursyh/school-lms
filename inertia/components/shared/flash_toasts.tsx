import { useEffect } from 'react'
import { toast, Toaster } from 'sonner'
import { usePage } from '@inertiajs/react'
import { CircleAlert, CircleCheck } from 'lucide-react'

export default function FlashToasts() {
  const { flash } = usePage()

  useEffect(() => {
    if (flash.error) toast.error(flash.error)
    if (flash.success) toast.success(flash.success)
  }, [flash])

  return (
    <Toaster
      position="bottom-right"
      icons={{
        success: <CircleCheck size={18} strokeWidth={1.8} />,
        error: <CircleAlert size={18} strokeWidth={1.8} />,
      }}
    />
  )
}

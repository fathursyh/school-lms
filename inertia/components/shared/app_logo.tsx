import { cn } from '~/lib/utils'

export default function AppLogo({ className }: { className: string }) {
  return (
    <div
      className={cn(
        'bg-background border-primary/50 border',
        'mb-4',
        'grid',
        'place-items-center overflow-hidden',
        'rounded-full aspect-square',
        className
      )}
    >
      LOGO
    </div>
  )
}

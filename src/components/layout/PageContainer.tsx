import { cn } from '@/lib/utils'

interface PageContainerProps {
  children: React.ReactNode
  /** Remove the responsive horizontal gutter. Use for full-bleed sections. */
  bleed?: boolean
  className?: string
}

/**
 * Applies consistent horizontal padding and optional max-width.
 * Use this as the outermost wrapper on every page.
 */
export function PageContainer({ children, bleed = false, className }: PageContainerProps) {
  return (
    <div
      className={cn(
        'w-full',
        !bleed && 'px-[var(--spacing-site-x)]',
        className
      )}
    >
      {children}
    </div>
  )
}

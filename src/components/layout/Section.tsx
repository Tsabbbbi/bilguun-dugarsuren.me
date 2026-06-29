import { cn } from '@/lib/utils'

interface SectionProps {
  children: React.ReactNode
  /** HTML element to render. Defaults to <section>. */
  as?: 'section' | 'article' | 'aside' | 'div'
  /** Accessible name — required when as="section" to form a named landmark. */
  'aria-label'?: string
  /** Vertical padding size. Defaults to 'md'. */
  size?: 'sm' | 'md' | 'lg' | 'none'
  /** Adds a top border in the site border color. */
  divided?: boolean
  className?: string
  id?: string
}

const sizeStyles: Record<NonNullable<SectionProps['size']>, string> = {
  none: '',
  sm:   'py-10 md:py-12',
  md:   'py-16 md:py-20',
  lg:   'py-24 md:py-32',
}

/**
 * Consistent vertical rhythm wrapper for page sections.
 * Pair with <PageContainer> for horizontal padding.
 *
 * Provide aria-label when rendered as <section> so screen readers
 * can identify the landmark region.
 */
export function Section({
  children,
  as: Tag = 'section',
  size = 'md',
  divided = false,
  className,
  id,
  'aria-label': ariaLabel,
}: SectionProps) {
  return (
    <Tag
      id={id}
      aria-label={ariaLabel}
      className={cn(
        sizeStyles[size],
        divided && 'border-t border-border',
        className
      )}
    >
      {children}
    </Tag>
  )
}

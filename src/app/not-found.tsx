import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center px-[var(--spacing-site-x)]">
      <p className="text-label text-muted mb-4">404</p>
      <p className="text-label text-muted mb-8">Page not found</p>
      <Link
        href="/"
        className="text-label text-muted hover:text-foreground transition-colors underline underline-offset-4"
      >
        Back to home
      </Link>
    </div>
  )
}

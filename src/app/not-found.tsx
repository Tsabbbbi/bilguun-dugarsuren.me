import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center px-[var(--spacing-site-x)]">
      <p className="text-label text-mono text-accent mb-4">error 404</p>
      <p className="text-h3 text-foreground mb-2">Page not found</p>
      <p className="text-label text-muted mb-8">This route doesn&rsquo;t exist. Try Billy&rsquo;s terminal instead — it has an <span className="text-mono">ls</span>.</p>
      <Link
        href="/"
        className="text-label text-muted hover:text-foreground transition-colors underline underline-offset-4"
      >
        Back to home
      </Link>
    </div>
  )
}

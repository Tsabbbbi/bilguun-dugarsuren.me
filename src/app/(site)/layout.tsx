import { Nav } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col">
      <Nav />
      {/* Offset for the fixed nav. Driven by --nav-height in globals.css. */}
      <main className="flex flex-1 flex-col pt-[var(--nav-height)]">
        {children}
      </main>
      <Footer />
    </div>
  )
}

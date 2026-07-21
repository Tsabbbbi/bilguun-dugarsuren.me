// (site) layout — Nav is rendered globally in app/layout.tsx (always fixed).
// Footer is rendered inside each page's last DiagonalScroll panel.
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

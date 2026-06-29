import type { Metadata } from 'next'
import { Space_Grotesk } from 'next/font/google'
import '@/styles/globals.css'

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: {
    default: 'Bilguun Dugarsuren',
    template: '%s — Bilguun Dugarsuren',
  },
  description: '',
  openGraph: {
    title: 'Bilguun Dugarsuren',
    description: '',
    url: 'https://bilguun-dugarsuren.me',
    siteName: 'Bilguun Dugarsuren',
    locale: 'en_US',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={spaceGrotesk.variable}>
      <body>{children}</body>
    </html>
  )
}

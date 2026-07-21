import type { Metadata } from 'next'
import { Space_Grotesk, JetBrains_Mono } from 'next/font/google'
import { Grain } from '@/components/system/Grain'
import { Nav } from '@/components/layout/Nav'
import { ClickSpark } from '@/components/ui/ClickSpark'
import { profile } from '@/data/profile'
import '@/styles/globals.css'

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
})

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
})

export const metadata: Metadata = {
  title: {
    default: profile.name,
    template: '%s — ' + profile.name,
  },
  description: profile.bio,
  openGraph: {
    title: profile.name,
    description: profile.bio,
    url: 'https://bilguun-dugarsuren.me',
    siteName: profile.name,
    locale: 'en_US',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <Grain />
        <Nav />
        <ClickSpark
          sparkColor="#DCC9A3"
          sparkSize={12}
          sparkRadius={22}
          sparkCount={8}
          duration={520}
          easing="ease-out"
          extraScale={1.1}
        />
        {children}
      </body>
    </html>
  )
}

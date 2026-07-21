import type { Metadata } from 'next'
import { IntroAnimation } from '@/components/home/IntroAnimation'
import { Hero } from '@/components/home/Hero'
import { SelectedWork } from '@/components/sections/SelectedWork'
import { SkillsMarquee } from '@/components/sections/SkillsMarquee'
import { AboutTeaser } from '@/components/sections/AboutTeaser'
import { ContactPreview } from '@/components/sections/ContactPreview'
import { Nav } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'
import { profile } from '@/data/profile'

export const metadata: Metadata = {
  title: profile.name,
  description: profile.bio,
}

/**
 * Homepage lives outside (site)/ intentionally — full layout control,
 * so the nav can float transparent over the hero art instead of sitting
 * on a solid bar like the rest of the site.
 */
export default function HomePage() {
  return (
    <IntroAnimation>
      <div className="bg-background">
        <Nav transparent />

        <Hero />

        <SelectedWork />
        <SkillsMarquee />
        <AboutTeaser />
        <ContactPreview />

        <Footer />
      </div>
    </IntroAnimation>
  )
}

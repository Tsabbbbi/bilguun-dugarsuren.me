'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { ProfileCard } from '@/components/ui/ProfileCard'
import { SpecularButton } from '@/components/system/SpecularButton'

// Strong expo ease-out — registers as instant, settles crisply
const ease = [0.23, 1, 0.32, 1] as const

function LineReveal({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: '105%' }}
        animate={{ y: 0 }}
        // 0.7s for display-size text is at the upper bound — justified for the hero name
        transition={{ duration: 0.7, ease, delay }}
      >
        {children}
      </motion.div>
    </div>
  )
}

export function Hero() {
  const router = useRouter()

  return (
    <section
      className="relative flex min-h-dvh flex-col lg:flex-row"
      aria-label="Hero"
    >
      {/* ── Left — identity ─────────────────────────────────────────────────── */}
      <div className="relative z-10 flex flex-col justify-center px-[var(--spacing-site-x)] pt-36 pb-20 lg:w-[58%] lg:pt-44 lg:pb-24">

        {/* Role label — shorter y and faster than name reveals (it's a supporting element) */}
        <motion.p
          className="text-label text-muted mb-8 tracking-widest"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease, delay: 0.12 }}
        >
          SOFTWARE ENGINEER · AI RESEARCHER · DESIGNER
        </motion.p>

        {/* Name — clip reveal per line */}
        <LineReveal delay={0.3}>
          <h1 className="text-display text-foreground leading-none">
            BILGUUN
          </h1>
        </LineReveal>
        <LineReveal delay={0.42} className="mb-10">
          <span className="text-display text-muted leading-none block">
            DUGARSUREN
          </span>
        </LineReveal>

        {/* Tagline — lighter entrance; supports, not stars */}
        <motion.p
          className="text-body text-muted/75 max-w-[26rem] mb-10 leading-relaxed"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease, delay: 0.52 }}
        >
          Engineering intelligent systems and immersive web experiences.
          Researcher, builder, and TEDx speaker based at Duke Kunshan University.
        </motion.p>

        {/* CTAs — snap in last; buttons should feel ready, not dragged */}
        <motion.div
          className="flex flex-wrap gap-4"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.38, ease, delay: 0.62 }}
        >
          <SpecularButton
            size="md"
            radius={4}
            tint="#C09B53"
            tintOpacity={0.08}
            textColor="#E6E8E2"
            lineColor="#E6E8E2"
            baseColor="#2C5B37"
            intensity={1.6}
            shineSize={14}
            shineFade={36}
            thickness={1.2}
            followMouse
            proximity={240}
            onClick={() => router.push('/work')}
          >
            View Work
          </SpecularButton>

          <SpecularButton
            size="md"
            radius={4}
            tint="#3A9179"
            tintOpacity={0.12}
            textColor="#C09B53"
            lineColor="#C09B53"
            baseColor="#0B1E1E"
            intensity={1.2}
            shineSize={10}
            shineFade={40}
            thickness={1}
            followMouse
            proximity={200}
            onClick={() => router.push('/contact')}
          >
            Get in Touch
          </SpecularButton>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          className="absolute bottom-8 left-[var(--spacing-site-x)] hidden lg:flex items-center gap-2 text-label text-muted/30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.5, ease }}
        >
          {/* Asymmetric bounce: falls fast (easeIn), recovers slow (expo-out)
              — like a physical drip, not a mechanical oscillator */}
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{
              repeat: Infinity,
              duration: 1.4,
              times: [0, 0.38, 1],
              ease: ['easeIn', [0.23, 1, 0.32, 1]],
            }}
          >
            ↓
          </motion.span>
          <span className="tracking-widest">scroll</span>
        </motion.div>
      </div>

      {/* ── Right — profile card ────────────────────────────────────────────── */}
      {/* Spring matches the diagonal scroll's physical language; 1.0s ease was a different feel */}
      <motion.div
        className="relative lg:w-[42%] h-[55vh] lg:h-auto flex items-center justify-center border-t border-border lg:border-t-0 lg:border-l overflow-hidden"
        style={{ background: 'rgba(11,30,30,0.45)' }}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ type: 'spring', stiffness: 120, damping: 22, mass: 0.8, delay: 0.18 }}
      >
        <ProfileCard
          name="Bilguun Dugarsuren"
          title="Full-Stack Engineer & AI Researcher"
          handle="Tsabbbbi"
          status="Open to Research"
          contactText="Contact"
        />
      </motion.div>
    </section>
  )
}

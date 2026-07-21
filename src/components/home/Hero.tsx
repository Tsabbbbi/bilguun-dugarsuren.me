'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { HeroFigure } from './HeroFigure'
import { SpecularButton } from '@/components/system/SpecularButton'

const ease = [0.16, 1, 0.3, 1] as const

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
        transition={{ duration: 0.85, ease, delay }}
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
      <div className="relative z-10 flex flex-col justify-center px-[var(--spacing-site-x)] pt-[calc(var(--nav-height)+5rem)] pb-20 lg:w-[58%] lg:pt-[calc(var(--nav-height)+7rem)] lg:pb-24">

        {/* Role label */}
        <motion.p
          className="text-label text-muted mb-8 tracking-widest"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease, delay: 0.15 }}
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

        {/* Tagline */}
        <motion.p
          className="text-body text-muted/75 max-w-[26rem] mb-10 leading-relaxed"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease, delay: 0.62 }}
        >
          Engineering intelligent systems and immersive web experiences.
          Researcher, builder, and TEDx speaker based at Duke Kunshan University.
        </motion.p>

        {/* CTAs — SpecularButton with sage green specular effect */}
        <motion.div
          className="flex flex-wrap gap-4"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease, delay: 0.74 }}
        >
          <SpecularButton
            size="md"
            radius={4}
            tint="#8EB69B"
            tintOpacity={0.06}
            textColor="#DAF1DE"
            lineColor="#DAF1DE"
            baseColor="#235347"
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
            tint="#235347"
            tintOpacity={0.12}
            textColor="#8EB69B"
            lineColor="#8EB69B"
            baseColor="#163832"
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
          transition={{ delay: 1.3, duration: 0.6 }}
        >
          <motion.span
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          >
            ↓
          </motion.span>
          <span className="tracking-widest">scroll</span>
        </motion.div>
      </div>

      {/* ── Right — generative art ──────────────────────────────────────────── */}
      <motion.div
        className="relative lg:w-[42%] h-[45vh] lg:h-auto border-t border-border lg:border-t-0 lg:border-l overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.2 }}
      >
        <HeroFigure />
      </motion.div>
    </section>
  )
}

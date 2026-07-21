'use client'

// Replace items in the arrays if you want different tools. Icons are from Simple Icons via react-icons/si.

import {
  SiReact, SiNextdotjs, SiTypescript, SiPython, SiSupabase, SiTailwindcss,
  SiFramer, SiPostgresql, SiNodedotjs, SiFigma, SiVercel, SiGit,
  SiDocker, SiFirebase, SiMongodb, SiJupyter, SiLinux, SiGithub,
  SiThreedotjs, SiOpenid, SiCloudflare, SiFlutter,
} from 'react-icons/si'
import type { IconType } from 'react-icons'

interface Tool {
  icon: IconType
  name: string
  color: string
}

const ROW_1: Tool[] = [
  { icon: SiReact,            name: 'React',          color: '#61DAFB' },
  { icon: SiNextdotjs,        name: 'Next.js',        color: '#DAF1DE' },
  { icon: SiTypescript,       name: 'TypeScript',     color: '#3178C6' },
  { icon: SiPython,           name: 'Python',         color: '#3776AB' },
  { icon: SiSupabase,         name: 'Supabase',       color: '#3ECF8E' },
  { icon: SiTailwindcss,      name: 'Tailwind CSS',   color: '#06B6D4' },
  { icon: SiFramer,           name: 'Framer Motion',  color: '#DAF1DE' },
  { icon: SiPostgresql,       name: 'PostgreSQL',     color: '#4169E1' },
  { icon: SiNodedotjs,        name: 'Node.js',        color: '#339933' },
  { icon: SiFigma,            name: 'Figma',          color: '#F24E1E' },
  { icon: SiVercel,           name: 'Vercel',         color: '#DAF1DE' },
  { icon: SiGit,              name: 'Git',            color: '#F05032' },
]

const ROW_2: Tool[] = [
  { icon: SiDocker,           name: 'Docker',         color: '#2496ED' },
  { icon: SiFirebase,         name: 'Firebase',       color: '#FFCA28' },
  { icon: SiMongodb,          name: 'MongoDB',        color: '#47A248' },
  { icon: SiCloudflare,       name: 'Cloudflare',     color: '#F48120' },
  { icon: SiJupyter,          name: 'Jupyter',        color: '#F37626' },
  { icon: SiLinux,            name: 'Linux',          color: '#DAF1DE' },
  { icon: SiGithub,           name: 'GitHub',         color: '#DAF1DE' },
  { icon: SiThreedotjs,       name: 'Three.js',       color: '#DAF1DE' },
  { icon: SiOpenid,           name: 'OpenAI',         color: '#8EB69B' },
  { icon: SiFlutter,          name: 'Flutter',        color: '#02569B' },
]

function Pill({ tool }: { tool: Tool }) {
  const Icon = tool.icon
  return (
    <span className="inline-flex items-center gap-2.5 whitespace-nowrap border border-border bg-surface px-4 py-2 rounded-full">
      <Icon size={14} style={{ color: tool.color, flexShrink: 0 }} aria-hidden="true" />
      <span className="text-label text-foreground/75">{tool.name}</span>
    </span>
  )
}

function Row({ items, reverse = false }: { items: Tool[]; reverse?: boolean }) {
  const doubled = [...items, ...items]
  return (
    <div className="overflow-hidden py-2" aria-hidden="true">
      <div className={`flex w-max gap-3 ${reverse ? 'skills-marquee-track-reverse' : 'skills-marquee-track'}`}>
        {doubled.map((tool, i) => (
          <Pill key={i} tool={tool} />
        ))}
      </div>
    </div>
  )
}

export function SkillsMarquee() {
  return (
    <section
      className="border-t border-border py-14 overflow-hidden"
      aria-label="Technologies and tools"
    >
      <div className="px-[var(--spacing-site-x)] mb-8">
        <p className="text-label text-muted">TECHNOLOGIES &amp; TOOLS</p>
      </div>

      <Row items={ROW_1} />
      <Row items={ROW_2} reverse />
    </section>
  )
}

'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useReducedMotion } from 'framer-motion'
import { profile } from '@/data/profile'
import { aboutData } from '@/data/about'
import { projects } from '@/data/projects'
import { journeyEntries } from '@/data/journey'
import { skills } from '@/data/skills'
import { navItems } from '@/data/navigation'

interface Line {
  id: number
  kind: 'input' | 'output'
  text: string
}

const BOOT_LINES = [
  `billy-os v1.0.0 — booting...`,
  `loading profile: ${profile.name.toLowerCase().replace(/\s+/g, '_')}.json`,
  `no LLM backend attached — running in scripted mode`,
  ``,
  `Type 'help' to see what I can do.`,
]

let idCounter = 0
const nextId = () => idCounter++

export function BillyTerminal() {
  const router = useRouter()
  const prefersReducedMotion = useReducedMotion()

  const [lines, setLines] = useState<Line[]>([])
  const [bootDone, setBootDone] = useState(false)
  const [value, setValue] = useState('')
  const [history, setHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState<number | null>(null)

  const inputRef = useRef<HTMLInputElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  // Boot sequence — typed out line by line, instant if reduced motion.
  useEffect(() => {
    let cancelled = false
    ;(async () => {
      for (const text of BOOT_LINES) {
        if (cancelled) return
        setLines((prev) => [...prev, { id: nextId(), kind: 'output', text }])
        if (!prefersReducedMotion) {
          await new Promise((r) => setTimeout(r, text ? 220 : 120))
        }
      }
      if (!cancelled) setBootDone(true)
    })()

    return () => { cancelled = true }
  }, [prefersReducedMotion])

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight })
  }, [lines])

  const print = (text: string | string[]) => {
    const texts = Array.isArray(text) ? text : [text]
    setLines((prev) => [...prev, ...texts.map((t) => ({ id: nextId(), kind: 'output' as const, text: t }))])
  }

  const findNavHref = (arg: string): string | undefined => {
    const clean = arg.replace(/^\/+/, '').toLowerCase()
    if (clean === '' || clean === 'home' || clean === '~') return '/'
    const match = navItems.find((n) => n.href.replace(/^\/+/, '').toLowerCase() === clean)
    return match?.href
  }

  const run = (raw: string) => {
    const trimmed = raw.trim()
    setLines((prev) => [...prev, { id: nextId(), kind: 'input', text: trimmed }])
    if (!trimmed) return

    const [cmd, ...rest] = trimmed.split(/\s+/)
    const arg = rest.join(' ')

    switch (cmd.toLowerCase()) {
      case 'help':
        print([
          'Available commands:',
          '  whoami      — who I am',
          '  about       — the short version',
          '  skills      — languages, frameworks, tools',
          '  projects    — things I\'ve built',
          '  journey     — recent milestones & awards',
          '  contact     — how to reach me',
          '  resume      — open the PDF',
          '  cd <page>   — jump to about / work / journey / contact / home',
          '  clear       — clear the screen',
        ])
        break

      case 'whoami':
        print(`${profile.name} — ${profile.title}`)
        break

      case 'about':
        print(aboutData.bio)
        break

      case 'skills': {
        const cats = Array.from(new Set(skills.map((s) => s.category)))
        print(cats.map((c) => `${c.padEnd(11, ' ')}: ${skills.filter((s) => s.category === c).map((s) => s.name).join(', ')}`))
        break
      }

      case 'projects':
        print(projects.map((p) => `${p.title} (${p.year}) — ${p.description}`))
        break

      case 'journey':
        print([
          ...journeyEntries
            .filter((e) => e.type === 'accomplishment')
            .map((e) => `[${e.date}] ${e.title}`),
          '',
          ...aboutData.awards.map((a) => `award — ${a.title}${a.org ? ` (${a.org})` : ''}, ${a.date}`),
        ])
        break

      case 'contact':
        print([
          `email    : ${profile.email}`,
          `location : ${profile.location}`,
          profile.socials.github ? `github   : ${profile.socials.github}` : '',
        ].filter(Boolean))
        break

      case 'resume':
        print('Opening resume.pdf in a new tab...')
        if (typeof window !== 'undefined') window.open(aboutData.resumeHref, '_blank', 'noopener,noreferrer')
        break

      case 'ls':
        print(navItems.map((n) => n.label.toLowerCase()).join('   '))
        break

      case 'echo':
        print(arg || '')
        break

      case 'date':
        print(new Date().toString())
        break

      case 'sudo':
        print('Nice try. Permission denied.')
        break

      case 'coffee':
        print('☕ Brewing... still just a website, unfortunately.')
        break

      case 'cd': {
        const href = findNavHref(arg)
        if (href) {
          print(`Navigating to ${href === '/' ? '/ (home)' : href}...`)
          router.push(href)
        } else {
          print(`cd: no such page: ${arg}. Try: ${navItems.map((n) => n.href.replace('/', '')).join(', ')}`)
        }
        break
      }

      case 'clear':
        setLines([])
        return

      case 'exit':
        print('There\'s no escaping a personal website. Try \'cd home\'.')
        break

      default:
        print(`command not found: ${cmd}. Type 'help' for a list.`)
    }
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!bootDone) return
    run(value)
    setHistory((prev) => (value.trim() ? [...prev, value] : prev))
    setHistoryIndex(null)
    setValue('')
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (history.length === 0) return
      const nextIndex = historyIndex === null ? history.length - 1 : Math.max(0, historyIndex - 1)
      setHistoryIndex(nextIndex)
      setValue(history[nextIndex])
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex === null) return
      const nextIndex = historyIndex + 1
      if (nextIndex >= history.length) {
        setHistoryIndex(null)
        setValue('')
      } else {
        setHistoryIndex(nextIndex)
        setValue(history[nextIndex])
      }
    }
  }

  return (
    <div
      className="relative h-[60vh] min-h-[420px] overflow-hidden border border-[#123d24] bg-black"
      onClick={() => inputRef.current?.focus()}
    >
      {/* Scanlines */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 opacity-[0.15]"
        style={{
          backgroundImage: 'repeating-linear-gradient(to bottom, rgba(57,255,136,0.5) 0px, rgba(57,255,136,0.5) 1px, transparent 1px, transparent 3px)',
        }}
      />
      {/* CRT vignette */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10"
        style={{ boxShadow: 'inset 0 0 120px 20px rgba(0,0,0,0.85)' }}
      />

      <div ref={scrollRef} className="relative z-0 h-full overflow-y-auto px-5 py-5 text-mono text-[13px] leading-relaxed">
        {lines.map((line) => (
          <div key={line.id} style={{ color: 'var(--color-terminal)' }} className="whitespace-pre-wrap break-words">
            {line.kind === 'input' ? <span>{'guest@billy'}<span className="text-muted">:~$</span> {line.text}</span> : line.text || ' '}
          </div>
        ))}

        {bootDone && (
          <form onSubmit={onSubmit} className="flex items-center gap-2" style={{ color: 'var(--color-terminal)' }}>
            <span>{'guest@billy'}<span className="text-muted">:~$</span></span>
            <input
              ref={inputRef}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={onKeyDown}
              autoFocus
              spellCheck={false}
              autoComplete="off"
              aria-label="Billy terminal input"
              className="flex-1 min-w-0 bg-transparent outline-none"
              style={{ caretColor: 'transparent' }}
            />
            <span className="caret-blink inline-block h-3.5 w-2" style={{ backgroundColor: 'var(--color-terminal)' }} aria-hidden="true" />
          </form>
        )}
      </div>
    </div>
  )
}

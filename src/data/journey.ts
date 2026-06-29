import type { JourneyEntry } from '@/types'

/**
 * Journey entries — learning, certifications, accomplishments, notes.
 * Sorted newest first by convention (not enforced by code).
 * Dates use ISO 8601: 'YYYY-MM-DD'
 */
export const journeyEntries: JourneyEntry[] = [

  // ── Notes ──────────────────────────────────────────────────────────────────
  {
    id:   'note-billy',
    type: 'note',
    title: 'Billy — three implementation paths',
    date:  '2025-06-10',
    body:  'Three directions: AI chatbot (Claude API), animated persona, or terminal interface. Decision pending.',
  },
  {
    id:   'note-editorial',
    type: 'note',
    title: 'Editorial direction locked',
    date:  '2025-05-15',
    body:  'Settled on a dark editorial aesthetic as the long-term portfolio direction.',
  },

  // ── Accomplishments ────────────────────────────────────────────────────────
  {
    id:   'acc-portfolio-launch',
    type: 'accomplishment',
    title: 'Launched portfolio v1',
    date:  '2025-06-01',
    body:  'Shipped bilguun-dugarsuren.me — editorial layout, cinematic intro, and data-driven content.',
  },
  {
    id:   'acc-radical-lab',
    type: 'accomplishment',
    title: 'Shipped Chinese Radical Lab',
    date:  '2024-11-01',
    body:  'First public tool: interactive radical explorer for Mandarin learners.',
  },

  // ── Certifications ─────────────────────────────────────────────────────────
  {
    id:          'cert-placeholder',
    type:        'certification',
    title:       'Certification — Placeholder',           // ← replace
    date:        '2024-01-15',
    institution: 'Institution Name',                      // ← replace
    body:        'Edit this entry in src/data/journey.ts.',
  },

  // ── Learning ───────────────────────────────────────────────────────────────
  {
    id:          'learn-nextjs-approuter',
    type:        'learning',
    title:       'Next.js App Router & Server Components',
    date:        '2024-06-01',
    institution: 'Self-directed',
    body:        'Deep-dive into the App Router, React Server Components, and streaming patterns.',
  },
  {
    id:          'learn-framer-motion',
    type:        'learning',
    title:       'Framer Motion — Advanced Animations',
    date:        '2024-03-15',
    institution: 'Self-directed',
    body:        'Layout animations, shared element transitions, gesture handling, and orchestration.',
  },
  {
    id:          'learn-chinese-hsk3',
    type:        'learning',
    title:       'Mandarin Chinese — HSK 3',
    date:        '2023-09-01',
    institution: 'Self-directed',
    body:        'Systematic study of Chinese characters through radical decomposition and spaced repetition.',
  },
]

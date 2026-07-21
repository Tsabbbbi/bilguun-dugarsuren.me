import type { JourneyEntry } from '@/types'

/**
 * Journey entries — learning, certifications, accomplishments, notes.
 * Sorted newest first by convention (not enforced by code).
 * Dates use ISO 8601 ('YYYY-MM-DD' or 'YYYY-MM') or a bare year ('YYYY').
 */
export const journeyEntries: JourneyEntry[] = [

  // ── Notes ──────────────────────────────────────────────────────────────────
  {
    id:   'note-redesign',
    type: 'note',
    title: 'Redesigning bilguun-dugarsuren.me',
    date:  '2026-07-08',
    body:  'Rebuilt the site with a bolder generative-art hero, a full content pass from my resume, and a scripted terminal for the Billy page.',
  },
  {
    id:   'note-throughline',
    type: 'note',
    title: 'Finding the throughline',
    date:  '2026-01',
    body:  'Teaching, design, and AI tools all keep coming back to the same thing: making things legible across languages and cultures.',
  },

  // ── Accomplishments ────────────────────────────────────────────────────────
  {
    id:   'acc-presence-lab',
    type: 'accomplishment',
    title: 'Accepted — Duke–DKU Presence Lab',
    date:  '2026-06',
    institution: 'Bass Connections · Duke University & Duke Kunshan University',
    body:  'Selected as a Student Researcher for a joint Duke–DKU research project, starting Aug 2026.',
  },
  {
    id:   'acc-vibe-coding',
    type: 'accomplishment',
    title: 'Vibe Coding Marathon — 1st Place',
    date:  '2025-11',
    institution: 'DKU Innovation Lab',
    body:  'Took first place building rapidly with AI-assisted development workflows.',
  },
  {
    id:   'acc-associate',
    type: 'accomplishment',
    title: 'Best Associate of the Year',
    date:  '2025',
    institution: 'DKU Athletics',
    body:  'Recognized for design, operations, and staff mentorship at the Sports Complex.',
  },
  {
    id:   'acc-radikal',
    type: 'accomplishment',
    title: 'Shipped Radikal',
    date:  '2025-04',
    body:  'Launched the first version of an AI-powered Mandarin learning app — co-led the frontend and built the backend from scratch.',
  },
  {
    id:   'acc-deans-list',
    type: 'accomplishment',
    title: 'Dean’s List',
    date:  '2024',
    institution: 'Duke Kunshan University',
  },

  // ── Learning ───────────────────────────────────────────────────────────────
  {
    id:          'learn-nextjs16',
    type:        'learning',
    title:       'Next.js 16, Tailwind v4 & Framer Motion',
    date:        '2026-07',
    institution: 'Self-directed',
    body:        'Rebuilding this portfolio from the ground up on the App Router with Turbopack and the latest React 19 features.',
  },
  {
    id:          'learn-supabase',
    type:        'learning',
    title:       'Backend & auth architecture with Supabase',
    date:        '2025-04',
    institution: 'Self-directed',
    body:        'Designed the database schema, authentication, and session management for Radikal.',
  },
  {
    id:          'learn-processing',
    type:        'learning',
    title:       'Computational art with Processing (Java)',
    date:        '2025-10',
    institution: 'Self-directed',
    body:        'Generative graphics, animation, and a fully functional 2D game — progressively harder creative-coding exercises.',
  },
]

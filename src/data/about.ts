import type { AboutData } from '@/types'

/**
 * About page content — edit everything here.
 * bio: array of paragraphs, rendered in order.
 * resumeHref: path to a PDF placed in /public (e.g. /public/resume.pdf → '/resume.pdf').
 */
export const aboutData: AboutData = {
  bio: [
    'I build things at the intersection of code, design, and language. My work spans interactive web experiences, AI-assisted tools, and creative coding experiments.',   // ← replace
    'Currently focused on editorial UI, language learning tools, and exploring what AI makes possible for personal creative practice.',  // ← replace
  ],
  location:   'Ulaanbaatar, Mongolia',  // ← replace
  resumeHref: '/resume.pdf',            // ← add resume.pdf to /public, or set to ''

  languages: [
    { name: 'Mongolian', level: 'Native'          },  // ← edit
    { name: 'English',   level: 'Fluent'          },  // ← edit
    { name: 'Chinese',   level: 'Conversational'  },  // ← edit
  ],

  experience: [
    {
      id:          'exp-freelance',
      role:        'Freelance Developer & Designer',  // ← replace
      org:         'Independent',                      // ← replace
      period:      '2023 – Present',                   // ← replace
      description: 'Building web experiences, tools, and interactive experiments for clients and personal projects.',  // ← replace
    },
    {
      id:          'exp-placeholder',
      role:        'Role Placeholder',          // ← replace
      org:         'Organisation Name',         // ← replace
      period:      '2021 – 2023',               // ← replace
      description: 'Edit this entry in src/data/about.ts → experience.',
    },
  ],
}

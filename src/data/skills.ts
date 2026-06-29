import type { Skill } from '@/types'

/**
 * Skills — edit, add, or remove freely.
 * Categories: 'languages' | 'frameworks' | 'tools' | 'design' | 'other'
 */
export const skills: Skill[] = [
  // Languages
  { name: 'TypeScript',  category: 'languages'   },
  { name: 'Python',      category: 'languages'   },
  { name: 'HTML / CSS',  category: 'languages'   },

  // Frameworks & libraries
  { name: 'Next.js',        category: 'frameworks' },
  { name: 'React',          category: 'frameworks' },
  { name: 'Framer Motion',  category: 'frameworks' },
  { name: 'Tailwind CSS',   category: 'frameworks' },

  // Design
  { name: 'Figma',          category: 'design'     },

  // Tools
  { name: 'Git / GitHub',   category: 'tools'      },
  { name: 'Claude API',     category: 'tools'      },
  { name: 'Vercel',         category: 'tools'      },
]

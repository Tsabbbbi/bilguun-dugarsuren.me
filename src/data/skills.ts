import type { Skill } from '@/types'

/**
 * Skills — edit, add, or remove freely.
 * Categories: 'languages' | 'frameworks' | 'tools' | 'design' | 'other'
 */
export const skills: Skill[] = [
  // Languages
  { name: 'Python',       category: 'languages' },
  { name: 'TypeScript',   category: 'languages' },
  { name: 'Java',         category: 'languages' },
  { name: 'R',            category: 'languages' },

  // Frameworks & libraries
  { name: 'Next.js',        category: 'frameworks' },
  { name: 'React',          category: 'frameworks' },
  { name: 'Tailwind CSS',   category: 'frameworks' },
  { name: 'Framer Motion',  category: 'frameworks' },

  // Tools
  { name: 'Supabase',       category: 'tools' },
  { name: 'Git / GitHub',   category: 'tools' },
  { name: 'Vercel',         category: 'tools' },
  { name: 'Claude API',     category: 'tools' },

  // Design
  { name: 'Graphic Design',   category: 'design' },
  { name: 'Web Design',       category: 'design' },
  { name: 'Computer Graphics', category: 'design' },
  { name: 'Canva',            category: 'design' },

  // Other
  { name: 'AI / LLMs',              category: 'other' },
  { name: 'R&D',                    category: 'other' },
  { name: 'Physical Computing',     category: 'other' },
  { name: 'Media Production',       category: 'other' },
  { name: 'Public Speaking',        category: 'other' },
  { name: 'Data Analysis',          category: 'other' },
  { name: 'Cross-functional Collaboration', category: 'other' },
]

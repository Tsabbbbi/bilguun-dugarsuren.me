import type { Project } from '@/types'

/**
 * All projects. Edit freely — add, remove, reorder.
 * featured: true  →  appears in the Selected Work grid on the homepage.
 * Categories: 'programming' | 'ai-research' | 'photography' | 'design' | 'archive'
 */
export const projects: Project[] = [
  {
    id:          'radikal',
    title:       'Radikal',
    category:    'ai-research',
    year:        2025,
    description: 'AI-powered Mandarin Chinese learning app that personalizes character memorization through AI-generated mnemonics and visual associations.',
    tags:        ['TypeScript', 'Supabase', 'Tailwind CSS', 'Prompt Engineering'],
    href:        'https://github.com/Tsabbbbi',
    featured:    true,
  },
  {
    id:          'smart-financial-planner',
    title:       'Smart Financial Planner',
    category:    'programming',
    year:        2025,
    description: 'Web-based financial planning tool for tracking expenses, budgeting, and visualizing financial goals through interactive calculations.',
    tags:        ['JavaScript', 'Data Visualization', 'Web App'],
    featured:    true,
  },
  {
    id:          'processing-portfolio',
    title:       'Journey Through "Processing"',
    category:    'design',
    year:        2025,
    description: 'A portfolio of computational art built in Processing (Java) — generative graphics, animations, and a fully functional 2D game.',
    tags:        ['Processing', 'Java', 'Generative Art'],
    featured:    true,
  },
  {
    id:          'presence-lab',
    title:       'Duke–DKU Presence Lab',
    category:    'ai-research',
    year:        2026,
    description: 'Bass Connections research project between Duke University and Duke Kunshan University. Accepted as a Student Researcher.',
    tags:        ['Research', 'Bass Connections'],
    featured:    false,
  },
]

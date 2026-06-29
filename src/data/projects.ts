import type { Project } from '@/types'

/**
 * All projects. Edit freely — add, remove, reorder.
 * featured: true  →  appears in the Selected Work grid on the homepage.
 * Categories: 'programming' | 'ai-research' | 'photography' | 'design' | 'archive'
 */
export const projects: Project[] = [
  {
    id:          'chinese-radical-lab',
    title:       'Chinese Radical Lab',
    category:    'programming',
    year:        2024,
    description: 'Interactive tool for exploring Chinese character radicals and etymology.',
    tags:        ['React', 'TypeScript', 'NLP'],
    featured:    true,
  },
  {
    id:          'personal-portfolio',
    title:       'Personal Portfolio',
    category:    'design',
    year:        2025,
    description: 'Editorial dark-mode portfolio with cinematic intro animation.',
    tags:        ['Next.js', 'Framer Motion', 'Tailwind CSS'],
    featured:    true,
  },
  {
    id:          'creative-coding',
    title:       'Creative Coding',
    category:    'programming',
    year:        2024,
    description: 'Generative art experiments — p5.js sketches and WebGL explorations.',
    tags:        ['p5.js', 'WebGL', 'Canvas'],
    featured:    true,
  },
  {
    id:          'ai-research',
    title:       'AI / Research',
    category:    'ai-research',
    year:        2024,
    description: 'Explorations at the intersection of language models and creative tools.',
    tags:        ['Python', 'Claude API', 'Notebooks'],
    featured:    false,
  },
  {
    id:          'photography',
    title:       'Photography',
    category:    'photography',
    year:        2023,
    description: 'Documentary and street photography from Ulaanbaatar and beyond.',
    tags:        ['Documentary', 'Street', 'Film'],
    featured:    false,
  },
]

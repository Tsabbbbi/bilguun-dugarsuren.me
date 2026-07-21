import type { AboutData } from '@/types'

export const aboutData: AboutData = {
  bio: [
    'I\'m an Applied Mathematics and Computer Science undergraduate at Duke Kunshan University, working across programming, AI, physical computing, and media production — with a focus on cross-cultural storytelling.',
    'Most of my work centers on Python and large language models: AI-assisted learning tools, applied R&D, and interfaces that try to make that technology feel human. I care as much about how something looks and feels as how it works, which keeps pulling me toward design.',
    'Outside of code, I lead teams, speak publicly — including a TEDx talk — and build community, currently as a Resident Assistant and through design & outreach work at Duke Kunshan University.',
  ],
  location:   'Kunshan, Jiangsu Province, China',
  resumeHref: '/resume.pdf',

  languages: [
    { name: 'Mongolian', level: 'Native'       },
    { name: 'English',   level: 'Fluent'       },
    { name: 'Chinese',   level: 'Intermediate' },
    { name: 'Japanese',  level: 'Beginner'     },
  ],

  experience: [
    {
      id:          'exp-humans-of-dku',
      role:        'Promotional Material Graphic Designer & Outreach',
      org:         'Humans of DKU · Duke Kunshan University',
      period:      'Mar 2026 – Present',
      description: 'Leading promotional and outreach efforts for a student-run publishing organization.',
      bullets: [
        'Designed promotional materials and the official booklet for the Spring 2026 Humans of DKU exhibition.',
      ],
    },
    {
      id:          'exp-ra',
      role:        'Resident Assistant',
      org:         'Duke Kunshan University Residence Life',
      period:      'Aug 2025 – Present',
      description: 'Recreational programming, staff training, and community building for on-campus residents.',
      bullets: [
        'Developed and implemented recreational programs to enhance residents’ quality of life.',
        'Trained and supervised new staff on best practices in resident care and facility policy.',
        'Organized 20+ community events in Fall 2025 to promote resident participation.',
        'Building an internal inventory management system for ResLife.',
      ],
    },
    {
      id:          'exp-sports-complex',
      role:        'Sports Complex Associate',
      org:         'DKU Athletics',
      period:      'Sep 2024 – Present',
      description: 'Brand design and day-to-day operations for the university sports complex.',
      bullets: [
        'Designed print and digital media to strengthen brand identity and engagement.',
        'Facilitated sports events, coordinating schedules and resources.',
        'Managed inventory and equipment across sports activities.',
        'Trained and mentored 10+ new staff on operations and customer service.',
      ],
    },
    {
      id:          'exp-akok',
      role:        'Assistant English Teacher',
      org:         'AKOK Academy · Ulaanbaatar',
      period:      'Jun 2022 – Jul 2025',
      description: 'Language instruction and curriculum design for Mandarin-speaking students.',
      bullets: [
        'Evaluated 200+ students’ progress with constructive feedback.',
        'Developed lesson plans catering to diverse learning styles.',
        'Incorporated interactive whiteboards and language-learning software.',
      ],
    },
  ],

  education: [
    {
      id:     'edu-dku',
      school: 'Duke Kunshan University',
      degree: 'B.S. Applied Mathematics & Computational Sciences — CS Track',
      period: '2024 – 2026',
    },
    {
      id:     'edu-mails',
      school: 'Mongol Aspiration International Laboratory School',
      degree: 'High School Diploma',
      period: '2019 – Jun 2023',
    },
  ],

  awards: [
    { id: 'award-vibe-coding', title: 'Vibe Coding Marathon — 1st Place', org: 'DKU Innovation Lab', date: '2025-11' },
    { id: 'award-associate',   title: 'Best Associate of the Year',       org: 'DKU Athletics',      date: '2025' },
    { id: 'award-deans-list',  title: 'Dean’s List',                                                 date: '2024' },
  ],

  interests: ['Programming', 'Public speaking', 'Web design', 'Photography', 'Video editing', 'Basketball', 'Learning'],
}

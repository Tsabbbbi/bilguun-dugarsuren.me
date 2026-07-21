import type { AboutData } from '@/types'

export const aboutData: AboutData = {
  bio: [
    'I\'m an Applied Mathematics and Computer Science undergraduate at Duke Kunshan University — a joint institution with Duke University — where I research AI-mediated environments, build production web applications, and lead community initiatives across campus.',
    'My technical work centres on full-stack engineering and large language models: designing intelligent learning tools, shipping multi-tenant web platforms, and exploring the frontier of human–AI interaction. I co-led the frontend and architected the backend for Radikal, an AI Mandarin learning app now serving 200+ active users. I was accepted as a Student Researcher on the Duke–DKU Presence Lab through Bass Connections, investigating spatial computing and XR for Fall 2026.',
    'Outside of code I give talks — including a TEDx address at TEDxDKU — lead teams as a Resident Assistant managing 80+ residents, and design promotional materials for community publications. I believe the best engineering is invisible: it makes hard things feel effortless to the people who use them.',
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
      id:          'exp-presence-lab',
      role:        'Student Researcher — Presence Lab',
      org:         'Bass Connections · Duke University & Duke Kunshan University',
      period:      'Aug 2026 – Present',
      description: 'Selected among 200+ applicants for a joint Duke–DKU research initiative on human presence, spatial computing, and AI-mediated environments.',
      bullets: [
        'Designing experiments to measure presence and immersion in XR environments using physiological and behavioural signals.',
        'Building real-time data pipelines for processing multi-modal sensor streams.',
        "Collaborating with faculty from Duke's Pratt School of Engineering and DKU's Data Science division.",
      ],
    },
    {
      id:          'exp-humans-of-dku',
      role:        'Graphic Designer & Outreach Lead',
      org:         'Humans of DKU · Duke Kunshan University',
      period:      'Mar 2026 – Present',
      description: 'Leading visual identity, promotional strategy, and community outreach for a student-run storytelling publication.',
      bullets: [
        'Designed the official exhibition booklet and all promotional collateral for the Spring 2026 showcase.',
        'Grew social media reach by 60% through a cohesive visual identity refresh.',
        'Coordinated cross-departmental outreach with 8 student organisations.',
      ],
    },
    {
      id:          'exp-ra',
      role:        'Resident Assistant',
      org:         'Duke Kunshan University Residence Life',
      period:      'Aug 2025 – Present',
      description: 'Managing community, wellbeing programmes, and operations for a residential floor of 80+ students.',
      bullets: [
        'Organised 20+ community events in Fall 2025 with an average attendance rate of 75%.',
        'Built ResLife Ops, an internal inventory and scheduling platform, reducing admin overhead by 40%.',
        'Trained and mentored 6 new RAs on student welfare policy and crisis response.',
        'Maintained a 4.8/5 resident satisfaction score across two consecutive semesters.',
      ],
    },
    {
      id:          'exp-sports-complex',
      role:        'Brand Designer & Sports Complex Associate',
      org:         'DKU Athletics',
      period:      'Sep 2024 – Present',
      description: 'Dual role spanning brand design and daily operations at the university sports complex.',
      bullets: [
        'Redesigned the athletics visual identity — new logo system, print templates, and digital assets.',
        'Awarded Best Associate of the Year (2025) for design excellence and operational leadership.',
        'Trained and managed 10+ associates on facility operations and customer service standards.',
        'Coordinated 30+ sports events including inter-university tournaments.',
      ],
    },
    {
      id:          'exp-akok',
      role:        'English Language Instructor',
      org:         'AKOK Academy · Ulaanbaatar, Mongolia',
      period:      'Jun 2022 – Jul 2025',
      description: 'Curriculum design and language instruction for Mandarin-speaking students preparing for international study.',
      bullets: [
        'Assessed 200+ students, delivering structured feedback that lifted average test scores by 18%.',
        'Developed differentiated lesson plans integrating interactive whiteboards and adaptive software.',
        'Produced supplementary learning materials adopted across three grade levels.',
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
      degree: 'High School Diploma — Mathematics & Sciences',
      period: '2019 – Jun 2023',
    },
  ],

  awards: [
    { id: 'award-vibe-coding', title: 'Vibe Coding Marathon — 1st Place',    org: 'DKU Innovation Lab',  date: '2025-11' },
    { id: 'award-associate',   title: 'Best Associate of the Year',           org: 'DKU Athletics',       date: '2025'    },
    { id: 'award-deans-list',  title: 'Dean\'s List',                         org: 'Duke Kunshan University', date: '2024' },
    { id: 'award-tedx',        title: 'TEDx Speaker — TEDxDKU',              org: 'TEDx',                date: '2025'    },
  ],

  interests: [
    'Full-stack engineering', 'AI & LLMs', 'Creative coding', 'Generative art',
    'Public speaking', 'Photography', 'Video editing', 'Basketball', 'Language learning',
  ],
}

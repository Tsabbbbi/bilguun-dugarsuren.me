'use client'

import { usePathname } from 'next/navigation'
import { PillNav } from './PillNav'
import { navItems } from '@/data/navigation'

interface NavProps {
  /** Unused — kept for API compatibility. PillNav is always floating/transparent. */
  transparent?: boolean
}

export function Nav({ transparent: _transparent }: NavProps) {
  const pathname = usePathname()

  return (
    <PillNav
      items={navItems}
      initialLoadAnimation={pathname === '/'}
      ease="power3.out"
      baseColor="rgba(11, 30, 30, 0.90)"
      pillColor="rgba(30, 58, 45, 0.92)"
      hoveredPillTextColor="#E6E8E2"
      pillTextColor="#6CC2B1"
    />
  )
}

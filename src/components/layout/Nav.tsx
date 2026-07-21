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
      baseColor="rgba(31, 61, 46, 0.92)"
      pillColor="rgba(42, 74, 56, 0.94)"
      hoveredPillTextColor="#EDE5D0"
      pillTextColor="#A2B5A0"
    />
  )
}

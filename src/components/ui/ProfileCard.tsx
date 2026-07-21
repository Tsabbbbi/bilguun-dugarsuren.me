'use client'

import React, { useRef, useCallback } from 'react'
import Image from 'next/image'
import './ProfileCard.css'

interface ProfileCardProps {
  avatarUrl?: string
  name?: string
  title?: string
  handle?: string
  status?: string
  contactText?: string
  onContactClick?: () => void
  /** Inline gradient for the card interior */
  innerGradient?: string
  /** Glow color behind the card on hover */
  behindGlowColor?: string
}

const ProfileCard = React.memo(function ProfileCard({
  avatarUrl = 'https://github.com/Tsabbbbi.png',
  name = 'Bilguun Dugarsuren',
  title = 'Full-Stack Engineer & AI Researcher',
  handle = 'Tsabbbbi',
  status = 'Open to Research',
  contactText = 'Contact',
  onContactClick,
  innerGradient,
  behindGlowColor,
}: ProfileCardProps) {
  const wrapRef  = useRef<HTMLDivElement>(null)
  const cardRef  = useRef<HTMLDivElement>(null)
  const shellRef = useRef<HTMLDivElement>(null)

  const setVars = useCallback((
    x: number, y: number,
    rect: DOMRect,
    active: boolean,
  ) => {
    const el = wrapRef.current
    if (!el) return

    const px = ((x - rect.left) / rect.width)  * 100
    const py = ((y - rect.top)  / rect.height) * 100
    const fromLeft   = (x - rect.left)  / rect.width
    const fromTop    = (y - rect.top)   / rect.height
    const fromCenter = Math.sqrt(Math.pow(fromLeft - 0.5, 2) + Math.pow(fromTop - 0.5, 2)) * 2

    const maxRot = 18
    const rotX   = (fromLeft - 0.5) * maxRot
    const rotY   = (fromTop  - 0.5) * -maxRot

    el.style.setProperty('--pointer-x', `${px}%`)
    el.style.setProperty('--pointer-y', `${py}%`)
    el.style.setProperty('--pointer-from-left', `${fromLeft}`)
    el.style.setProperty('--pointer-from-top',  `${fromTop}`)
    el.style.setProperty('--pointer-from-center', `${fromCenter}`)
    el.style.setProperty('--rotate-x', `${rotX}deg`)
    el.style.setProperty('--rotate-y', `${rotY}deg`)
    el.style.setProperty('--background-x', `${px}%`)
    el.style.setProperty('--background-y', `${py}%`)
    if (active) el.style.setProperty('--card-opacity', '1')
  }, [])

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = wrapRef.current?.getBoundingClientRect()
    if (!rect) return
    setVars(e.clientX, e.clientY, rect, true)
    shellRef.current?.classList.add('entering')
  }, [setVars])

  const onMouseLeave = useCallback(() => {
    const el = wrapRef.current
    if (!el) return
    el.style.setProperty('--card-opacity', '0')
    el.style.setProperty('--rotate-x', '0deg')
    el.style.setProperty('--rotate-y', '0deg')
    el.style.setProperty('--pointer-x', '50%')
    el.style.setProperty('--pointer-y', '50%')
    el.style.setProperty('--pointer-from-center', '0')
    el.style.setProperty('--background-x', '50%')
    el.style.setProperty('--background-y', '50%')
    cardRef.current?.classList.remove('active')
    shellRef.current?.classList.remove('entering')
  }, [])

  const onTouchMove = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    e.preventDefault()
    const touch = e.touches[0]
    const rect  = wrapRef.current?.getBoundingClientRect()
    if (!rect) return
    setVars(touch.clientX, touch.clientY, rect, true)
    cardRef.current?.classList.add('active')
    wrapRef.current?.classList.add('active')
  }, [setVars])

  const onTouchEnd = useCallback(() => {
    cardRef.current?.classList.remove('active')
    wrapRef.current?.classList.remove('active')
    onMouseLeave()
  }, [onMouseLeave])

  const wrapStyle: React.CSSProperties = {}
  if (innerGradient)    (wrapStyle as Record<string, string>)['--inner-gradient']   = innerGradient
  if (behindGlowColor)  (wrapStyle as Record<string, string>)['--behind-glow-color'] = behindGlowColor

  return (
    <div
      ref={wrapRef}
      className="pc-card-wrapper"
      style={wrapStyle}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Behind glow */}
      <div className="pc-behind" aria-hidden="true" />

      {/* Card shell + tilt */}
      <div ref={shellRef} className="pc-card-shell">
        <div ref={cardRef} className="pc-card">

          {/* Forest gradient fill */}
          <div className="pc-inside" aria-hidden="true" />

          {/* Holographic shimmer */}
          <div className="pc-shine" aria-hidden="true" />

          {/* Glare overlay */}
          <div className="pc-glare" aria-hidden="true" />

          {/* Avatar — full bleed bottom-anchored */}
          <div className="pc-content pc-avatar-content" aria-hidden="true">
            <Image
              className="avatar"
              src={avatarUrl}
              alt={name}
              width={480}
              height={560}
              priority
              draggable={false}
              style={{ objectFit: 'cover', objectPosition: 'top center' }}
            />
          </div>

          {/* Name + title */}
          <div className="pc-content" aria-hidden="true">
            <div className="pc-details">
              <h3>{name}</h3>
              <p>{title}</p>
            </div>
          </div>

          {/* Bottom info bar */}
          <div className="pc-user-info">
            <div className="pc-user-details">
              <div className="pc-mini-avatar">
                <Image
                  src={avatarUrl}
                  alt={name}
                  width={36}
                  height={36}
                  draggable={false}
                />
              </div>
              <div className="pc-user-text">
                <span className="pc-handle">@{handle}</span>
                <span className="pc-status">{status}</span>
              </div>
            </div>
            <button
              type="button"
              className="pc-contact-btn"
              onClick={onContactClick}
            >
              {contactText}
            </button>
          </div>

        </div>
      </div>
    </div>
  )
})

export { ProfileCard }

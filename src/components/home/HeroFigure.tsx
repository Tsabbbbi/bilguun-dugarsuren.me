// Left hero column — generative flow-field art behind an accent circle.
// See GenerativeFigure for the canvas sketch itself.

import { GenerativeFigure } from './GenerativeFigure'

export function HeroFigure() {
  return (
    <div className="relative flex h-full w-full items-end justify-center overflow-hidden">
      {/* Accent red circle — sits behind the figure */}
      <div
        className="absolute bottom-[-15%] left-1/2 aspect-square w-[85%] -translate-x-1/2 rounded-full bg-accent"
        aria-hidden="true"
      />

      {/* Generative art frame */}
      <div className="relative z-10 flex h-[78%] w-[58%] flex-col overflow-hidden border border-border bg-background/40 backdrop-blur-sm">
        <GenerativeFigure />
        <span className="text-label text-foreground/70 absolute bottom-3 left-3 z-10">
          FIG. 01 — GENERATIVE
        </span>
      </div>
    </div>
  )
}

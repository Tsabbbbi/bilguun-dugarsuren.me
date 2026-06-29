// Left hero column — illustrated figure with accent circle behind it.
// Phase 1: all placeholder. Replace with final SVG illustration in Phase 2.

export function PlaceholderFigure() {
  return (
    <div className="relative flex h-full w-full items-end justify-center overflow-hidden">
      {/* Accent red circle — sits behind the figure */}
      <div
        className="absolute bottom-[-15%] left-1/2 aspect-square w-[85%] -translate-x-1/2 rounded-full bg-accent"
        aria-hidden="true"
      />

      {/* Illustrated figure placeholder */}
      <div className="relative z-10 flex h-[78%] w-[58%] flex-col items-center justify-center border border-dashed border-border/60 bg-background/30 backdrop-blur-sm">
        <span className="text-label text-muted">illustrated</span>
        <span className="text-label text-muted">figure</span>
      </div>
    </div>
  )
}

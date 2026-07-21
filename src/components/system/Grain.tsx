// Subtle animated film-grain overlay. Pure CSS/SVG, no JS cost at runtime.
// Sits above content with mix-blend-mode so it reads as texture, not noise.

export function Grain() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[150] opacity-[0.035] mix-blend-soft-light"
    >
      <div
        className="grain-layer absolute -inset-[50%] h-[200%] w-[200%]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundRepeat: 'repeat',
        }}
      />
    </div>
  )
}

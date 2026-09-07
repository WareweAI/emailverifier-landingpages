/**
 * Homepage hero backdrop: primary wash + grain + fade to white (surface).
 * Parent must be `relative`. Extends above with -top-24 to blend under the header.
 */
export function HeroBackground() {
  return (
    <>
      <div
        className="pointer-events-none absolute inset-x-0 -top-24 bottom-0 z-0 bg-linear-to-b from-primary-soft from-0% via-primary-soft via-35% to-surface to-100%"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 -top-24 bottom-0 z-0 hero-grain opacity-[0.32] mix-blend-multiply"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-32 bg-linear-to-b from-transparent via-surface/70 to-surface md:h-40 lg:h-48"
        aria-hidden
      />
    </>
  );
}

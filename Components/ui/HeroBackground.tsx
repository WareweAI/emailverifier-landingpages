/**
 * Homepage hero backdrop: soft primary wash under the header.
 * Parent must be `relative`. Extends above with -top-24 to blend under the header.
 */
export function HeroBackground() {
  return (
    <div
      className="pointer-events-none absolute inset-x-0 -top-24 bottom-0 z-0 bg-linear-to-b from-primary-soft from-0% via-primary-soft/80 via-40% to-surface to-100%"
      aria-hidden
    />
  );
}

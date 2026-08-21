/**
 * Soft primary wash behind page heroes (matches homepage HeroScene).
 * Parent must be `relative`. Extends above with -top-24 to blend under the header.
 */
export function HeroWash() {
  return (
    <div
      className="pointer-events-none absolute inset-x-0 -top-24 bottom-0 z-0 bg-linear-to-b from-primary-soft via-primary-soft via-55% to-surface"
      aria-hidden
    />
  );
}

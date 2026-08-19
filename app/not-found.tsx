import Link from "next/link";
import { Button } from "@/Components/ui/Button";

export default function NotFound() {
  return (
    <main className="flex flex-1 items-center justify-center px-4 py-24">
      <div className="max-w-md text-center">
        <p className="text-sm font-medium text-primary">404</p>
        <h1 className="mt-2 font-display text-3xl font-semibold text-ink">
          Page not found
        </h1>
        <p className="mt-3 text-ink-muted">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild>
            <Link href="/">Go home</Link>
          </Button>
          <Button variant="secondary" asChild>
            <Link href="/validate-email">Free email verifier</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}

"use client";

import { REGISTER_URL } from "@/lib/api-snippet";
import { cn } from "@/lib/utils";
import { AtSign, Search, User } from "lucide-react";
import { useId } from "react";
import { Button } from "@/Components/ui/Button";
import { Input } from "@/Components/ui/Input";

function pushEvent(event: string, detail?: Record<string, unknown>) {
  if (typeof window !== "undefined" && window.dataLayer) {
    window.dataLayer.push({ event, ...detail });
  }
}

type FindEmailsFormProps = {
  location?: string;
  className?: string;
};

export default function FindEmailsForm({
  location = "hero",
  className,
}: FindEmailsFormProps) {
  const nameId = useId();
  const companyId = useId();

  return (
    <form
      action={REGISTER_URL}
      method="get"
      target="_blank"
      className={cn("w-full", className)}
      data-ev-loc={location}
      onSubmit={() => {
        pushEvent("hero_find_email_submit", { location });
      }}
    >
      <div className="flex flex-col gap-2 sm:flex-row">
        <div className="relative min-w-0 flex-1">
          <label htmlFor={nameId} className="sr-only">
            Full name
          </label>
          <User
            className="pointer-events-none absolute top-1/2 left-3.5 h-5 w-5 -translate-y-1/2 text-ink-muted"
            aria-hidden
          />
          <Input
            id={nameId}
            type="text"
            autoComplete="name"
            placeholder="Full name"
            required
            className="pl-11"
          />
        </div>
        <div className="relative min-w-0 flex-1">
          <label htmlFor={companyId} className="sr-only">
            Company domain or name
          </label>
          <AtSign
            className="pointer-events-none absolute top-1/2 left-3.5 h-5 w-5 -translate-y-1/2 text-ink-muted"
            aria-hidden
          />
          <Input
            id={companyId}
            type="text"
            autoComplete="organization"
            placeholder="@ Company domain or name"
            required
            className="pl-11"
          />
        </div>
        <Button
          type="submit"
          size="lg"
          className="min-h-12 w-full shrink-0 sm:w-auto"
        >
          <Search className="h-4 w-4" aria-hidden />
          Find Email
        </Button>
      </div>
      <p className="mt-3 text-sm text-ink-muted">
        Sign up to run the search — 100 free credits, no card.
      </p>
    </form>
  );
}

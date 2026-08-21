"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Copy } from "lucide-react";
import { Button } from "./Button";
import {
  API_DOCS_PATH,
  API_EXAMPLE_RESPONSE,
  API_SNIPPETS,
  REGISTER_URL,
  type ApiSnippetTab,
} from "@/lib/api-snippet";
import { cn } from "@/lib/utils";

function pushEvent(event: string) {
  if (typeof window !== "undefined" && window.dataLayer) {
    window.dataLayer.push({ event });
  }
}

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

type ApiSnippetProps = {
  showCtas?: boolean;
  showNote?: boolean;
  /** Fill parent height and clip overflow (for paired card mockups). */
  fillHeight?: boolean;
  className?: string;
};

export default function ApiSnippet({
  showCtas = true,
  showNote = true,
  fillHeight = false,
  className,
}: ApiSnippetProps) {
  const [tab, setTab] = useState<ApiSnippetTab>("curl");
  const [copied, setCopied] = useState(false);

  const responseJson = JSON.stringify(API_EXAMPLE_RESPONSE, null, 2);

  const handleCopy = async () => {
    const text =
      tab === "curl"
        ? API_SNIPPETS.curl
        : `${API_SNIPPETS.node}\n// Response fields match the example below`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      pushEvent("api_docs_click");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  const tabs: { id: ApiSnippetTab; label: string }[] = [
    { id: "curl", label: "curl" },
    { id: "node", label: "Node" },
  ];

  return (
    <div className={cn(fillHeight && "flex h-full min-h-0 flex-col", className)}>
      <div
        className={cn(
          "relative overflow-hidden rounded-2xl border border-line bg-ink text-primary-foreground",
          fillHeight && "flex min-h-0 flex-1 flex-col"
        )}
      >
        <div className="flex shrink-0 gap-1 border-b border-white/10 px-3 pt-2 text-xs font-medium">
          {tabs.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              className={cn(
                "cursor-pointer rounded-t-md px-3 py-1.5 transition-colors duration-200",
                tab === id ? "bg-white/10" : "text-white/70 hover:text-white"
              )}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="relative shrink-0">
          <button
            type="button"
            onClick={handleCopy}
            data-ev-event="api_docs_click"
            className="absolute right-3 top-3 inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-lg bg-white/10 px-3 text-xs font-semibold transition-colors duration-200 hover:bg-white/20"
            aria-label="Copy code snippet"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5" aria-hidden />
                Copied
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" aria-hidden />
                Copy
              </>
            )}
          </button>
          <pre className="overflow-x-auto p-4 font-mono text-sm leading-relaxed">
            <code>{API_SNIPPETS[tab]}</code>
          </pre>
        </div>
        <div
          className={cn(
            "border-t border-white/10 px-4 py-3",
            fillHeight && "min-h-0 flex-1 overflow-hidden"
          )}
        >
          <p className="mb-2 text-xs font-medium text-white/70">Example response</p>
          <pre className="overflow-x-auto font-mono text-xs leading-relaxed text-success-soft">
            <code>{responseJson}</code>
          </pre>
        </div>
      </div>
      {showNote ? (
        <p className="mt-3 text-sm text-ink-muted">
          Same credits as bulk. Exact endpoint URL is shown in your dashboard after
          you register.
        </p>
      ) : null}
      {showCtas && (
        <div className="mt-4 flex flex-wrap gap-3">
          <Button asChild size="md">
            <Link
              href={REGISTER_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-ev-event="cta_register_click"
            >
              Get API key
            </Link>
          </Button>
          <Button asChild variant="secondary" size="md">
            <Link href={API_DOCS_PATH} data-ev-event="api_docs_click">
              View API Docs
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}

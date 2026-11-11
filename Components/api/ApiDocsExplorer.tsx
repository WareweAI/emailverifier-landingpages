"use client";

import { useMemo, useState } from "react";
import {
  Check,
  Clock,
  Coins,
  Copy,
  KeyRound,
  MailCheck,
  Search,
  type LucideIcon,
} from "lucide-react";
import {
  API_PRODUCT_TABS,
  type ApiLang,
} from "@/lib/api-docs-content";
import { cn } from "@/lib/utils";

const PRODUCT_ICONS: Record<string, LucideIcon> = {
  verify: MailCheck,
  find: Search,
  account: KeyRound,
};

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

export default function ApiDocsExplorer() {
  const [productId, setProductId] = useState(API_PRODUCT_TABS[0].id);
  const [endpointId, setEndpointId] = useState(
    API_PRODUCT_TABS[0].endpoints[0].id,
  );
  const [lang, setLang] = useState<ApiLang>("curl");
  const [copied, setCopied] = useState(false);

  const product =
    API_PRODUCT_TABS.find((tab) => tab.id === productId) ?? API_PRODUCT_TABS[0];

  const endpoint = useMemo(() => {
    return (
      product.endpoints.find((item) => item.id === endpointId) ??
      product.endpoints[0]
    );
  }, [product, endpointId]);

  const selectProduct = (id: string) => {
    const next = API_PRODUCT_TABS.find((tab) => tab.id === id);
    if (!next) return;
    setProductId(id);
    setEndpointId(next.endpoints[0].id);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(endpoint.snippets[lang]);
      setCopied(true);
      pushEvent("api_docs_click");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  return (
    <div id="api-example" className="scroll-mt-28">
      <div className="rounded-2xl border border-primary/35 bg-primary-soft/60 p-1.5 sm:p-2">
        <div
          role="tablist"
          aria-label="API products"
          className="flex flex-col gap-1 sm:flex-row sm:flex-wrap"
        >
          {API_PRODUCT_TABS.map((tab) => {
            const Icon = PRODUCT_ICONS[tab.id] ?? MailCheck;
            const selected = tab.id === product.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => selectProduct(tab.id)}
                className={cn(
                  "inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                  selected
                    ? "bg-surface text-ink shadow-[var(--shadow-card)]"
                    : "text-ink-muted hover:bg-surface/70 hover:text-ink",
                )}
              >
                <Icon className="h-4 w-4 shrink-0" aria-hidden />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-4 overflow-hidden rounded-2xl border border-line bg-surface shadow-[var(--shadow-card)] lg:grid lg:grid-cols-[16rem_minmax(0,1fr)]">
        <nav
          aria-label={`${product.label} endpoints`}
          className="border-b border-line bg-surface-muted/50 p-3 lg:border-r lg:border-b-0"
        >
          <ul className="space-y-1">
            {product.endpoints.map((item) => {
              const selected = item.id === endpoint.id;
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => setEndpointId(item.id)}
                    className={cn(
                      "w-full rounded-xl px-3 py-3 text-left transition-colors",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                      selected
                        ? "bg-primary-soft text-ink"
                        : "text-ink-muted hover:bg-surface hover:text-ink",
                    )}
                    aria-current={selected ? "page" : undefined}
                  >
                    <span className="block text-sm font-semibold text-ink">
                      {item.title}
                    </span>
                    <span className="mt-0.5 block text-xs leading-snug text-ink-muted">
                      {item.summary}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="min-w-0 p-5 sm:p-6">
          <h2 className="font-display text-2xl font-semibold tracking-tight text-ink">
            {endpoint.title}
          </h2>
          <p className="mt-2 text-ink-muted">{endpoint.description}</p>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-line bg-background px-4 py-3">
              <p className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-ink-muted">
                <Coins className="h-3.5 w-3.5" aria-hidden />
                Credits
              </p>
              <p className="mt-1 font-semibold text-ink">{endpoint.credits}</p>
            </div>
            {endpoint.timeout ? (
              <div className="rounded-xl border border-line bg-background px-4 py-3">
                <p className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-ink-muted">
                  <Clock className="h-3.5 w-3.5" aria-hidden />
                  Timeout
                </p>
                <p className="mt-1 font-semibold text-ink">{endpoint.timeout}</p>
              </div>
            ) : null}
          </div>

          <p className="mt-5 font-mono text-xs font-semibold tracking-wide text-ink-muted">
            <span className="text-primary">{endpoint.method}</span>{" "}
            {endpoint.path}
          </p>

          <div className="mt-4 overflow-hidden rounded-2xl border border-line bg-ink text-primary-foreground">
            <div className="flex items-center justify-between gap-2 border-b border-white/10 px-3 pt-2">
              <div
                role="tablist"
                aria-label="Code language"
                className="flex gap-1 text-xs font-medium"
              >
                {(
                  [
                    { id: "curl", label: "curl" },
                    { id: "node", label: "Node" },
                  ] as const
                ).map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={lang === tab.id}
                    onClick={() => setLang(tab.id)}
                    className={cn(
                      "cursor-pointer rounded-t-md px-3 py-1.5 transition-colors",
                      lang === tab.id
                        ? "bg-white/10"
                        : "text-white/70 hover:text-white",
                    )}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={handleCopy}
                data-ev-event="api_docs_click"
                className="mb-1 inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-lg bg-white/10 px-3 text-xs font-semibold transition-colors hover:bg-white/20"
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
            </div>
            <div className="overflow-x-auto whitespace-pre p-4 font-mono text-sm leading-relaxed">
              <code>{endpoint.snippets[lang]}</code>
            </div>
            <div className="border-t border-white/10 px-4 py-3">
              <p className="mb-2 text-xs font-medium text-white/70">
                Example response
              </p>
              <div className="max-h-56 overflow-auto whitespace-pre font-mono text-xs leading-relaxed text-success-soft">
                <code>{endpoint.responseExample}</code>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

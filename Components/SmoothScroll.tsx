"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { gsap, useGSAP, ScrollTrigger, ScrollSmoother } from "@/lib/gsap";

/**
 * ScrollSmoother runs when motion is allowed. Touch stays native via
 * `smoothTouch: false` — finger-drag is not lagged. With reduced motion
 * (e.g. Windows Animation effects off), native scroll is preserved.
 */
const ENABLE_QUERY = "(prefers-reduced-motion: no-preference)";

/** Seconds for content to catch up to native scroll (wheel / trackpad). */
const SMOOTH_SECONDS = 0.85;

/** Offset for in-page hash targets (header is in normal flow, not fixed). */
const HEADER_SCROLL_POS = "top top";

function samePageHash(href: string): string | null {
  let url: URL;
  try {
    url = new URL(href, window.location.href);
  } catch {
    return null;
  }
  if (url.origin !== window.location.origin) return null;
  if (url.pathname !== window.location.pathname) return null;
  return url.hash || null;
}

function syncToRoute() {
  const smoother = ScrollSmoother.get();
  const hash = window.location.hash;

  if (smoother) {
    if (hash && document.querySelector(hash)) {
      smoother.scrollTo(hash, false, HEADER_SCROLL_POS);
    } else {
      smoother.scrollTop(window.scrollY || 0);
    }
  }

  ScrollTrigger.refresh();
}

export default function SmoothScroll({
  header,
  children,
}: {
  header: ReactNode;
  children: ReactNode;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useGSAP(
    () => {
      const wrapper = wrapperRef.current;
      const content = contentRef.current;
      if (!wrapper || !content) return;

      const mm = gsap.matchMedia();

      mm.add(ENABLE_QUERY, () => {
        ScrollSmoother.get()?.kill();

        const smoother = ScrollSmoother.create({
          wrapper,
          content,
          smooth: SMOOTH_SECONDS,
          effects: false,
          smoothTouch: false,
          ignoreMobileResize: true,
        });

        // Child ScrollTriggers (How It Works pin, header hide) are created in
        // descendant layout effects, which run first. Refresh so they pick up
        // the smoother scroller.
        ScrollTrigger.refresh();

        document.documentElement.classList.remove("scroll-smooth");
        document.documentElement.dataset.smoothScroll = "on";

        const onClick = (event: MouseEvent) => {
          if (event.defaultPrevented || event.button !== 0) return;
          if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
            return;
          }

          const anchor = (event.target as Element | null)?.closest("a");
          if (
            !anchor ||
            anchor.target === "_blank" ||
            anchor.hasAttribute("download")
          ) {
            return;
          }

          const href = anchor.getAttribute("href");
          if (!href) return;

          const hash = samePageHash(href);
          if (!hash) return;

          const target = document.querySelector(hash);
          if (!target) return;

          event.preventDefault();
          smoother.scrollTo(target, true, HEADER_SCROLL_POS);
          if (window.location.hash !== hash) {
            history.pushState(null, "", hash);
          }
        };

        const onHashChange = () => {
          const hash = window.location.hash;
          if (hash && document.querySelector(hash)) {
            smoother.scrollTo(hash, true, HEADER_SCROLL_POS);
          }
        };

        let alive = true;
        const refreshIfAlive = () => {
          if (alive) ScrollTrigger.refresh();
        };

        void document.fonts?.ready.then(refreshIfAlive);
        if (document.readyState === "complete") {
          refreshIfAlive();
        } else {
          window.addEventListener("load", refreshIfAlive);
        }

        document.addEventListener("click", onClick, true);
        window.addEventListener("hashchange", onHashChange);

        if (window.location.hash) {
          requestAnimationFrame(() => syncToRoute());
        }

        return () => {
          alive = false;
          window.removeEventListener("load", refreshIfAlive);
          document.removeEventListener("click", onClick, true);
          window.removeEventListener("hashchange", onHashChange);
          document.documentElement.classList.add("scroll-smooth");
          delete document.documentElement.dataset.smoothScroll;
          smoother.kill();
        };
      });

      return () => mm.revert();
    },
    { scope: wrapperRef }
  );

  useEffect(() => {
    const id = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(syncToRoute);
    });
    return () => window.cancelAnimationFrame(id);
  }, [pathname]);

  return (
    <>
      <div
        id="smooth-wrapper"
        ref={wrapperRef}
        className="flex min-h-0 w-full flex-1 flex-col"
      >
        <div id="smooth-content" ref={contentRef} className="w-full">
          {header}
          {children}
        </div>
      </div>
    </>
  );
}

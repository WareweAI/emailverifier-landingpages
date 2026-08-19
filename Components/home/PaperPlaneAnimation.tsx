"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

const ANIMATION_CONFIG = {
  duration: 15,
  pathOpacity: 0.28,
  checkpointDuration: 0.35,
} as const;

const DEMO_EMAIL = "maya@studio.co";

/** Nose tip in the 36×36 plane SVG — used as MotionPath alignOrigin. */
const PLANE_NOSE_ORIGIN: [number, number] = [32 / 36, 6 / 36];

/** Plane forward axis vs path tangent — tuned so body centerline follows the path. */
const PLANE_PATH_ROTATION_OFFSET = -10;

const FLIGHT_PATH =
  "M 1008 508 C 1048 448 1082 372 1094 292 C 1102 244 1076 208 1038 196";

function PaperPlaneIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden>
      <path
        className="plane-body"
        d="M4 16.5 32 6 18.5 31.5 16 20.5 4 16.5Z"
        fill="var(--color-surface)"
        stroke="var(--color-primary)"
        strokeWidth="1.25"
        strokeLinejoin="round"
      />
      <path
        className="plane-fold"
        d="M16 20.5 32 6 22 21.5 16 20.5Z"
        fill="var(--color-primary-soft)"
        stroke="var(--color-primary)"
        strokeWidth="1.25"
        strokeLinejoin="round"
        opacity="0.95"
      />
      <path
        className="plane-detail"
        d="M16 20.5 32 6"
        stroke="var(--color-primary)"
        strokeWidth="1.1"
        strokeLinecap="round"
        opacity="0.55"
      />
    </svg>
  );
}

export default function PaperPlaneAnimation() {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set("[data-plane-desktop]", {
          autoAlpha: 0,
        });
        gsap.set(
          "[data-email-token], [data-check], [data-ready], [data-csv], [data-api], [data-frag], [data-flight-path]",
          { autoAlpha: 0 }
        );
      });

      mm.add(
        "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        () => {
          const plane = root.querySelector<HTMLElement>("[data-plane-desktop]");
          const path = root.querySelector<SVGPathElement>("[data-flight-path]");
          const token = root.querySelector<HTMLElement>("[data-email-token]");
          const tokenText = root.querySelector<HTMLElement>("[data-token-text]");
          const checks = gsap.utils.toArray<HTMLElement>("[data-check]", root);
          const ready = root.querySelector<HTMLElement>("[data-ready]");
          const csv = root.querySelector<HTMLElement>("[data-csv]");
          const api = root.querySelector<HTMLElement>("[data-api]");
          const frags = gsap.utils.toArray<HTMLElement>("[data-frag]", root);
          const cap = gsap.utils.toArray<HTMLElement>("[data-cap]", root);

          if (!plane || !path || !token || !tokenText || !ready || !csv || !api) {
            return;
          }

          const planePath = (start: number, end: number) => ({
            path,
            align: path,
            alignOrigin: PLANE_NOSE_ORIGIN,
            autoRotate: PLANE_PATH_ROTATION_OFFSET,
            start,
            end,
          });

          gsap.set(plane, {
            autoAlpha: 0,
          });
          gsap.set([token, ready, csv, api, ...checks, ...frags, ...cap], {
            autoAlpha: 0,
          });
          gsap.set(path, {
            autoAlpha: 0,
          });

          const loop = gsap.timeline({
            repeat: -1,
            defaults: { ease: "power2.inOut" },
          });

          loop.addLabel("rest", 0);

          loop.addLabel("email", 1.5);
          loop.fromTo(
            token,
            { autoAlpha: 0, x: -12, y: 8 },
            { autoAlpha: 1, x: 0, y: 0, duration: 0.4, ease: "power2.out" },
            "email"
          );
          loop.to(
            token,
            { x: 28, y: -10, duration: 0.5, ease: "power2.in" },
            "email+=0.5"
          );
          loop.to(
            tokenText,
            { autoAlpha: 0, duration: 0.15 },
            "email+=0.95"
          );
          loop.set(tokenText, { textContent: "✓" }, "email+=1.1");
          loop.to(tokenText, { autoAlpha: 1, duration: 0.15 }, "email+=1.1");
          loop.to(token, { autoAlpha: 0, duration: 0.25 }, "email+=1.35");

          loop.addLabel("verify", 3);
          checks.forEach((el, i) => {
            loop.fromTo(
              el,
              { autoAlpha: 0, y: 6 },
              {
                autoAlpha: 1,
                y: 0,
                duration: ANIMATION_CONFIG.checkpointDuration,
                ease: "power2.out",
              },
              `verify+=${i * 0.45}`
            );
            loop.to(el, { autoAlpha: 0.35, duration: 0.4 }, `verify+=${i * 0.45 + 0.5}`);
          });

          loop.addLabel("takeoff", 4.5);

          loop.addLabel("capabilities", 6);
          cap.forEach((el, i) => {
            loop.fromTo(
              el,
              { autoAlpha: 0, y: 4 },
              { autoAlpha: 0.9, y: 0, duration: 0.3 },
              `capabilities+=${i * 0.18}`
            );
          });
          frags.forEach((el, i) => {
            loop.fromTo(
              el,
              { autoAlpha: 0, x: 0, y: 0, scale: 0.6 },
              {
                autoAlpha: 0.8,
                x: (i - 1) * 14,
                y: 10 + i * 4,
                scale: 1,
                duration: 0.35,
                ease: "power2.out",
              },
              "capabilities+=0.2"
            );
            loop.to(el, { autoAlpha: 0, y: 0, x: 0, duration: 0.4 }, "capabilities+=0.7");
          });

          loop.addLabel("bulk", 8);
          loop.fromTo(
            csv,
            { autoAlpha: 0, y: 8 },
            { autoAlpha: 1, y: 0, duration: 0.35, ease: "power2.out" },
            "bulk"
          );
          loop.to(csv, { autoAlpha: 0, y: -6, duration: 0.35 }, "bulk+=1.2");
          loop.to(cap, { autoAlpha: 0, duration: 0.3 }, "bulk+=1.1");

          loop.addLabel("api", 9.5);
          loop.fromTo(
            api,
            { autoAlpha: 0, x: -8 },
            { autoAlpha: 1, x: 0, duration: 0.3, ease: "power2.out" },
            "api"
          );
          loop.to(api, { autoAlpha: 0, duration: 0.3 }, "api+=1.1");

          loop.addLabel("complete", 11);
          loop.fromTo(
            ready,
            { autoAlpha: 0, y: 6 },
            { autoAlpha: 1, y: 0, duration: 0.4, ease: "power2.out" },
            "complete"
          );
          loop.to(
            [ready, ...checks],
            { autoAlpha: 0, duration: 0.5 },
            "complete+=1.1"
          );

          loop.addLabel("reset", 13);
          loop.set(tokenText, { textContent: DEMO_EMAIL }, "reset+=1.5");

          const playVerifyHook = (email: string) => {
            loop.pause();
            if (tokenText) tokenText.textContent = email;
            const hook = gsap.timeline({
              onComplete: () => {
                loop.progress(0);
                loop.play();
              },
            });
            gsap.set(token, { autoAlpha: 1, x: 0, y: 0 });
            hook.to(token, { x: 28, y: -10, duration: 0.4, ease: "power2.in" });
            hook.to(token, { autoAlpha: 0, duration: 0.2 });
            checks.forEach((el, i) => {
              hook.fromTo(
                el,
                { autoAlpha: 0, y: 4 },
                { autoAlpha: 1, y: 0, duration: 0.25 },
                0.5 + i * 0.28
              );
            });
            hook.fromTo(ready, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3 }, 1.8);
            hook.to([ready, ...checks], { autoAlpha: 0, duration: 0.4, delay: 0.6 });
            hook.set(tokenText, { textContent: DEMO_EMAIL });
          };

          const onHeroVerify = (event: Event) => {
            const detail = (event as CustomEvent<{ email?: string }>).detail;
            const next = detail?.email?.trim();
            if (!next) return;
            playVerifyHook(next.length > 22 ? `${next.slice(0, 20)}…` : next);
          };

          window.addEventListener("hero-verify-start", onHeroVerify);
          return () => {
            window.removeEventListener("hero-verify-start", onHeroVerify);
            loop.kill();
          };
        }
      );

      return () => mm.revert();
    },
    { scope }
  );

  return (
    <div
      ref={scope}
      className="pointer-events-none absolute inset-0 z-[2] overflow-hidden"
      aria-hidden
    >
      <svg
        className="absolute inset-0 hidden h-full w-full lg:block"
        viewBox="0 0 1200 720"
        fill="none"
        preserveAspectRatio="xMaxYMid meet"
      >
        <path
          data-flight-path
          d={FLIGHT_PATH}
          stroke="var(--color-primary)"
          strokeWidth="1.25"
          strokeLinecap="round"
          opacity={ANIMATION_CONFIG.pathOpacity}
        />
      </svg>

      <div className="absolute inset-0 hidden lg:block">
        <div
          data-plane-desktop
          className="absolute will-change-transform"
          style={{
            left: "84%",
            top: "70%",
            transformOrigin: `${PLANE_NOSE_ORIGIN[0] * 100}% ${PLANE_NOSE_ORIGIN[1] * 100}%`,
          }}
        >
          <PaperPlaneIcon />
        </div>

        <div
          data-email-token
          className="absolute left-[72%] top-[68%] rounded-full border border-line bg-surface px-2 py-0.5 text-[10px] font-medium text-ink shadow-[var(--shadow-card)]"
        >
          <span data-token-text>{DEMO_EMAIL}</span>
        </div>

        <p
          data-check
          className="absolute left-[78%] top-[58%] text-[10px] font-medium text-success"
        >
          ✓ Syntax
        </p>
        <p
          data-check
          className="absolute left-[81%] top-[50%] text-[10px] font-medium text-success"
        >
          ✓ MX
        </p>
        <p
          data-check
          className="absolute left-[84%] top-[42%] text-[10px] font-medium text-success"
        >
          ✓ Mailbox
        </p>

        <p
          data-cap
          className="absolute left-[88%] top-[28%] text-[10px] text-ink-muted"
        >
          Single ✓
        </p>
        <p
          data-cap
          className="absolute left-[76%] top-[32%] text-[10px] text-ink-muted"
        >
          Bulk ✓
        </p>
        <p
          data-cap
          className="absolute left-[82%] top-[22%] text-[10px] text-ink-muted"
        >
          API ✓
        </p>

        <span
          data-frag
          className="absolute left-[84%] top-[36%] h-1.5 w-2 rounded-[1px] bg-primary/40"
        />
        <span
          data-frag
          className="absolute left-[84%] top-[36%] h-1.5 w-2 rounded-[1px] bg-primary/30"
        />
        <span
          data-frag
          className="absolute left-[84%] top-[36%] h-1.5 w-2 rounded-[1px] bg-primary/20"
        />

        <div
          data-csv
          className="absolute left-[70%] top-[40%] rounded-lg border border-line bg-surface px-2 py-1.5 text-[9px] leading-tight text-ink shadow-[var(--shadow-card)]"
        >
          <p className="font-medium text-ink-muted">email_list.csv</p>
          <p>
            maya@studio.co <span className="text-success">✓</span>
          </p>
          <p>
            info@agency.io <span className="text-warning">!</span>
          </p>
          <p>
            bounce@old.host <span className="text-danger">×</span>
          </p>
        </div>

        <p
          data-api
          className="absolute left-[86%] top-[34%] font-mono text-[10px] text-ink-muted"
        >
          → /verify
          <span className="ml-1 text-success">200 ✓</span>
        </p>

        <p
          data-ready
          className="absolute left-[80%] top-[24%] text-[11px] font-semibold text-ink"
        >
          Ready to send ✓
        </p>
      </div>
    </div>
  );
}

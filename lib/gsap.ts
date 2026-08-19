"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother, MotionPathPlugin);

export { gsap, useGSAP, ScrollTrigger, ScrollSmoother, MotionPathPlugin };

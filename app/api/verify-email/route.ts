import { Redis } from "@upstash/redis";
import { NextRequest, NextResponse } from "next/server";

const REOON_VERIFY_URL = "https://emailverifier.reoon.com/api/v1/verify";
const DAILY_LIMIT = 100;
const REDIS_KEY_PREFIX = "email-verifier:daily:";

function getTodayKey(): string {
    return new Date().toISOString().slice(0, 10); // YYYY-MM-DD
}

function getRedis(): Redis | null {
    const url = process.env.UPSTASH_REDIS_REST_URL || 'https://tender-shepherd-28783.upstash.io';
    const token = process.env.UPSTASH_REDIS_REST_TOKEN || 'AXBvAAIncDJmMzA3OGRhNmI4NDQ0MWI5OGViYTE5MjY4YTA2NTM1ZXAyMjg3ODM';
    if (!url || !token) return null;
    return new Redis({ url, token });
}

/** Returns true if request is within daily limit (and increments count). Returns false if limit reached. */
async function checkAndIncrementDailyLimit(): Promise<boolean> {
    const redis = getRedis();
    if (!redis) return true; // no Redis: allow (or could return false to require Redis)

    const key = REDIS_KEY_PREFIX + getTodayKey();
    const count = await redis.incr(key);

    // Set TTL to 2 days so the key expires (only on first increment for this day)
    if (count === 1) await redis.expire(key, 86400 * 2);

    if (count > DAILY_LIMIT) {
        await redis.decr(key);
        return false;
    }
    return true;
}

export async function GET(request: NextRequest) {
    const email = request.nextUrl.searchParams.get("email");
    const key = process.env.REOON_VERIFIER_KEY || 'fQnnY54shEtQ7TV2Xvyu3ZHeRBR8aHtw';

    if (!email?.trim()) {
        return NextResponse.json(
            { error: "Email is required" },
            { status: 400 }
        );
    }

    if (!key) {
        return NextResponse.json(
            { error: "Verification service is not configured" },
            { status: 503 }
        );
    }

    const withinLimit = await checkAndIncrementDailyLimit();
    if (!withinLimit) {
        return NextResponse.json(
            { error: "Daily verification limit reached (100 per day). Please try again tomorrow." },
            { status: 429 }
        );
    }

    const url = `${REOON_VERIFY_URL}?email=${encodeURIComponent(email.trim())}&key=${encodeURIComponent(key)}&mode=power`;

    try {
        const res = await fetch(url, { method: "GET" });
        const data = await res.json().catch(() => ({}));

        if (!res.ok) {
            return NextResponse.json(
                { error: data?.message ?? "Verification failed" },
                { status: res.status }
            );
        }

        return NextResponse.json(data);
    } catch (err) {
        return NextResponse.json(
            { error: "Verification request failed" },
            { status: 502 }
        );
    }
}

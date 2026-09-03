import type { NextConfig } from "next";

function wordpressImageHost(): string | undefined {
  const apiUrl = process.env.NEXT_PUBLIC_WORDPRESS_API_URL?.trim();
  if (!apiUrl) return undefined;
  try {
    return new URL(apiUrl).hostname;
  } catch {
    return undefined;
  }
}

const wpHost = wordpressImageHost();

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      ...(wpHost
        ? [
            {
              protocol: "https" as const,
              hostname: wpHost,
            },
            {
              protocol: "http" as const,
              hostname: wpHost,
            },
          ]
        : []),
      {
        protocol: "https",
        hostname: "secure.gravatar.com",
      },
      {
        protocol: "https",
        hostname: "i0.wp.com",
      },
      {
        protocol: "https",
        hostname: "i1.wp.com",
      },
      {
        protocol: "https",
        hostname: "i2.wp.com",
      },
    ],
  },
};

export default nextConfig;

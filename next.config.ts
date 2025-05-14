import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https", // specify protocol if needed
        hostname: "kolyhonujldeyljtvgvc.supabase.co", // your external domain here
        pathname: "/storage/v1/object/public/**", // optional: specify a pattern for paths
      },
    ],
  },
  /* config options here */
};

export default nextConfig;

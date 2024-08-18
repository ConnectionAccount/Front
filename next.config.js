/** @type {import('next').NextConfig} */

const isDevelopment = process.env.NODE_ENV !== "production";
const rewritesConfig = isDevelopment
  ? [
      // {
      //   source: "/:path*/aut/app/:path*",
      //   destination: `${process.env.NEXT_PUBLIC_AUTH_API_HOST}/app/:path*`,
      // },
      // {
      //   source: "/:path*/cus/api/:path*",
      //   destination: `${process.env.NEXT_PUBLIC_CUSTOMER_API_HOST}/api/:path*`,
      // },
      // {
      //   source: "/:path*/med/api/:path*",
      //   destination: `${process.env.NEXT_PUBLIC_MEDIA_API_HOST}/api/:path*`,
      // },
      {
        // source: "/:path*/res/api/:path*",
        source: "/:path*/api/:path*",
        destination: `${process.env.NEXT_PUBLIC_RECEPTION_API_HOST}/api/:path*`,
      },
      {
        source: "/:path*/med/api/:path*",
        // source: "/:path*/api/:path*",
        destination: `${process.env.NEXT_PUBLIC_MEDIA_API_HOST}/api/:path*`,
      },
      // {
      //   source: "/rest/:path*",
      //   destination: `${process.env.NEXT_PUBLIC_DEV_API_HOST}/:path*`,
      // },
    ]
  : [];

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig = {
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    optimizePackageImports: [
      "@mantine/core",
      "@mantine/hooks",
      "@mantine/modals",
      "@mantine/dates",
    ],
  },
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dev-goodtech.s3.ap-southeast-1.amazonaws.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "randomuser.me",
        port: "",
        pathname: "/api/**",
      },
    ],
  },
  rewrites: async () => rewritesConfig,
};

module.exports = withBundleAnalyzer(nextConfig);

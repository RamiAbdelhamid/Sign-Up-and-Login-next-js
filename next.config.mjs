/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true, // Enables the new app directory features (like the new router).
  },
  reactStrictMode: true, // Ensures React Strict Mode is enabled.
  async redirects() {
    return [
      {
        source: "/old-page", // Redirect example
        destination: "/new-page",
        permanent: true,
      },
    ];
  },
  middleware: {
    // Here, we are specifying the middleware for authentication protection
    "/api/auth/*": ["middleware"], // Use the middleware only for auth API routes
  },
  images: {
    domains: ["example.com"], // Allows loading images from external domains
  },
};

export default nextConfig;

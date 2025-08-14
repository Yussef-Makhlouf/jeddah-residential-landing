/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Admin panel specific configuration
  // async redirects() {
  //   return [
  //            {
  //        source: '/',
  //        destination: '/',
  //        permanent: true,
  //      },
  //   ]
  // },
}

export default nextConfig

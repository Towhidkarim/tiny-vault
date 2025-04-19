import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    reactCompiler: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hqu5dftak8.ufs.sh',
        pathname: '/f/*',
      },
    ],
  },
};

export default nextConfig;

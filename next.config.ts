import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  agentRules: false,
  images: {
    // Miniaturas dos vídeos da seção "Do canal".
    remotePatterns: [{ protocol: 'https', hostname: 'i.ytimg.com' }],
  },
}

export default nextConfig

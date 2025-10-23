/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
            },
        ],
        formats: ['image/avif', 'image/webp'],
    },
    // Enable compiler optimizations
    compiler: {
        removeConsole: process.env.NODE_ENV === 'production',
    },
    // Enable React strict mode for better performance warnings
    reactStrictMode: true,
    // Experimental optimizations
    experimental: {
        optimizePackageImports: ['lucide-react', 'react-hot-toast'],
    },
};

export default nextConfig;

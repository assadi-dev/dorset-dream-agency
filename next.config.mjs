/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        API_URL: "http://localhost:3000/api",
    },

    eslint: {
        ignoreDuringBuilds: true,
    },
    reactStrictMode: false,
    images: {
        remotePatterns: [
            {
                hostname: "plus.unsplash.com",
            },
            {
                hostname: "images.pexels.com",
            },
            {
                hostname: "swiperjs.com",
            },
            {
                hostname: "localhost",
            },
        ],
    },
};

export default nextConfig;

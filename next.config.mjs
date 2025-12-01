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
            {
                hostname: "dorsetdreamagencyflashback.com",
            },
            {
                hostname: "demo.dorsetdreamagencyflashback.com",
            },
            {
                hostname: "images.unsplash.com",
            },
            {
                hostname: "fonts.googleapis.com",
            },
            {
                hostname: "mdt.dynasty8flashback.fr",
            },
            {
                hostname: "dev.dynasty8flashback.fr",
            },
        ],
    },
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            { hostname: 'raw.githubusercontent.com' },
            { hostname: 'static.wikia.nocookie.net' },
        ],
    },
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'joppin.ir',
            },
            ]
    }
};

export default nextConfig;

const withVercelToolbar = (
    await import('@vercel/toolbar/plugins/next')
).default();

/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        reactCompiler: true
    }
};

const withToolbarConfig = withVercelToolbar(nextConfig);

export default withToolbarConfig;

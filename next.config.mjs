const withVercelToolbar = (
    await import('@vercel/toolbar/plugins/next')
).default();

/** @type {import('next').NextConfig} */
const nextConfig = {
};

const withToolbarConfig = withVercelToolbar(nextConfig);

export default withToolbarConfig;

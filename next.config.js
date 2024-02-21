/** @type {import('next').NextConfig} */

const nextConfig = {
  swcMinify: true,
  basePath: process.env.NEXT_PUBLIC_BASE_PATH,
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH,
  images: {
    domains: [
      'images.unsplash.com',
      'i.ibb.co',
      'scontent.fotp8-1.fna.fbcdn.net',
    ],
    // Make ENV
    unoptimized: true,
  },
  env: {
    NEXT_BACKEND_BASE_URL: process.env.NEXT_BACKEND_BASE_URL,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXT_AWS_REGION: process.env.NEXT_AWS_REGION,
    NEXT_USER_POOL_ID: process.env.NEXT_USER_POOL_ID,
    NEXT_URL_POOL_ARN: process.env.NEXT_URL_POOL_ARN,
    NEXT_USER_POOL_CLIENT_ID: process.env.NEXT_USER_POOL_CLIENT_ID,
    NEXT_USER_POOL_IDENTITY_POOL_ID:
      process.env.NEXT_USER_POOL_IDENTITY_POOL_ID,
    NEXT_USER_POOL_IDENTITY_POOL_ARN:
      process.env.NEXT_USER_POOL_IDENTITY_POOL_ARN,
    NEXT_REDIRECT_LOGNIN_URL: process.env.NEXT_REDIRECT_LOGNIN_URL,
    NEXT_REDIRECT_LOGOUT_URL: process.env.NEXT_REDIRECT_LOGOUT_URL,
    NEXT_TINYMCE_API_KEY: process.env.NEXT_TINYMCE_API_KEY,
  },
};

// module.exports = withTM(nextConfig);
module.exports = nextConfig;

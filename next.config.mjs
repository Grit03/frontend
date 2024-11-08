/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["t-shirt-design-bucket.s3.ap-northeast-2.amazonaws.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.icons8.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Fully static site: `next build` writes plain HTML/CSS/JS to ./out
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;

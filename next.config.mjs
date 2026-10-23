/** @type {import('next').NextConfig} */
const nextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  experimental: {
    // Put the (purged, about 7 KB gzipped) CSS straight into the HTML instead
    // of a separate render blocking stylesheet request. Best for a one page
    // site where most visitors are first time visitors.
    inlineCss: true,
  },
};

export default nextConfig;

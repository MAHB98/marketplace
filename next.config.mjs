import { hostname } from "os";

/** @type {import('next').NextConfig} */

const nextConfig = {
 experimental: {
  serverActions: {
   bodySizeLimit: "10mb",
  },
 },
 images: {
  remotePatterns: [
   {
    protocol: "https",
    hostname: "avatars.githubusercontent.com",
   },
   {
    protocol: "https",
    hostname: "lh3.googleusercontent.com",
   },
   {
    protocol: "https",
    hostname: "upcdn.io",
   },
   {
    protocol: "https",
    hostname: "ik.imagekit.io",
   },
  ],
 },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Menambahkan konfigurasi untuk optimasi gambar Next.js
  images: {
    // Mendaftarkan domain eksternal yang diizinkan untuk gambar
    domains: ['img.youtube.com', 'placehold.co'],
  },
};

export default nextConfig;
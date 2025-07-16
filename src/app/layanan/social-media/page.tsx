// src/app/layanan/social-media/page.tsx
import type { Metadata } from 'next';
import Development from "@/components/Development";

// Metadata spesifik yang dioptimalkan untuk Halaman Social Media Management
export const metadata: Metadata = {
  title: "Jasa Social Media Management Profesional - Kami Kreatif",
  description: "Bangun komunitas dan tingkatkan engagement dengan jasa social media management dari Kami Kreatif. Kami membuat strategi konten yang menarik dan relevan untuk brand Anda.",
  // Menentukan URL kanonis untuk halaman ini, penting untuk SEO
  alternates: {
    canonical: '/layanan/social-media',
  },
};

export default function SocialMediaPage() {
  return (
    <main className="bg-white text-gray-800">
      <Development />
      {/* Komponen lain untuk halaman ini bisa ditambahkan di sini */}
    </main>
  );
}
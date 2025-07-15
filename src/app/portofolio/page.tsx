// src/app/portofolio/page.tsx
import type { Metadata } from 'next';
import Development from "@/components/Development";

// Metadata spesifik yang dioptimalkan untuk Halaman Portofolio
export const metadata: Metadata = {
  title: "Portofolio Kami - Studi Kasus & Hasil Kerja Kami Kreatif",
  description: "Jelajahi portofolio proyek Kami Kreatif. Lihat studi kasus dari berbagai industri, termasuk desain website, digital marketing, dan pengembangan tools custom.",
  // Menentukan URL kanonis untuk halaman ini, penting untuk SEO
  alternates: {
    canonical: '/portofolio',
  },
};

export default function PortofolioPage() {
  return (
    <main className="bg-white text-gray-800">
      <Development />
    </main>
  );
}
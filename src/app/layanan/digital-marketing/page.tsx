// src/app/layanan/digital-marketing/page.tsx
import type { Metadata } from 'next';
import Development from "@/components/Development";

// Metadata spesifik yang dioptimalkan untuk Halaman Digital Marketing
export const metadata: Metadata = {
  title: "Jasa Digital Marketing & SEO Profesional - Kami Kreatif",
  description: "Tingkatkan visibilitas dan penjualan dengan jasa digital marketing dari Kami Kreatif. Kami menawarkan strategi SEO, SEM, dan iklan sosial media yang terukur.",
  // Menentukan URL kanonis untuk halaman ini, penting untuk SEO
  alternates: {
    canonical: '/layanan/digital-marketing',
  },
};

export default function DigitalMarketingPage() {
  return (
    <main className="bg-white text-gray-800">
      <Development />
      {/* Komponen lain untuk halaman ini bisa ditambahkan di sini */}
    </main>
  );
}
// src/app/layanan/tools-automasi/page.tsx
import type { Metadata } from 'next';
import Development from "@/components/Development";

// Metadata spesifik yang dioptimalkan untuk Halaman Tools & Automasi
export const metadata: Metadata = {
  title: "Jasa Pengembangan Tools & Automasi - Kami Kreatif",
  description: "Efisiensikan proses bisnis Anda dengan pengembangan tools dan sistem automasi custom dari Kami Kreatif. Solusi untuk dashboard, laporan, dan alur kerja.",
  // Menentukan URL kanonis untuk halaman ini, penting untuk SEO
  alternates: {
    canonical: '/layanan/tools-automasi',
  },
};

export default function ToolsAutomasiPage() {
  return (
    <main className="bg-white text-gray-800">
      <Development />
      {/* Komponen lain untuk halaman ini bisa ditambahkan di sini */}
    </main>
  );
}
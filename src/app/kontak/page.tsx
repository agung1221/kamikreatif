// src/app/kontak/page.tsx
import type { Metadata } from 'next';
import KontakSection from "@/components/KontakSection";

// Metadata spesifik yang dioptimalkan untuk Halaman Kontak
export const metadata: Metadata = {
  title: "Hubungi Kami Kreatif - Mulai Proyek Digital Anda",
  description: "Hubungi tim Kami Kreatif untuk konsultasi gratis, penawaran, atau pertanyaan lainnya. Kami siap membantu mewujudkan proyek digital Anda di Jakarta dan sekitarnya.",
  // Menentukan URL kanonis untuk halaman ini, penting untuk SEO
  alternates: {
    canonical: '/kontak',
  },
};

export default function KontakPage() {
  return (
    <main className="bg-white text-gray-800">
      <KontakSection />
    </main>
  );
}

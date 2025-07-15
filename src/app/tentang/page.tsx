// src/app/tentang/page.tsx
import type { Metadata } from 'next';
import TentangCompo from "@/components/tentang/TentangCompo";

// Metadata spesifik yang dioptimalkan untuk Halaman Tentang Kami
export const metadata: Metadata = {
  title: "Tentang Kami Kreatif - Kenali Tim & Visi Kami",
  description: "Pelajari lebih lanjut tentang Kami Kreatif. Kenali tim, visi, dan pendekatan kami dalam membantu bisnis bertumbuh melalui solusi digital yang inovatif dan terukur.",
  // Menentukan URL kanonis untuk halaman ini, penting untuk SEO
  alternates: {
    canonical: '/tentang',
  },
};

export default function TentangPage() {
  return (
    <main className="bg-white text-gray-800">
      <TentangCompo />
    </main>
  );
}
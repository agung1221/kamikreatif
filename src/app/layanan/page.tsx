// src/app/layanan/page.tsx
import type { Metadata } from 'next';
import LayananHero from "@/components/layanan/LayananHero";
import LayananWhy from "@/components/layanan/LayananWhy";
import LayananPilihan from "@/components/layanan/LayananPilihan";
import TestimoniSection from "@/components/TestimoniSection";
import LayananCTA from "@/components/layanan/LayananCTA";
import FaqSection from "@/components/FaqSection";

// Metadata spesifik yang dioptimalkan untuk Halaman Layanan
export const metadata: Metadata = {
  title: "Layanan Kami - Solusi Digital Terintegrasi dari Kami Kreatif",
  description: "Temukan berbagai layanan digital kami, mulai dari pembuatan website profesional, strategi digital marketing yang efektif, hingga pengembangan tools custom untuk membantu bisnis Anda bertumbuh.",
  // Menentukan URL kanonis untuk halaman ini, penting untuk SEO
  alternates: {
    canonical: '/layanan',
  },
};

export default function LayananPage() {
  return (
    <main className="bg-white text-gray-800">
      <LayananHero />
      <LayananWhy />
      <LayananPilihan />
      <TestimoniSection />
      <LayananCTA />
      <FaqSection />
    </main>
  );
}

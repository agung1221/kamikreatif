// app/page.tsx
import type { Metadata } from 'next';
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import AboutSection from "@/components/AboutSection";
import PortfolioSection from "@/components/PortfolioSection";
import TestimoniSection from "@/components/TestimoniSection";
import PaketlayananSection from "@/components/PaketlayananSection";
import CTA from "@/components/CTA";
import FaqSection from "@/components/FaqSection";

// Metadata spesifik yang dioptimalkan untuk Halaman Utama (Homepage)
export const metadata: Metadata = {
  title: "Kami Kreatif - Agensi Digital untuk Website, Marketing & Tools",
  description: "Wujudkan potensi bisnis Anda dengan Kami Kreatif. Kami menyediakan jasa pembuatan website profesional, strategi digital marketing efektif, dan pengembangan tools custom untuk mendorong pertumbuhan.",
  // Menentukan URL kanonis untuk halaman utama, penting untuk SEO
  alternates: {
    canonical: '/',
  },
};


export default function Home() {
  return (
    // Menggunakan <main> adalah praktik yang baik, tidak perlu diubah.
    <main className="bg-white text-gray-800">
      <Hero />
      <AboutSection />
      <Services />
      <PortfolioSection />
      <TestimoniSection />
      <PaketlayananSection />
      <FaqSection />
      <CTA />
    </main>
  );
}
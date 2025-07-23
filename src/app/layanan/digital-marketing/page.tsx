// src/app/layanan/digital-marketing/page.tsx
import type { Metadata } from 'next';
import DmHero from "@/components/layanan/digital-marketing/DmHero";
import DmProblem from '@/components/layanan/digital-marketing/DmProblem';
import DmSolusi from '@/components/layanan/digital-marketing/DmSolusi';
import DmWhyUs from '@/components/layanan/digital-marketing/DmWhyUs';
import DmHarga from '@/components/layanan/digital-marketing/DmHarga';
import TestimonialSection from '@/components/TestimoniSection';
import DmCTA from '@/components/layanan/digital-marketing/DmCTA';
import DmFaq from '@/components/layanan/digital-marketing/DmFaq';

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
      <DmHero />
      <DmProblem />
      <DmSolusi />
      <DmWhyUs />
      <DmHarga />
      <TestimonialSection />
      <DmCTA />
      <DmFaq />
    </main>
  );
}

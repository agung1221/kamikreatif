// src/app/layanan/pembuatan-website/page.tsx
import type { Metadata } from 'next';
import WebsiteHero from "@/components/layanan/website/WebsiteHero";
import WebsiteWhy from "@/components/layanan/website/WebsiteWhy";
import WebsiteWhyUs from "@/components/layanan/website/WebsiteWhyUs";
import WebsiteJenis from "@/components/layanan/website/WebsiteJenis";
import WebsiteKerja from "@/components/layanan/website/WebsiteKerja";
import WebsiteHarga from "@/components/layanan/website/WebsiteHarga";
import TestimoniSection from "@/components/TestimoniSection";
import FaqSection from "@/components/FaqSection";

// Metadata spesifik yang dioptimalkan untuk Halaman Pembuatan Website
export const metadata: Metadata = {
  title: "Jasa Pembuatan Website Profesional - Kami Kreatif",
  description: "Tingkatkan bisnis Anda dengan jasa pembuatan website profesional dari Kami Kreatif. Kami merancang website yang cepat, responsif, dan SEO-friendly untuk segala jenis kebutuhan.",
  // Menentukan URL kanonis untuk halaman ini, penting untuk SEO
  alternates: {
    canonical: '/layanan/pembuatan-website',
  },
};

export default function PembuatanWebsitePage() {
  return (
    <main className="bg-white text-gray-800">
      <WebsiteHero />
      <WebsiteWhy />
      <WebsiteWhyUs />
      <WebsiteJenis />
      <WebsiteKerja />
      <WebsiteHarga />
      <TestimoniSection />
      <FaqSection />
      {/* Komponen lain untuk halaman ini bisa ditambahkan di sini */}
    </main>
  );
}
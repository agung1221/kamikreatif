// src/app/layout.tsx

import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Mengganti font ke Inter untuk konsistensi desain
import "@/styles/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Load font Inter dari Google
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans", // Menggunakan variabel yang lebih umum
});

// Metadata yang dioptimalkan untuk SEO dan branding "Kami Kreatif"
export const metadata: Metadata = {
  // Title template untuk konsistensi judul di semua halaman
  title: {
    template: "%s | Kami Kreatif",
    default: "Kami Kreatif - Solusi Digital Cerdas untuk Bisnis Anda",
  },
  description: "Kami Kreatif adalah agensi digital yang menyediakan solusi cerdas untuk pertumbuhan bisnis Anda melalui jasa pembuatan website, marketing digital, dan pengembangan tools inovatif.",
  keywords: [
    "agensi digital",
    "jasa pembuatan website",
    "digital marketing",
    "solusi digital",
    "UI/UX design",
    "kamikreatif",
    "website modern",
    "konsultasi digital",
    "jasa SEO",
  ],
  authors: [{ name: "Kami Kreatif", url: "https://www.kamikreatif.com" }],
  creator: "Kami Kreatif",
  
  // Ganti dengan URL domain utama Anda saat sudah production
  metadataBase: new URL("https://www.kamikreatif.com"), 

  // Open Graph (untuk Facebook, LinkedIn, dll.)
  openGraph: {
    title: "Kami Kreatif - Solusi Digital Cerdas untuk Bisnis Anda",
    description: "Tingkatkan bisnis Anda dengan website modern, marketing efektif, dan tools inovatif dari Kami Kreatif.",
    url: "https://www.kamikreatif.com",
    siteName: "Kami Kreatif",
    type: "website",
    images: [
      {
        url: "/og-image.png", // Pastikan file ini ada di folder /public
        width: 1200,
        height: 630,
        alt: "Logo dan tagline Kami Kreatif pada latar belakang modern",
      },
    ],
    locale: 'id_ID',
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "Kami Kreatif - Solusi Digital Cerdas untuk Bisnis Anda",
    description: "Tingkatkan bisnis Anda dengan website modern, marketing efektif, dan tools inovatif dari Kami Kreatif.",
    // creator: "@username_twitter_anda", // Tambahkan jika punya akun Twitter
    images: ["/og-image.png"], // Pastikan file ini ada di folder /public
  },

  // Ikon untuk browser dan perangkat
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  
  // Untuk PWA (Progressive Web App)
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      {/* Menggunakan font Inter dan variabel --font-sans */}
      <body className={`${inter.variable} font-sans antialiased`}>
        <Navbar />
        {/* Menggunakan <main> untuk konten utama demi semantik HTML yang lebih baik */}
        <main className="pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
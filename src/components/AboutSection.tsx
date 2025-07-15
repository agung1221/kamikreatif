"use client"; // Diperlukan untuk hook seperti useState/useEffect jika ada animasi

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// --- Tipe kustom untuk opsi hook ---
interface UseInViewOptions extends IntersectionObserverInit {
  triggerOnce?: boolean;
}

// --- Helper Hook untuk deteksi saat elemen masuk ke viewport (diperbaiki) ---
const useInView = (options: UseInViewOptions = {}) => {
    const { triggerOnce = true, ...observerOptions } = options;
    const ref = useRef<HTMLDivElement>(null);
    const [isInView, setIsInView] = useState(false);

    useEffect(() => {
        // Menyimpan ref.current ke variabel untuk digunakan di cleanup function (Fix ESLint warning)
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsInView(true);
                // Hentikan observasi setelah elemen terlihat jika triggerOnce true
                if (triggerOnce) {
                    observer.unobserve(element);
                }
            }
        }, observerOptions);

        observer.observe(element);

        return () => {
            // Menggunakan variabel yang sudah disimpan untuk cleanup
            observer.unobserve(element);
        };
    }, [triggerOnce, observerOptions]); // Dependensi diperbarui

    return [ref, isInView];
};


// --- Komponen Ikon ---
const CheckCircleIcon = () => (
    <svg className="w-6 h-6 text-orange-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const ArrowRightIcon = () => (
    <svg className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
);

export default function AboutSection() {
  // Menggunakan custom hook untuk animasi (Fix TypeScript error)
  const [ref, isInView] = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    // Menambahkan pola titik halus di latar belakang
    <section ref={ref as React.RefObject<HTMLDivElement>} className="relative bg-white py-20 md:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-40"></div>
      <div className="relative container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Kolom 1: Gambar Ilustrasi dengan animasi dan efek hover */}
          <div className={`order-last lg:order-first transition-all duration-1000 ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="relative rounded-lg shadow-2xl overflow-hidden group [transform-style:preserve-3d]">
                <Image
                    src="/kreatifabout.jpg"
                    alt="Tim Kami Kreatif sedang berkolaborasi dalam sebuah proyek"
                    width={600}
                    height={650}
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:[transform:translateZ(20px)_scale(1.05)]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent"></div>
            </div>
          </div>

          {/* Kolom 2: Konten Teks dengan animasi */}
          <div className={`text-center lg:text-left transition-all duration-1000 delay-200 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <p className="text-orange-500 font-semibold tracking-wide mb-2">Tentang Kami</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 leading-snug">
              Kenali Partner Digital yang Bekerja Bersama Anda
            </h2>
            <p className="text-slate-600 text-lg mb-8">
              Kami Kreatif adalah digital agency yang berfokus membantu bisnis bertumbuh melalui website profesional, strategi digital marketing, dan pengembangan tools berbasis teknologi. Kami percaya setiap bisnis unik, dan solusi digital harus disesuaikan dengan kebutuhan nyata.
            </p>
            
            <ul className="space-y-4 text-left mb-10">
              <li className="flex items-start">
                <CheckCircleIcon />
                <span className="text-slate-700">Berpengalaman lebih dari 5 tahun di bidang digital</span>
              </li>
              <li className="flex items-start">
                <CheckCircleIcon />
                <span className="text-slate-700">Pendekatan konsultatif & solutif</span>
              </li>
              <li className="flex items-start">
                <CheckCircleIcon />
                <span className="text-slate-700">Tim kreatif dan teknis yang kolaboratif</span>
              </li>
              <li className="flex items-start">
                <CheckCircleIcon />
                <span className="text-slate-700">Fokus pada hasil dan efisiensi bisnis klien</span>
              </li>
            </ul>

            <div className="flex justify-center lg:justify-start">
                <Link 
                    href="/tentang" 
                    className="group inline-flex items-center text-orange-600 font-semibold transition-colors duration-300 hover:text-orange-700"
                >
                    Pelajari lebih lanjut tentang Kami Kreatif
                    <ArrowRightIcon />
                </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
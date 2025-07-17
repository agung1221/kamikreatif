"use client";

import React, { useState, useEffect, useRef } from 'react';
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
        const element = ref.current;
        if (!element) return;
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsInView(true);
                if (triggerOnce) observer.unobserve(element);
            }
        }, observerOptions);
        observer.observe(element);
        return () => { if (element) observer.unobserve(element); };
    }, [triggerOnce, observerOptions]);
    return [ref, isInView] as const;
};

// --- Komponen Ikon ---
const ArrowRightIcon = () => (
  <svg className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
);

// --- Data Mockup untuk Portofolio Unggulan ---
const featuredPortfolio = [
  {
    title: "Website E-commerce Homeyflex.com",
    category: "Web Design & Development",
    imageUrl: "/portfolio-1.jpg",
    projectUrl: "/portfolio/homeyflex",
  },
  {
    title: "Branding & Social Media Supergrowtraz",
    category: "Social Media Management",
    imageUrl: "/portfolio-2.jpg",
    projectUrl: "/portfolio/supergrowtraz",
  },
];


// --- Komponen Utama ---
export default function PortfolioSection() {
  const [ref, isInView] = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <section id="portfolio" className="bg-white py-20 md:py-28 overflow-hidden">
      <div ref={ref} className="container mx-auto px-6">
        {/* Judul dan Deskripsi Section */}
        <div className={`text-center max-w-3xl mx-auto transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
            <p className="text-orange-500 font-semibold tracking-wide mb-2">Portofolio Pilihan</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6 leading-snug">
                Karya yang Mendorong Hasil Nyata
            </h2>
            <p className="text-lg text-slate-600">
                Setiap proyek adalah cerita tentang kolaborasi, tantangan, dan kesuksesan. Berikut adalah cuplikan dari beberapa karya terbaik yang telah kami wujudkan bersama klien hebat kami.
            </p>
        </div>

        {/* Kartu Portofolio dalam 2 kolom */}
        <div className="grid md:grid-cols-2 gap-8 mt-16 max-w-5xl mx-auto">
            {featuredPortfolio.map((item, index) => (
                <Link
                    href={item.projectUrl}
                    key={index}
                    className={`group block bg-slate-50 p-6 rounded-xl shadow-lg transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl hover:bg-white ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                    style={{ transitionDelay: `${100 + index * 150}ms` }}
                >
                    <div className="relative aspect-video rounded-lg overflow-hidden mb-4">
                        <Image
                            src={item.imageUrl}
                            alt={item.title}
                            layout="fill"
                            objectFit="cover"
                            className="transition-transform duration-500 group-hover:scale-105"
                        />
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-orange-500">{item.category}</p>
                        <h3 className="text-xl font-bold text-slate-800 mt-1">{item.title}</h3>
                        <span className="mt-3 text-sm font-semibold text-slate-600 flex items-center transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                            Lihat Studi Kasus <ArrowRightIcon />
                        </span>
                    </div>
                </Link>
            ))}
        </div>

        {/* Tombol CTA */}
        <div className="text-center mt-16">
            <Link 
                href="/portfolio" 
                className="group inline-flex items-center text-orange-600 font-semibold transition-colors duration-300 hover:text-orange-700"
            >
                Jelajahi Semua Proyek
                <ArrowRightIcon />
            </Link>
        </div>
      </div>
    </section>
  );
}

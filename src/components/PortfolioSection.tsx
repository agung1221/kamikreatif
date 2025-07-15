"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// --- Helper Hook untuk deteksi saat elemen masuk ke viewport ---
interface UseInViewOptions extends IntersectionObserverInit {
  triggerOnce?: boolean;
}

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
        return () => observer.unobserve(element);
    }, [triggerOnce, observerOptions]);
    return [ref, isInView];
};

// --- Komponen Ikon ---
const ArrowIcon = () => (
  <svg className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5-5 5M6 12h12" />
  </svg>
);

const ExternalLinkIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
);


// --- Data Mockup untuk Portofolio Unggulan ---
const featuredPortfolio = [
  {
    title: "Website E-commerce Homeyflex.com",
    category: "Web Design & Development",
    imageUrl: "/portfolio-1.jpg",
    projectUrl: "/portofolio", // URL ini adalah placeholder
  },
  {
    title: "Branding & Social Media Management Supergrowtraz",
    category: "Social Media Management",
    imageUrl: "/portfolio-2.jpg",
    projectUrl: "/portofolio", // URL ini adalah placeholder
  },
];


// --- Komponen Utama ---
export default function PortfolioSection() {
  const [ref, isInView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="portfolio" className="bg-slate-50 py-20 md:py-28">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
            Karya Unggulan Kami
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-slate-600">
            Sebuah cuplikan dari proyek terbaik yang menunjukkan keahlian dan dedikasi kami dalam memberikan solusi digital.
          </p>
        </div>

        {/* Grid Portofolio untuk 2 item unggulan */}
        <div ref={ref as React.RefObject<HTMLDivElement>} className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
          {featuredPortfolio.map((item, index) => (
            <div
              key={index}
              className={`group relative rounded-xl shadow-2xl overflow-hidden transition-all duration-500 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Badge Unggulan */}
              <div className="absolute top-4 right-4 bg-orange-500 text-white text-xs font-bold uppercase px-3 py-1 rounded-full shadow-lg z-10">
                Unggulan
              </div>
              
              {/* Diubah dari Link ke <a> untuk placeholder URL */}
              <a href={item.projectUrl} onClick={(e) => e.preventDefault()} className="block cursor-pointer">
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  width={600}
                  height={450}
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Overlay saat hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 text-white">
                    <ExternalLinkIcon />
                    <h3 className="text-2xl font-bold mt-4">{item.title}</h3>
                    <p className="text-orange-300">{item.category}</p>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>

        {/* Tombol CTA (tetap menggunakan Link karena tujuannya jelas) */}
        <div className="text-center mt-20">
          <Link href="/portofolio" className="relative group inline-flex items-center justify-center bg-orange-500 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-orange-600 transition-all duration-300 transform hover:-translate-y-1 button-pulse">
            Lihat Semua Portofolio
            <ArrowIcon />
          </Link>
        </div>
      </div>
    </section>
  );
}
"use client";

import React, { useState, useEffect, useRef } from 'react';
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
                if (triggerOnce) {
                    observer.unobserve(element);
                }
            }
        }, observerOptions);

        observer.observe(element);
        return () => { if (element) observer.unobserve(element); };
    }, [triggerOnce, observerOptions]);

    return [ref, isInView] as const;
};


// --- Komponen Ikon ---
const WebsiteIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mb-4 text-orange-500 transition-transform duration-300 group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
);
const MarketingIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mb-4 text-orange-500 transition-transform duration-300 group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
    </svg>
);
const ToolsIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mb-4 text-orange-500 transition-transform duration-300 group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);
const SocialMediaIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mb-4 text-orange-500 transition-transform duration-300 group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
);
const ArrowRightIcon = () => (
  <svg className="w-5 h-5 ml-2 transition-transform duration-300 lg:group-hover:translate-x-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5-5 5M6 12h12" />
  </svg>
);


// Data layanan (diperbarui dengan link)
const services = [
  { icon: <WebsiteIcon />, title: "Pembuatan Website", desc: "Website bisnis yang dirancang profesional, cepat diakses, dan siap pakai untuk keperluan digital Anda.", link: "/layanan/pembuatan-website" },
  { icon: <MarketingIcon />, title: "Digital Marketing", desc: "Strategi pemasaran digital berbasis hasil untuk menjangkau audiens yang tepat dan meningkatkan penjualan.", link: "/layanan/digital-marketing" },
  { icon: <ToolsIcon />, title: "Tools & Automasi", desc: "Sistem custom yang dirancang untuk mendukung efisiensi internal bisnis Anda: dashboard, laporan otomatis, dll.", link: "/layanan/tools-automasi" },
  { icon: <SocialMediaIcon />, title: "Social Media Management", desc: "Kelola dan tumbuhkan kehadiran brand Anda di media sosial dengan konten yang menarik dan interaksi yang otentik.", link: "/layanan/social-media" },
];

export default function Services() {
  const [ref, isInView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
      <section id="layanan" className="py-20 md:py-28 px-6 bg-slate-50 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Layanan Kami</h2>
          <p className="max-w-2xl mx-auto text-lg text-slate-600 mb-16">Kami bantu bisnis Anda tumbuh melalui pendekatan digital yang strategis dan fleksibel.</p>
          
          <div ref={ref} className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {services.map((service, index) => (
              <Link
                href={service.link}
                key={index}
                className={`group bg-white p-8 rounded-lg shadow-lg text-left transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl hover:ring-2 hover:ring-orange-400 hover:ring-offset-2 flex flex-col ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex-grow">
                    {service.icon}
                    <h3 className="text-xl font-bold text-slate-800 mb-3">{service.title}</h3>
                    <p className="text-slate-600">{service.desc}</p>
                </div>
                <div className="mt-6">
                    {/* Diperbarui: Terlihat di mobile, hover di desktop */}
                    <span className="font-semibold text-orange-600 flex items-center transition-opacity duration-300 opacity-100 lg:opacity-0 lg:group-hover:opacity-100">
                        Lihat Detail
                        <ArrowRightIcon />
                    </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
  );
}

"use client";

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';

// --- Helper Hook untuk deteksi saat elemen masuk ke viewport ---
const useInView = (options: IntersectionObserverInit = {}) => {
    const ref = useRef<HTMLDivElement>(null);
    const [isInView, setIsInView] = useState(false);
    useEffect(() => {
        const element = ref.current;
        if (!element) return;
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) setIsInView(true);
        }, options);
        observer.observe(element);
        return () => { if (element) observer.unobserve(element); };
    }, [options]);
    return [ref, isInView] as const;
};

// --- Komponen Ikon ---
const ArrowDownIcon = () => (
    <svg className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
    </svg>
);

const IconWrapper = ({ children }: { children: React.ReactNode }) => (
    <div className="bg-orange-100 text-orange-600 rounded-lg h-12 w-12 flex items-center justify-center mb-5">
        {children}
    </div>
);

const LandingPageIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
);

const CompanyProfileIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
);

const EcommerceIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
);

const CustomAppIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
);


// --- Data Jenis Website ---
const websiteTypes = [
    {
        icon: <LandingPageIcon />,
        title: "Landing Page",
        description: "Untuk Campaign, Produk, dan Layanan",
        focus: "Konversi Leads"
    },
    {
        icon: <CompanyProfileIcon />,
        title: "Company Profile Website",
        description: "Tampilkan Profil Lengkap & Layanan",
        focus: "Kredibilitas Bisnis"
    },
    {
        icon: <EcommerceIcon />,
        title: "E-Commerce / Toko Online",
        description: "Website Jualan Lengkap dengan Sistem Pembayaran",
        focus: "Penjualan"
    },
    {
        icon: <CustomAppIcon />,
        title: "Custom Web Application",
        description: "Sistem Web Sesuai Kebutuhan Spesifik Anda",
        focus: "Efisiensi & Proses Bisnis"
    }
];

// --- Komponen Utama ---
export default function WebsiteJenis() {
    const [ref, isInView] = useInView({ threshold: 0.2 });

    return (
        <section ref={ref} className="bg-slate-50 py-20 md:py-28">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
                        Website Apa yang Bisnis Anda Butuhkan?
                    </h2>
                    <p className="max-w-2xl mx-auto text-lg text-slate-600">
                        Setiap bisnis unik, begitu pula kebutuhan websitenya. Kami menyediakan berbagai solusi yang bisa disesuaikan.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {websiteTypes.map((item, index) => (
                        <div
                            key={index}
                            className={`bg-white p-8 rounded-xl shadow-lg text-left transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                            style={{ transitionDelay: `${index * 100}ms` }}
                        >
                            <IconWrapper>{item.icon}</IconWrapper>
                            <h3 className="text-xl font-bold text-slate-800 mb-2">{item.title}</h3>
                            <p className="text-slate-600 mb-4 h-16">{item.description}</p>
                            <div className="mt-auto">
                                <span className="text-xs font-bold text-orange-600 bg-orange-100 px-3 py-1 rounded-full">
                                    Fokus: {item.focus}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-20">
                    <Link
                        href="#paket-harga" // Anchor link ke seksi paket layanan
                        className="group inline-flex items-center justify-center bg-slate-800 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-slate-900 transition-all duration-300 transform hover:scale-105"
                    >
                        Lihat Paket & Harga
                        <ArrowDownIcon />
                    </Link>
                </div>
            </div>
        </section>
    );
}
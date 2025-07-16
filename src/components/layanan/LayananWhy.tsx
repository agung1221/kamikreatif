"use client";

import React, { useState, useEffect, useRef } from 'react';

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
const IconWrapper = ({ children }: { children: React.ReactNode }) => (
    <div className="bg-orange-100 text-orange-600 rounded-lg h-12 w-12 flex items-center justify-center mb-5">
        {children}
    </div>
);

const ChartBarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
);

const ShieldCheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const ClipboardListIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
    </svg>
);

const SupportIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
);

// --- Data Keunggulan ---
const whyUsData = [
    {
        icon: <ChartBarIcon />,
        title: "Fokus pada Hasil & ROI",
        description: "Kami tidak hanya membangun, kami menciptakan solusi yang memberikan hasil nyata dan Return on Investment (ROI) yang terukur untuk bisnis Anda."
    },
    {
        icon: <ShieldCheckIcon />,
        title: "Tim Berpengalaman & Profesional",
        description: "Tim kami terdiri dari para ahli di bidang desain, development, dan marketing yang siap memberikan solusi terbaik sesuai standar industri."
    },
    {
        icon: <ClipboardListIcon />,
        title: "Proses Cepat, Transparan, dan Mudah",
        description: "Kami menyederhanakan proses kerja dengan alur yang jelas dan komunikasi yang transparan, memastikan proyek berjalan efisien dan sesuai harapan."
    },
    {
        icon: <SupportIcon />,
        title: "Support & Maintenance",
        description: "Hubungan kita tidak berakhir setelah proyek selesai. Kami menyediakan dukungan teknis dan layanan maintenance untuk menjaga aset digital Anda tetap optimal."
    }
];

// --- Komponen Utama ---
export default function LayananWhy() {
    const [ref, isInView] = useInView({ threshold: 0.2 });

    return (
        <section ref={ref} className="bg-white py-20 md:py-28">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
                        Kenapa Memilih Kami Kreatif?
                    </h2>
                    <p className="max-w-2xl mx-auto text-lg text-slate-600">
                        Kami lebih dari sekadar agensi. Kami adalah partner strategis yang berdedikasi untuk kesuksesan Anda.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {whyUsData.map((item, index) => (
                        <div
                            key={index}
                            className={`bg-slate-50 p-8 rounded-xl transition-all duration-500 transform hover:bg-white hover:shadow-2xl hover:-translate-y-2 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                            style={{ transitionDelay: `${index * 100}ms` }}
                        >
                            <IconWrapper>{item.icon}</IconWrapper>
                            <h3 className="text-xl font-bold text-slate-800 mb-3">{item.title}</h3>
                            <p className="text-slate-600">{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
"use client";

import React, { useRef, useState, useEffect } from 'react';

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
const CheckBadgeIcon = () => (
    <svg className="h-8 w-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
    </svg>
);

// --- Data Keunggulan ---
const whyUsData = [
    "Tim Berpengalaman, 5+ Tahun di Industri Digital",
    "Proses Terbuka & Transparan, Tanpa Biaya Tersembunyi",
    "Desain yang Mewakili Brand, Bukan Template Pasaran",
    "Support & Maintenance Setelah Website Live"
];

// --- Komponen Utama ---
export default function WebsiteWhyUs() {
    const [ref, isInView] = useInView({ threshold: 0.2 });

    return (
        <section ref={ref} className="bg-white py-20 md:py-28">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-4xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">
                        Kami Bukan Sekadar Bikin Website, Kami Bangun Aset Digital Bisnis Anda
                    </h2>
                </div>

                <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mt-12">
                    {whyUsData.map((item, index) => (
                        <div
                            key={index}
                            className={`transition-all duration-500 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                            style={{ transitionDelay: `${index * 100}ms` }}
                        >
                            <div className="bg-slate-50 p-6 rounded-lg flex items-center h-full">
                                <div className="bg-green-500 p-2 rounded-full mr-5">
                                    <CheckBadgeIcon />
                                </div>
                                <p className="text-lg font-semibold text-slate-700">{item}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center max-w-3xl mx-auto mt-16">
                    <blockquote
                        className={`border-l-4 border-orange-500 pl-6 italic text-xl text-slate-600 transition-opacity duration-700 delay-500 ${isInView ? 'opacity-100' : 'opacity-0'}`}
                    >
                        &quot;Website Anda adalah wajah bisnis Anda di era digital. Pastikan wajah itu memikat.&quot;
                    </blockquote>
                </div>
            </div>
        </section>
    );
}
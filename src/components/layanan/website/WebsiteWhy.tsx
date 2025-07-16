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
const XCircleIcon = () => (
    <svg className="h-7 w-7 text-red-500 mr-4 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

// --- Komponen Utama ---
export default function WebsiteWhy() {
    const [ref, isInView] = useInView({ threshold: 0.3 });

    return (
        <section ref={ref} className="bg-slate-800 text-white py-20 md:py-28">
            <div className="container mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Kolom Kiri: Hook & Persuasive Copy */}
                    <div className={`transition-all duration-700 ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                        <p className="text-sm font-bold text-orange-400 uppercase tracking-wider mb-2">Fakta Penting</p>
                        <h2 className="text-3xl md:text-4xl font-extrabold leading-tight">
                            75% Calon Pelanggan Menilai Kredibilitas Bisnis dari Tampilan Website.
                        </h2>
                        <p className="mt-8 text-lg text-slate-300 italic">
                            Setiap hari Anda menunda membuat website, potensi pelanggan baru bisa hilang begitu saja.
                        </p>
                    </div>

                    {/* Kolom Kanan: Problem Highlight */}
                    <div className={`transition-all duration-700 delay-200 ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
                        <div className="bg-slate-700/50 rounded-xl p-8 border border-slate-600">
                            <h3 className="text-xl font-bold mb-6">Jika bisnis Anda belum punya website:</h3>
                            <ul className="space-y-5">
                                <li className="flex items-start">
                                    <XCircleIcon />
                                    <span className="text-slate-300">Sulit dipercaya calon pelanggan dan terlihat kurang profesional.</span>
                                </li>
                                <li className="flex items-start">
                                    <XCircleIcon />
                                    <span className="text-slate-300">Susah ditemukan di Google saat orang mencari produk atau jasa Anda.</span>
                                </li>
                                <li className="flex items-start">
                                    <XCircleIcon />
                                    <span className="text-slate-300">Tidak punya aset digital jangka panjang yang bisa dikembangkan.</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
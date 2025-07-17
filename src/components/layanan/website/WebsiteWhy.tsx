"use client";

import React, { useRef, useState, useEffect } from 'react';

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
const XCircleIcon = () => (
    <div className="bg-red-100 text-red-600 rounded-full h-10 w-10 flex items-center justify-center mb-4">
        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    </div>
);

// --- Data Masalah ---
const problems = [
    {
        title: "Sulit Dipercaya",
        description: "Calon pelanggan akan meragukan profesionalisme dan kredibilitas bisnis Anda."
    },
    {
        title: "Tidak Ditemukan",
        description: "Anda kehilangan kesempatan emas saat calon pelanggan mencari produk atau jasa di Google."
    },
    {
        title: "Aset Stagnan",
        description: "Tanpa website, Anda tidak memiliki 'rumah' digital untuk membangun brand jangka panjang."
    }
];

// --- Komponen Utama ---
export default function WebsiteWhy() {
    const [ref, isInView] = useInView({ threshold: 0.2 });

    return (
        <section ref={ref} className="bg-slate-800 text-white py-20 md:py-28 overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-center">
                    {/* Kolom Kiri: Hook & Persuasive Copy */}
                    <div className={`lg:col-span-2 text-center lg:text-left transition-all duration-700 ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                        <p className="text-sm font-bold text-orange-400 uppercase tracking-wider mb-4">Fakta Penting</p>
                        <h2 className="text-3xl md:text-4xl font-extrabold leading-tight">
                            <span className="text-7xl md:text-8xl font-black bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">75%</span>
                            <br />
                            Calon Pelanggan Menilai Kredibilitas Bisnis dari Website.
                        </h2>
                        <p className="mt-8 text-lg text-slate-300 italic">
                            Setiap hari Anda menunda, potensi pelanggan baru bisa hilang begitu saja.
                        </p>
                    </div>

                    {/* Kolom Kanan: Problem Highlight */}
                    <div className="lg:col-span-3">
                        <div className="space-y-6">
                            {problems.map((problem, index) => (
                                <div
                                    key={index}
                                    className={`bg-slate-700/50 rounded-xl p-6 border border-slate-600 flex items-start transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                                    style={{ transitionDelay: `${100 + index * 150}ms` }}
                                >
                                    <XCircleIcon />
                                    <div className="ml-4">
                                        <h4 className="text-xl font-bold text-white">{problem.title}</h4>
                                        <p className="text-slate-300 mt-1">{problem.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

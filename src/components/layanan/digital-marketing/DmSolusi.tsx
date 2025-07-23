"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

// --- Tipe kustom untuk opsi hook ---
interface UseInViewOptions extends IntersectionObserverInit {
  triggerOnce?: boolean;
}

// --- Helper Hook untuk deteksi saat elemen masuk ke viewport ---
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
const CheckCircleIcon = () => (
    <div className="bg-green-100 text-green-600 rounded-full h-8 w-8 flex items-center justify-center mr-4 flex-shrink-0">
        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
    </div>
);

// --- Data Solusi ---
const solutions = [
    {
        title: "Iklan Meta & Google Ads",
        description: "Target audiens yang siap beli, tanpa buang budget."
    },
    {
        title: "SEO Organik",
        description: "Naik ke halaman 1 Google dan tahan lama."
    },
    {
        title: "Content Marketing",
        description: "Edukasi, hibur, dan konversi melalui konten yang tepat sasaran."
    },
    {
        title: "Email & WA Automation",
        description: "Bangun hubungan jangka panjang dengan follow-up cerdas."
    },
    {
        title: "Data Analytics",
        description: "Laporan mingguan, transparan, dan mudah dipahami."
    }
];

// --- Komponen Utama ---
export default function DmSolusi() {
    const [ref, isInView] = useInView({ threshold: 0.2, triggerOnce: true });

    return (
        <section ref={ref} className="bg-slate-50 py-20 md:py-28 overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* Kolom Kiri: Visual */}
                    <div className={`transition-all duration-1000 ${isInView ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
                        <div className="relative aspect-square max-w-md mx-auto">
                            <div className="absolute inset-0 bg-orange-100 rounded-full transform -rotate-12"></div>
                            <Image
                                src="/solusi.png"
                                alt="Ilustrasi solusi digital marketing yang terintegrasi"
                                layout="fill"
                                objectFit="contain"
                                className="relative z-10"
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                        </div>
                    </div>

                    {/* Kolom Kanan: Daftar Solusi */}
                    <div className={`transition-all duration-1000 delay-200 ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
                        <p className="text-orange-500 font-semibold tracking-wide mb-2">Solusi Kami</p>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 leading-snug">
                            Solusi Digital Marketing All-in-One
                        </h2>
                        <p className="text-lg text-slate-600 mb-10">
                            Kami bantu dari perencanaan hingga eksekusi — semua terintegrasi untuk hasil yang maksimal.
                        </p>
                        <div className="space-y-4">
                            {solutions.map((solution, index) => (
                                <div
                                    key={index}
                                    className={`bg-white p-4 rounded-lg shadow-md flex items-center transition-all duration-700 transform hover:shadow-xl hover:scale-105 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
                                    style={{ transitionDelay: `${200 + index * 100}ms` }}
                                >
                                    <CheckCircleIcon />
                                    <div>
                                        <h4 className="font-bold text-slate-800 text-lg">{solution.title}</h4>
                                        <p className="text-slate-600 text-sm">{solution.description}</p>
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
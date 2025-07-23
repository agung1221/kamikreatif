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

// --- Data Masalah ---
const problems = [
    {
        quote: "“Kami sudah keluar 5 juta lebih, tapi leads cuma 2…”",
        issue: "Iklan Boros"
    },
    {
        quote: "“Instagram rame, tapi ga ada yang beli...”",
        issue: "Konversi Rendah"
    },
    {
        quote: "“Website sudah ada, tapi tak muncul di Google.”",
        issue: "Visibilitas SEO Kurang"
    }
];

// --- Komponen Utama ---
export default function DmProblem() {
    const [ref, isInView] = useInView({ threshold: 0.2, triggerOnce: true });

    return (
        <section ref={ref} className="bg-slate-900 text-white py-20 md:py-28 overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className={`text-3xl md:text-4xl font-extrabold mb-6 transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
                        Pernah Merasa Iklan Boros Tapi <span className="text-orange-400">Tak Ada Hasil?</span>
                    </h2>
                </div>

                {/* Visual Utama */}
                <div className={`relative my-16 transition-all duration-700 delay-100 ${isInView ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
                    <div className="relative aspect-video max-w-3xl mx-auto">
                        <Image
                            src="/frustasi.png"
                            alt="Ilustrasi frustasi dengan hasil marketing digital"
                            layout="fill"
                            objectFit="contain"
                            sizes="(max-width: 768px) 100vw, 60vw"
                        />
                         {/* Efek gradien di belakang gambar */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent z-0"></div>
                    </div>
                </div>

                {/* Daftar Masalah dalam bentuk kartu */}
                <div className="grid lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {problems.map((problem, index) => (
                        <div
                            key={index}
                            className={`bg-slate-800 border border-slate-700 p-6 rounded-xl shadow-lg transition-all duration-700 transform hover:-translate-y-2 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                            style={{ transitionDelay: `${200 + index * 150}ms` }}
                        >
                            <blockquote className="text-lg italic text-slate-300">
                                {problem.quote}
                            </blockquote>
                            <p className="mt-4 text-right text-sm font-semibold text-orange-400">
                                — {problem.issue}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
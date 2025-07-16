"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

// --- Komponen Ikon ---
const ArrowDownIcon = () => (
    <svg className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
    </svg>
);

// --- Komponen Utama ---
export default function LayananHero() {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsMounted(true);
        }, 100);
        return () => clearTimeout(timer);
    }, []);

    return (
        <section className="relative bg-slate-800 text-white py-24 md:py-32 text-center overflow-hidden">
            {/* Latar belakang dekoratif */}
            <div className="absolute inset-0 bg-[url('/pattern.svg')] bg-repeat opacity-[0.03]"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-slate-800 via-slate-800/80 to-slate-800"></div>

            <div className="relative container mx-auto px-6">
                <div
                    className={`transition-all duration-1000 ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
                >
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 leading-tight">
                        Solusi Digital Lengkap untuk Bisnis Anda
                    </h1>
                </div>
                <div
                    className={`transition-all duration-1000 delay-200 ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
                >
                    <p className="max-w-3xl mx-auto text-lg md:text-xl text-slate-300 mb-10">
                        Dari pembuatan website hingga social media management — Kami Kreatif hadir untuk membantu bisnis Anda tumbuh dan berkembang.
                    </p>
                </div>
                <div
                    className={`transition-all duration-1000 delay-300 ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
                >
                    <Link
                        href="#detail-layanan" // Anchor link ke seksi detail layanan
                        className="group inline-flex items-center justify-center bg-orange-500 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-orange-600 transition-all duration-300 transform hover:scale-105"
                    >
                        Lihat Detail Layanan Kami
                        <ArrowDownIcon />
                    </Link>
                </div>
            </div>
        </section>
    );
}
"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

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
const ArrowRightIcon = () => (
    <svg className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
);

// --- Data Layanan ---
const serviceData = [
    {
        title: "Pembuatan Website",
        description: "Bangun website profesional, cepat, dan mobile-friendly. Tingkatkan kepercayaan dan kredibilitas bisnis Anda di dunia digital.",
        imageUrl: "/website.jpg",
        link: "/layanan/pembuatan-website"
    },
    {
        title: "Digital Marketing",
        description: "Strategi iklan dan SEO yang dirancang khusus untuk membawa lebih banyak traffic, leads, dan penjualan.",
        imageUrl: "/marketing.jpg",
        link: "/layanan/digital-marketing"
    },
    {
        title: "Tools & Automasi",
        description: "Efisiensikan proses bisnis Anda dengan sistem tools dan automation yang terintegrasi — hemat waktu dan biaya operasional.",
        imageUrl: "/tools.jpg",
        link: "/layanan/tools-automasi"
    },
    {
        title: "Social Media Management",
        description: "Biarkan tim kami mengelola konten dan strategi social media Anda agar tetap aktif, menarik, dan menghasilkan konversi.",
        imageUrl: "/socmed.jpg",
        link: "/layanan/social-media"
    }
];

// --- Komponen Utama ---
export default function LayananPilihan() {
    const [ref, isInView] = useInView({ threshold: 0.2 });
    const [activeTab, setActiveTab] = useState(0);

    // Variabel 'activeService' dihapus karena tidak digunakan.

    return (
        <section id="detail-layanan" ref={ref} className="bg-white py-20 md:py-28">
            <div className="container mx-auto px-6">
                <div className={`text-center mb-16 transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
                        Pilihan Layanan Kami
                    </h2>
                    <p className="max-w-2xl mx-auto text-lg text-slate-600">
                        Solusi terintegrasi yang dirancang untuk setiap tahap pertumbuhan bisnis Anda.
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
                    {/* Kolom Kiri: Daftar Tab Layanan */}
                    <div className="lg:col-span-1">
                        <div className="space-y-2">
                            {serviceData.map((service, index) => (
                                <button
                                    key={index}
                                    onClick={() => setActiveTab(index)}
                                    className={`w-full text-left p-4 rounded-lg transition-all duration-300 ${activeTab === index ? 'bg-orange-500 text-white shadow-lg' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'}`}
                                >
                                    <span className="font-bold text-lg">{service.title}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Kolom Kanan: Konten Tab Aktif */}
                    <div className="lg:col-span-2">
                        <div className="relative">
                            {serviceData.map((service, index) => (
                                <div
                                    key={index}
                                    className={`transition-all duration-500 ease-in-out ${activeTab === index ? 'opacity-100' : 'opacity-0 absolute inset-0 pointer-events-none'}`}
                                >
                                    <div className="relative aspect-video rounded-xl shadow-2xl overflow-hidden mb-6">
                                        <Image
                                            src={service.imageUrl}
                                            alt={service.title}
                                            layout="fill"
                                            objectFit="cover"
                                            priority={index <= 1} // Prioritaskan gambar awal
                                            sizes="(max-width: 1024px) 100vw, 66vw"
                                        />
                                    </div>
                                    <h3 className="text-3xl font-extrabold text-slate-900 mb-4">{service.title}</h3>
                                    <p className="text-lg text-slate-600 mb-6">{service.description}</p>
                                    <Link href={service.link} className="group inline-flex items-center text-orange-600 font-semibold transition-colors duration-300 hover:text-orange-700">
                                        Pelajari Lebih Lanjut
                                        <ArrowRightIcon />
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

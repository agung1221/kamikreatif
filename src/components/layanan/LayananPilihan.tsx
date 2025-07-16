"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
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

// --- Komponen Service Item ---
const ServiceItem = ({ service, index }: { service: typeof serviceData[0], index: number }) => {
    const [ref, isInView] = useInView({ threshold: 0.3 });
    const isEven = index % 2 === 0;

    return (
        <div ref={ref} className="grid md:grid-cols-2 gap-12 items-center">
            <div className={`transition-all duration-700 ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'} ${isEven ? 'md:order-1' : 'md:order-2'}`}>
                <div className="relative rounded-lg shadow-xl overflow-hidden transform hover:scale-105 transition-transform duration-300">
                    <Image
                        src={service.imageUrl}
                        alt={service.title}
                        width={600}
                        height={450}
                        className="w-full h-auto object-cover"
                        // Optimasi: Memberi tahu browser ukuran gambar di berbagai viewport
                        sizes="(max-width: 768px) 100vw, 50vw"
                        // Optimasi: Memprioritaskan loading gambar pertama (LCP)
                        priority={index === 0}
                    />
                </div>
            </div>
            <div className={`transition-all duration-700 ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'} ${isEven ? 'md:order-2' : 'md:order-1'}`}>
                <h3 className="text-3xl font-extrabold text-slate-900 mb-4">{service.title}</h3>
                <p className="text-lg text-slate-600 mb-6">{service.description}</p>
                <Link href={service.link} className="group inline-flex items-center text-orange-600 font-semibold transition-colors duration-300 hover:text-orange-700">
                    Detail Layanan
                    <ArrowRightIcon />
                </Link>
            </div>
        </div>
    );
};

// --- Komponen Utama ---
export default function LayananPilihan() {
    return (
        <section id="detail-layanan" className="bg-white py-20 md:py-28">
            <div className="container mx-auto px-6">
                <div className="text-center mb-20">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
                        Pilihan Layanan Kami
                    </h2>
                    <p className="max-w-2xl mx-auto text-lg text-slate-600">
                        Solusi terintegrasi yang dirancang untuk setiap tahap pertumbuhan bisnis Anda.
                    </p>
                </div>

                <div className="space-y-24">
                    {serviceData.map((service, index) => (
                        <ServiceItem key={index} service={service} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}
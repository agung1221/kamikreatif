"use client";

import React, { useState, useEffect, useRef } from 'react';

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
const IconWrapper = ({ children }: { children: React.ReactNode }) => (
    <div className="bg-orange-100 text-orange-600 rounded-lg h-12 w-12 flex items-center justify-center mb-5 flex-shrink-0">
        {children}
    </div>
);

const TargetIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 15l-2 5L9 9l5-2 2 15z" />
    </svg>
);
const CertificateIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
    </svg>
);
const DocumentReportIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
);
const RefreshIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h5M20 20v-5h-5M4 4l1.72-1.72a9 9 0 0112.56 0l1.72 1.72M20 20l-1.72 1.72a9 9 0 01-12.56 0L4 20z" />
    </svg>
);

// --- Data Keunggulan ---
const whyUsData = [
    {
        icon: <TargetIcon />,
        title: "Fokus pada Hasil",
        description: "Bukan sekadar traffic, tapi peningkatan konversi & omzet."
    },
    {
        icon: <CertificateIcon />,
        title: "Tim Bersertifikat",
        description: "Google Ads, Meta Blueprint, & SEO Pro."
    },
    {
        icon: <DocumentReportIcon />,
        title: "Laporan Rutin & Transparan",
        description: "Dikirim mingguan, mudah dipahami & actionable insight."
    },
    {
        icon: <RefreshIcon />,
        title: "Pendekatan Agile",
        description: "Fleksibel dan cepat adaptasi sesuai kondisi pasar."
    }
];

// --- Komponen Utama ---
export default function DmWhyUs() {
    const [ref, isInView] = useInView({ threshold: 0.2, triggerOnce: true });

    return (
        <section ref={ref} className="bg-white py-20 md:py-28">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className={`text-3xl md:text-4xl font-extrabold text-slate-900 mb-6 transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
                        Kami Tidak Sekadar Jasa, Kami Mitra Pertumbuhan Digital Anda
                    </h2>
                </div>

                <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mt-12">
                    {whyUsData.map((item, index) => (
                        <div
                            key={index}
                            className={`bg-slate-50 p-8 rounded-xl transition-all duration-500 transform hover:bg-white hover:shadow-2xl hover:-translate-y-2 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                            style={{ transitionDelay: `${index * 100}ms` }}
                        >
                            <div className="flex items-start">
                                <IconWrapper>{item.icon}</IconWrapper>
                                <div className="ml-5">
                                    <h3 className="text-xl font-bold text-slate-800 mb-2">{item.title}</h3>
                                    <p className="text-slate-600">{item.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
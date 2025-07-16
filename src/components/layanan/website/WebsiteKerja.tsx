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
const IconWrapper = ({ children }: { children: React.ReactNode }) => (
    <div className="absolute left-0 top-0 h-12 w-12 flex items-center justify-center bg-orange-500 text-white rounded-full ring-8 ring-slate-50 z-10">
        {children}
    </div>
);

const ConsultationIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>;
const DesignIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>;
const CodeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>;
const CheckIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const LaunchIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>;


// --- Data Proses Kerja ---
const workProcess = [
    {
        icon: <ConsultationIcon />,
        title: "Konsultasi Kebutuhan",
        description: "Kami mendengarkan ide, tujuan, dan kebutuhan bisnis Anda untuk merumuskan strategi website yang paling tepat."
    },
    {
        icon: <DesignIcon />,
        title: "Desain Mockup (Revisi Maks. 2x)",
        description: "Tim desainer kami akan membuat rancangan visual (mockup) yang bisa Anda review dan revisi hingga sesuai dengan visi Anda."
    },
    {
        icon: <CodeIcon />,
        title: "Development (Coding & Integrasi)",
        description: "Desain yang telah disetujui akan kami ubah menjadi website fungsional dengan teknologi terkini dan integrasi fitur yang dibutuhkan."
    },
    {
        icon: <CheckIcon />,
        title: "Finalisasi & Testing",
        description: "Kami melakukan pengujian menyeluruh di berbagai perangkat dan browser untuk memastikan semua fungsi berjalan sempurna tanpa bug."
    },
    {
        icon: <LaunchIcon />,
        title: "Launching Website + Support",
        description: "Setelah semua siap, kami akan meluncurkan website Anda ke publik dan memberikan dukungan teknis awal untuk memastikan transisi yang mulus."
    }
];

// --- Komponen Utama ---
export default function WebsiteKerja() {
    const [ref, isInView] = useInView({ threshold: 0.1 });

    return (
        <section ref={ref} className="bg-white py-20 md:py-28">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
                        Cara Kerja Kami — Dari Ide ke Website Live
                    </h2>
                    <p className="text-lg text-slate-600">
                        Proses mudah, cepat, dan tetap terbuka di setiap tahap.
                    </p>
                </div>

                <div className="relative max-w-2xl mx-auto">
                    {/* Garis Timeline */}
                    <div className="absolute left-6 top-0 h-full w-0.5 bg-slate-200" aria-hidden="true">
                        <div className="h-full bg-orange-500 transition-all duration-1000" style={{ height: isInView ? '100%' : '0%' }}></div>
                    </div>
                    
                    {/* Item Timeline */}
                    <div className="space-y-12">
                        {workProcess.map((item, index) => (
                            <div
                                key={index}
                                className={`relative pl-20 transition-all duration-700 ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}
                                style={{ transitionDelay: `${index * 150}ms` }}
                            >
                                <IconWrapper>{item.icon}</IconWrapper>
                                <h3 className="text-xl font-bold text-slate-800 mb-2">{item.title}</h3>
                                <p className="text-slate-600">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
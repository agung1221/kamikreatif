"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

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
const StarIcon = () => (
    <svg className="h-5 w-5 text-yellow-400 mr-1.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
);

const CheckIcon = () => (
    <svg className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
);

// --- Data Paket Harga ---
const pricingPackages = [
    { 
        name: "Starter", 
        idealFor: "UMKM & brand baru",
        price: { monthly: "1.500.000", yearly: "1.200.000" },
        features: ["Manajemen 1 Akun Socmed", "Desain Konten Dasar", "Setup Iklan (Meta/Google)", "Laporan Performa Dasar"], 
        isPopular: false,
        checkoutUrl: "/checkout/dm-starter"
    },
    { 
        name: "Growth", 
        idealFor: "Bisnis ingin scale",
        price: { monthly: "3.000.000", yearly: "2.500.000" },
        features: ["Manajemen 2 Akun Socmed", "Produksi Konten (Foto/Video)", "Optimasi Iklan & SEO", "Laporan Analitik Mingguan"], 
        isPopular: true,
        checkoutUrl: "/checkout/dm-growth"
    },
    { 
        name: "Ultimate", 
        idealFor: "Bisnis serius ekspansi",
        price: { monthly: "5.000.000", yearly: "4.500.000" },
        features: ["Manajemen Komprehensif", "Strategi Full Funnel", "Email & WA Automation", "Laporan & Konsultasi Strategis"], 
        isPopular: false,
        checkoutUrl: "/checkout/dm-ultimate"
    }
];

// --- Komponen Utama ---
export default function DmHarga() {
    const [ref, isInView] = useInView({ threshold: 0.1, triggerOnce: true });
    const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

    return (
        <>
            <style jsx global>{`
                @keyframes pulse-effect { 0%, 100% { box-shadow: 0 0 0 0 rgba(249, 115, 22, 0); } 70% { box-shadow: 0 0 0 15px rgba(249, 115, 22, 0.7); } }
                .button-pulse { animation: pulse-effect 2.5s infinite; }
            `}</style>
            <section id="paket-harga" ref={ref} className="bg-slate-50 py-20 md:py-28">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-12 max-w-3xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
                            Paket Digital Marketing
                        </h2>
                        <p className="text-lg text-slate-600">
                            Investasi strategis untuk pertumbuhan bisnis yang terukur. Pilih paket yang sesuai dengan tujuan Anda.
                        </p>
                    </div>

                    {/* Toggle Switch */}
                    <div className="flex justify-center items-center space-x-4 mb-16">
                        <span className={`font-medium ${billingCycle === 'monthly' ? 'text-orange-600' : 'text-slate-500'}`}>Bulanan</span>
                        <button onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')} className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors bg-slate-300">
                            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${billingCycle === 'yearly' ? 'translate-x-6' : 'translate-x-1'}`} />
                        </button>
                        <span className={`font-medium ${billingCycle === 'yearly' ? 'text-orange-600' : 'text-slate-500'}`}>Tahunan <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-0.5 rounded-full">HEMAT 20%</span></span>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-end">
                        {pricingPackages.map((plan, index) => (
                            <div
                                key={plan.name}
                                className={`relative bg-white rounded-2xl shadow-lg p-8 flex flex-col transition-all duration-500 transform hover:-translate-y-2 ${plan.isPopular ? 'border-2 border-orange-500 shadow-2xl lg:scale-105' : ''} ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                                style={{ transitionDelay: `${index * 100}ms` }}
                            >
                                {plan.isPopular && (
                                    <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-orange-500 text-white text-xs font-bold uppercase px-4 py-1.5 rounded-full flex items-center">
                                        <StarIcon /> Paling Populer
                                    </div>
                                )}
                                <div className="flex-grow">
                                    <h3 className="text-2xl font-bold text-slate-800">{plan.name}</h3>
                                    <p className="text-slate-500 mt-1 mb-6">{plan.idealFor}</p>
                                    <div className="my-6">
                                        <span className="text-slate-500 text-sm">Mulai dari</span>
                                        <p className="text-4xl font-extrabold text-slate-900">
                                            Rp {plan.price[billingCycle]}
                                        </p>
                                        <span className="text-slate-500 text-sm">/bulan</span>
                                    </div>
                                    <div className="border-t border-slate-200 pt-6">
                                        <h4 className="font-semibold text-slate-700 mb-3">Fitur Utama:</h4>
                                        <ul className="space-y-3 h-28">
                                            {plan.features.map(feature => (
                                                <li key={feature} className="flex items-center text-slate-600">
                                                    <CheckIcon /> {feature}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                                <Link
                                    href={plan.checkoutUrl}
                                    className={`block text-center w-full font-bold py-3 px-6 rounded-lg transition-all duration-300 mt-8 ${plan.isPopular ? 'bg-orange-500 text-white hover:bg-orange-600 button-pulse' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
                                >
                                    Pilih Paket
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
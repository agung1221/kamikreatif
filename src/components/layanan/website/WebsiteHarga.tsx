"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

// --- Type Definitions ---
interface Feature {
  text: string;
  tooltip?: string;
}

interface PricingPackage {
  name: string;
  price: string;
  features: Feature[];
  isPopular: boolean;
  checkoutUrl: string | null;
}


// --- Helper Hook & Komponen ---
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

const CheckIcon = () => (
    <svg className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
);

const StarIcon = () => (
    <svg className="h-5 w-5 text-yellow-400 mr-1.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
);

const InfoIcon = () => (
    <svg className="h-4 w-4 text-slate-400 ml-1.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const Tooltip = ({ text, children }: { text: string, children: React.ReactNode }) => (
    <div className="relative flex items-center group">
        {children}
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-xs bg-slate-800 text-white text-xs rounded-md py-1.5 px-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
            {text}
        </div>
    </div>
);

// --- KOMPONEN MODAL KONSULTASI ---
const ConsultationModal = ({ isOpen, onClose, selectedPlan }: { isOpen: boolean, onClose: () => void, selectedPlan: string }) => {
  const [formData, setFormData] = useState({ name: '', company: '', service: selectedPlan });
  useEffect(() => { setFormData(prev => ({ ...prev, service: selectedPlan })) }, [selectedPlan]);
  if (!isOpen) return null;
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const phoneNumber = '6281287718683';
    const message = `Hallo admin kamikreatif.com, perkenalkan saya ${formData.name} dari perusahaan ${formData.company} ingin memesan/berkonsultasi untuk ${formData.service}.`;
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
    onClose();
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md m-4 relative animate-modal-enter" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-800"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" /></svg></button>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Formulir Konsultasi</h2>
        <form onSubmit={handleSubmit} className="space-y-4 mt-6">
          <div><label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">Nama Anda</label><input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-orange-500 focus:border-orange-500" /></div>
          <div><label htmlFor="company" className="block text-sm font-medium text-slate-700 mb-1">Perusahaan</label><input type="text" id="company" name="company" value={formData.company} onChange={handleChange} required className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-orange-500 focus:border-orange-500" /></div>
          <div><label htmlFor="service" className="block text-sm font-medium text-slate-700 mb-1">Paket yang Diminati</label><input type="text" id="service" name="service" value={formData.service} readOnly className="w-full px-4 py-2 border border-slate-300 rounded-md bg-slate-100" /></div>
          <button type="submit" className="w-full bg-orange-500 text-white font-bold py-3 rounded-md mt-6 hover:bg-orange-600 transform hover:scale-105">Kirim via WhatsApp</button>
        </form>
      </div>
    </div>
  );
};

// --- Data Paket Harga ---
const pricingPackages: PricingPackage[] = [
    { name: "Landing Page", price: "1.299.000", features: [{ text: "Desain Custom"}, { text: "Mobile Friendly"}, { text: "Form Leads"}, { text: "SEO Basic", tooltip: "Optimasi dasar agar website Anda mudah ditemukan di Google."}], isPopular: false, checkoutUrl: "https://cart.kamikreatif.com/landing-page" },
    { name: "Company Profile", price: "2.499.000", features: [{ text: "Hingga 5 Halaman"}, { text: "SEO Optimized"}, { text: "Google Maps"}, { text: "Chat WA Integration"}], isPopular: false, checkoutUrl: "https://cart.kamikreatif.com/company-profile" },
    { name: "E-Commerce", price: "5.000.000", features: [{ text: "Produk & Kategori Tak Terbatas"}, { text: "Payment Gateway", tooltip: "Integrasi dengan Midtrans, Xendit, atau penyedia lain."}, { text: "Auto-Response Chat"}], isPopular: true, checkoutUrl: "https://cart.kamikreatif.com/e-commerce" },
    { name: "Custom Website", price: "Hubungi Kami", features: [{ text: "Sistem Web Apps"}, { text: "Integrasi API"}, { text: "Fitur Sesuai Kebutuhan"}], isPopular: false, checkoutUrl: null }
];

// --- Komponen Utama ---
export default function WebsiteHarga() {
    const [ref, isInView] = useInView({ threshold: 0.1 });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState('');

    const handleConsultationClick = (planName: string) => {
        setSelectedPlan(planName);
        setIsModalOpen(true);
    };

    return (
        <>
            <section id="paket-harga" ref={ref} className="bg-slate-50 py-20 md:py-28">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16 max-w-3xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
                            Paket Harga Transparan & Fleksibel
                        </h2>
                        <p className="text-lg text-slate-600">
                            Investasi sekali, manfaat jangka panjang. Pilih solusi yang paling sesuai dengan kebutuhan bisnis Anda.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {pricingPackages.map((plan, index) => (
                            <div
                                key={plan.name}
                                className={`relative bg-white rounded-2xl shadow-lg p-8 flex flex-col transition-all duration-500 transform hover:-translate-y-2 ${plan.isPopular ? 'border-2 border-orange-500' : 'border border-transparent'} ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                                style={{ transitionDelay: `${index * 100}ms` }}
                            >
                                {plan.isPopular && (
                                    <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-orange-500 text-white text-xs font-bold uppercase px-4 py-1.5 rounded-full flex items-center">
                                        <StarIcon /> Paling Populer
                                    </div>
                                )}
                                <div className="flex-grow">
                                    <h3 className="text-2xl font-bold text-slate-800 text-center">{plan.name}</h3>
                                    <p className="text-center text-4xl font-extrabold text-slate-900 my-6">
                                        {plan.price.startsWith('Hubungi') ? plan.price : `Rp ${plan.price}`}
                                    </p>
                                    <ul className="space-y-4 mb-8">
                                        {plan.features.map(feature => (
                                            <li key={feature.text} className="flex items-center text-slate-600">
                                                <CheckIcon />
                                                <Tooltip text={feature.tooltip || ''}>
                                                    <span>{feature.text}</span>
                                                    {feature.tooltip && <InfoIcon />}
                                                </Tooltip>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                {plan.checkoutUrl ? (
                                    <Link
                                        href={plan.checkoutUrl}
                                        className={`block text-center w-full font-bold py-3 px-6 rounded-lg transition-all duration-300 mt-4 ${plan.isPopular ? 'bg-orange-500 text-white hover:bg-orange-600' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
                                    >
                                        Pesan Sekarang
                                    </Link>
                                ) : (
                                    <button
                                        onClick={() => handleConsultationClick(plan.name)}
                                        className={`w-full font-bold py-3 px-6 rounded-lg transition-all duration-300 mt-4 ${plan.isPopular ? 'bg-orange-500 text-white hover:bg-orange-600' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
                                    >
                                        Konsultasi
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-16">
                        <p className="text-slate-600">
                            📞 Punya kebutuhan yang lebih spesifik? <button onClick={() => handleConsultationClick('Custom Website')} className="text-orange-600 font-semibold hover:underline">Konsultasi Gratis Tanpa Komitmen</button>
                        </p>
                    </div>
                </div>
            </section>
            <ConsultationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} selectedPlan={selectedPlan} />
        </>
    );
}

"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// --- Komponen Ikon ---
const ArrowIcon = () => (
  <svg className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5-5 5M6 12h12" />
  </svg>
);

// --- KOMPONEN MODAL KONSULTASI ---
const ConsultationModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [formData, setFormData] = useState({ name: '', company: '', service: 'Pembuatan Website' });
  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const phoneNumber = '6281287718683'; // Ganti dengan nomor WhatsApp Anda
    const message = `Hallo admin kamikreatif.com, perkenalkan saya ${formData.name} dari perusahaan ${formData.company} ingin berkonsultasi untuk ${formData.service}.`;
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md m-4 relative animate-modal-enter" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-800"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" /></svg></button>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Formulir Konsultasi</h2>
        <p className="text-slate-600 mb-6">Isi data di bawah ini untuk memulai percakapan di WhatsApp.</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div><label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">Nama Anda</label><input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-orange-500 focus:border-orange-500" /></div>
          <div><label htmlFor="company" className="block text-sm font-medium text-slate-700 mb-1">Perusahaan</label><input type="text" id="company" name="company" value={formData.company} onChange={handleChange} required className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-orange-500 focus:border-orange-500" /></div>
          <div><label htmlFor="service" className="block text-sm font-medium text-slate-700 mb-1">Layanan yang Diminati</label><select id="service" name="service" value={formData.service} onChange={handleChange} className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-orange-500 focus:border-orange-500"><option>Pembuatan Landing Page</option><option>Pembuatan Company Profile</option><option>Pembuatan E-Commerce / Toko Online</option><option>Pembuatan Custom Web Application</option></select></div>
          <button type="submit" className="w-full bg-orange-500 text-white font-bold py-3 rounded-md mt-6 hover:bg-orange-600 transform hover:scale-105">Kirim via WhatsApp</button>
        </form>
      </div>
    </div>
  );
};

// --- Komponen Mockup Website Interaktif ---
const WebsiteMockup = () => (
    <div className="group relative aspect-[16/10] w-full max-w-xl mx-auto">
        {/* Browser Frame */}
        <div className="absolute inset-0 rounded-xl shadow-2xl bg-slate-200 p-2.5">
            <div className="flex items-center gap-1.5 mb-2">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
            </div>
            <div className="bg-white h-[calc(100%-24px)] rounded-md overflow-hidden">
                {/* Scrolling Content */}
                <div className="h-full w-full">
                    <Image
                        src="/websitemodern.jpg"
                        alt="Konten website modern"
                        width={800}
                        height={1200}
                        className="w-full h-auto object-cover transition-transform duration-500 ease-out group-hover:-translate-y-1/3"
                        priority // Optimasi LCP
                        sizes="(max-width: 1024px) 100vw, 50vw" // Optimasi Ukuran Gambar
                    />
                </div>
            </div>
        </div>
        <div className="absolute -bottom-4 -right-4 bg-white/80 backdrop-blur-sm text-slate-800 text-xs font-bold px-3 py-1.5 rounded-full shadow-md z-10 transition-transform duration-300 group-hover:scale-110">
            Powered by Kami<span className="text-orange-500">Kreatif</span>
        </div>
    </div>
);

// --- Komponen Utama ---
export default function WebsiteHero() {
    const [isMounted, setIsMounted] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsMounted(true), 100);
        return () => clearTimeout(timer);
    }, []);

    const headline = "Website\nBukan\nCuma\nTampil\nKeren.\nWebsite\nAdalah\nMesin\nPenghasil\nPelanggan\nAnda.";

    return (
        <>
            <style jsx global>{`
                @keyframes pulse-effect { 0%, 100% { box-shadow: 0 0 0 0 rgba(249, 115, 22, 0); } 70% { box-shadow: 0 0 0 15px rgba(249, 115, 22, 0.7); } }
                .button-pulse { animation: pulse-effect 2.5s infinite; animation-delay: 1.5s; }
                @keyframes modal-enter { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
                .animate-modal-enter { animation: modal-enter 0.3s ease-out forwards; }
            `}</style>
            <section className="relative bg-slate-50 py-20 md:py-28 overflow-hidden">
                {/* Latar Belakang Blob Animasi */}
                <div className="absolute top-0 left-0 w-96 h-96 bg-orange-200/50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-sky-200/50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>

                <div className="relative container mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
                    {/* Kolom Kiri: Konten Teks */}
                    <div>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight mb-6">
                            {headline.split(' ').map((word, index) => (
                                <span key={index} className={`inline-block transition-all duration-700 ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`} style={{ transitionDelay: `${index * 50}ms` }}>
                                    {word}{' '}
                                </span>
                            ))}
                        </h1>
                        <p className={`text-lg text-slate-600 mb-8 transition-all duration-700 delay-500 ${isMounted ? 'opacity-100' : 'opacity-0'}`}>
                            Kami Kreatif bantu Anda memiliki website profesional yang cepat, mobile-friendly, SEO-ready, dan dirancang untuk menghasilkan lebih banyak konversi.
                        </p>
                        {/* Social Proof dengan Avatar */}
                        <div className={`flex items-center mb-8 transition-all duration-700 delay-700 ${isMounted ? 'opacity-100' : 'opacity-0'}`}>
                            <div className="flex -space-x-3">
                                <Image src="/agung.jpg" alt="Avatar 1" width={40} height={40} className="rounded-full ring-2 ring-white" />
                                <Image src="/aisyah.jpg" alt="Avatar 2" width={40} height={40} className="rounded-full ring-2 ring-white" />
                                <Image src="/femi.jpg" alt="Avatar 3" width={40} height={40} className="rounded-full ring-2 ring-white" />
                            </div>
                            <span className="ml-4 font-semibold text-slate-600">Bergabung dengan 200+ bisnis lainnya.</span>
                        </div>
                        <div className={`flex flex-col sm:flex-row gap-4 transition-all duration-700 delay-[900ms] ${isMounted ? 'opacity-100' : 'opacity-0'}`}>
                            <button onClick={() => setIsModalOpen(true)} className="relative group inline-flex items-center justify-center bg-orange-500 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-orange-600 transition-all duration-300 transform hover:-translate-y-1 button-pulse">
                                Konsultasi Gratis Sekarang
                                <ArrowIcon />
                            </button>
                            <Link href="/portfolio" className="group inline-flex items-center justify-center bg-white border-2 border-slate-300 text-slate-700 font-bold py-3 px-8 rounded-full hover:bg-slate-100 hover:border-slate-400 transition-all duration-300 transform hover:-translate-y-1">
                                Lihat Portofolio Kami
                            </Link>
                        </div>
                    </div>

                    {/* Kolom Kanan: Visual Mockup */}
                    <div className={`relative transition-all duration-1000 delay-200 ${isMounted ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                        <WebsiteMockup />
                    </div>
                </div>
            </section>
            <ConsultationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    );
}

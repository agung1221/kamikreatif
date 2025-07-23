"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

// --- KOMPONEN MODAL KONSULTASI ---
const ConsultationModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [formData, setFormData] = useState({ name: '', company: '', service: 'Digital Marketing' });
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
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-[100]" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md m-4 relative" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-800"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" /></svg></button>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Formulir Konsultasi</h2>
        <form onSubmit={handleSubmit} className="space-y-4 mt-6">
          <div><label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">Nama Anda</label><input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-orange-500 focus:border-orange-500" /></div>
          <div><label htmlFor="company" className="block text-sm font-medium text-slate-700 mb-1">Perusahaan</label><input type="text" id="company" name="company" value={formData.company} onChange={handleChange} required className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-orange-500 focus:border-orange-500" /></div>
          <button type="submit" className="w-full bg-orange-500 text-white font-bold py-3 rounded-md mt-6 hover:bg-orange-600 transform hover:scale-105">Kirim via WhatsApp</button>
        </form>
      </div>
    </div>
  );
};

// --- Komponen Utama Hero ---
export default function DmHero() {
    const [isMounted, setIsMounted] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsMounted(true), 100);
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <style jsx global>{`
                @keyframes pulse-effect { 0%, 100% { box-shadow: 0 0 0 0 rgba(249, 115, 22, 0); } 70% { box-shadow: 0 0 0 15px rgba(249, 115, 22, 0.7); } }
                .button-pulse { animation: pulse-effect 2.5s infinite; animation-delay: 1.2s; }
                @keyframes blob { 0% { transform: translate(0px, 0px) scale(1); } 33% { transform: translate(30px, -50px) scale(1.1); } 66% { transform: translate(-20px, 20px) scale(0.9); } 100% { transform: translate(0px, 0px) scale(1); } }
                .animate-blob { animation: blob 7s infinite; }
                .animation-delay-2000 { animation-delay: 2s; }
            `}</style>
            <section className="relative bg-slate-50 py-20 md:py-28 overflow-hidden">
                {/* Latar Belakang Blob Animasi */}
                <div className="absolute top-0 -left-4 w-72 h-72 bg-orange-200/50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
                <div className="absolute bottom-0 -right-4 w-72 h-72 bg-sky-200/50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>

                <div className="relative container mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Kolom Kiri: Konten Teks */}
                        <div className={`text-center lg:text-left transition-all duration-1000 ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight mb-6">
                                🚀 Digital Marketing yang <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">Meningkatkan Omzet</span>, Bukan Sekadar View
                            </h1>
                            <p className="text-lg text-slate-600 mb-8">
                                Dari iklan berbayar, konten kreatif, hingga SEO — kami bantu bisnis Anda tumbuh terukur dengan strategi digital yang tepat sasaran.
                            </p>
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="relative group inline-flex items-center justify-center bg-orange-500 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-orange-600 transition-all duration-300 transform hover:-translate-y-1 button-pulse"
                            >
                                Konsultasi Gratis 15 Menit
                            </button>
                        </div>

                        {/* Kolom Kanan: Visual Gambar Animasi */}
                        <div className={`relative transition-all duration-1000 delay-200 ${isMounted ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                            <div className="relative aspect-square max-w-md mx-auto">
                                <Image
                                    src="/dmhero.gif"
                                    alt="Ilustrasi animasi funnel marketing"
                                    layout="fill"
                                    objectFit="contain"
                                    priority
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <ConsultationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    );
}
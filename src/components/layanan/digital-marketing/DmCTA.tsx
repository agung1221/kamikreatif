"use client";

import React, { useState } from 'react';

// --- Komponen Ikon ---
const ArrowIcon = () => (
  <svg className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5-5 5M6 12h12" />
  </svg>
);

// --- KOMPONEN MODAL KONSULTASI ---
const ConsultationModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [formData, setFormData] = useState({ name: '', company: '', service: 'Digital Marketing' });
  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const phoneNumber = '6281287718683'; // Ganti dengan nomor WhatsApp Anda
    const message = `Hallo admin kamikreatif.com, perkenalkan saya ${formData.name} dari perusahaan ${formData.company} ingin menjadwalkan konsultasi Digital Marketing.`;
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md m-4 relative animate-modal-enter" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-800"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" /></svg></button>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Jadwalkan Konsultasi</h2>
        <p className="text-slate-600 mb-6">Isi data singkat di bawah ini untuk melanjutkan ke WhatsApp.</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div><label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">Nama Anda</label><input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-orange-500 focus:border-orange-500" /></div>
          <div><label htmlFor="company" className="block text-sm font-medium text-slate-700 mb-1">Perusahaan</label><input type="text" id="company" name="company" value={formData.company} onChange={handleChange} required className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-orange-500 focus:border-orange-500" /></div>
          <button type="submit" className="w-full bg-orange-500 text-white font-bold py-3 rounded-md mt-6 hover:bg-orange-600 transform hover:scale-105">Lanjut ke WhatsApp</button>
        </form>
      </div>
    </div>
  );
};

// --- Komponen Utama ---
export default function DmCTA() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <section className="bg-white">
                <div className="container mx-auto px-6 py-20 md:py-24">
                    <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white rounded-2xl shadow-2xl p-10 md:p-16 text-center">
                        <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
                            Mulai Transformasi Digital Bisnismu Hari Ini
                        </h2>
                        <p className="max-w-2xl mx-auto text-lg text-slate-300 mb-10">
                            Gratis sesi konsultasi untuk merancang strategi digital terbaik untuk bisnis Anda.
                        </p>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="relative group inline-flex items-center justify-center bg-orange-500 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-orange-600 transition-all duration-300 transform hover:-translate-y-1 button-pulse"
                        >
                            Jadwalkan Konsultasi
                            <ArrowIcon />
                        </button>
                    </div>
                </div>
            </section>
            <ConsultationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    );
}
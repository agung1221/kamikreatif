"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// --- Ikon Kustom ---
// Ikon panah dengan transisi yang lebih halus
const ArrowIcon = () => (
  <svg className="w-5 h-5 ml-2 transition-transform duration-300 ease-in-out group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
);

// Ikon X untuk menutup modal
const CloseIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);


// --- KOMPONEN MODAL KONSULTASI (Desain Ulang) ---
const ConsultationModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [formData, setFormData] = useState({ name: '', company: '', service: 'Pembuatan Website' });
  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const phoneNumber = '6281287718683'; // Ganti dengan nomor WhatsApp Anda
    const message = `Hallo admin kamikreatif.com, perkenalkan saya ${formData.name} dari perusahaan ${formData.company}. Saya tertarik untuk konsultasi mengenai layanan ${formData.service}.`;
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-gradient-to-br from-white to-slate-50 rounded-2xl shadow-2xl p-8 w-full max-w-md m-4 relative animate-modal-enter border border-slate-200" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-800 transition-colors duration-300">
            <CloseIcon />
        </button>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Mulai Konsultasi Gratis</h2>
        <p className="text-slate-600 mb-6">Isi data singkat di bawah ini. Kami akan segera menghubungi Anda di WhatsApp.</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">Nama Lengkap</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-amber-500 transition-all duration-300" placeholder="Contoh: Budi Santoso" />
          </div>
          <div>
            <label htmlFor="company" className="block text-sm font-medium text-slate-700 mb-1">Nama Perusahaan/Brand</label>
            <input type="text" id="company" name="company" value={formData.company} onChange={handleChange} required className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-amber-500 transition-all duration-300" placeholder="Contoh: PT Maju Jaya" />
          </div>
          <div>
            <label htmlFor="service" className="block text-sm font-medium text-slate-700 mb-1">Layanan yang Diminati</label>
            <select id="service" name="service" value={formData.service} onChange={handleChange} className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-amber-500 transition-all duration-300">
              <option>Pembuatan Landing Page</option>
              <option>Pembuatan Company Profile</option>
              <option>Pembuatan E-Commerce / Toko Online</option>
              <option>Pembuatan Custom Web Application</option>
            </select>
          </div>
          <button type="submit" className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold py-3 rounded-lg mt-6 hover:from-amber-600 hover:to-orange-600 transform hover:scale-[1.02] transition-all duration-300 shadow-lg shadow-orange-500/30">
            Kirim & Lanjut ke WhatsApp
          </button>
        </form>
      </div>
    </div>
  );
};

// --- Komponen Mockup Website Interaktif (Desain Ulang dengan Efek 3D) ---
const WebsiteMockup = () => (
    // Kontainer untuk efek perspektif 3D
    <div className="group relative [perspective:1500px]">
        <div className="relative aspect-[16/10] w-full max-w-2xl mx-auto transition-transform duration-500 ease-out group-hover:rotate-x-2 group-hover:-rotate-y-2 group-hover:scale-[1.05]">
            {/* Bingkai Browser */}
            <div className="absolute inset-0 rounded-xl shadow-2xl shadow-black/20 bg-slate-200/80 p-2.5">
                <div className="flex items-center gap-1.5 mb-2">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <div className="bg-white h-[calc(100%-24px)] rounded-md overflow-hidden">
                    {/* Konten yang bisa di-scroll */}
                    <div className="h-full w-full">
                        <Image
                            src="/websitemodern.jpg"
                            alt="tampilan website modern dan profesional"
                            width={800}
                            height={1200}
                            className="w-full h-auto object-cover transition-transform duration-[5000ms] ease-out group-hover:-translate-y-1/2"
                            priority // Optimasi LCP
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px" // Optimasi Ukuran Gambar
                            onError={(e) => { e.currentTarget.src = 'https://placehold.co/800x1200/e0e0e0/b0b0b0?text=Image+Error'; }}
                        />
                    </div>
                </div>
            </div>
             <div className="absolute -bottom-4 -right-4 bg-white/80 backdrop-blur-sm text-slate-800 text-xs font-bold px-3 py-1.5 rounded-full shadow-md z-10 transition-transform duration-300 group-hover:scale-110">
                Powered by Kami<span className="text-orange-500">Kreatif</span>
            </div>
        </div>
    </div>
);


// --- Komponen Utama Hero (Desain Ulang) ---
export default function WebsiteHero() {
    const [isMounted, setIsMounted] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        // Memicu animasi setelah komponen terpasang
        const timer = setTimeout(() => setIsMounted(true), 100);
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            {/* Definisi Keyframes untuk animasi */}
            <style jsx global>{`
                @keyframes pulse-glow { 
                    0%, 100% { 
                        box-shadow: 0 0 0 0 rgba(249, 115, 22, 0.4); 
                    } 
                    70% { 
                        box-shadow: 0 0 0 15px rgba(249, 115, 22, 0); 
                    } 
                }
                .button-pulse-glow { 
                    animation: pulse-glow 2.5s infinite; 
                    animation-delay: 1s; 
                }
                @keyframes modal-enter { 
                    from { opacity: 0; transform: scale(0.95) translateY(10px); } 
                    to { opacity: 1; transform: scale(1) translateY(0); } 
                }
                .animate-modal-enter { 
                    animation: modal-enter 0.3s ease-out forwards; 
                }
                @keyframes blob-move {
                    0% { transform: translate(0px, 0px) scale(1); }
                    33% { transform: translate(30px, -50px) scale(1.1); }
                    66% { transform: translate(-20px, 20px) scale(0.9); }
                    100% { transform: translate(0px, 0px) scale(1); }
                }
                .animate-blob {
                    animation: blob-move 15s ease-in-out infinite;
                }
            `}</style>
            
            <section className="relative bg-gradient-to-br from-white to-slate-100 w-full py-20 md:py-28 overflow-hidden">
                {/* Latar Belakang Blob Animasi yang lebih halus */}
                <div className="absolute top-0 -left-40 w-96 h-96 md:w-[32rem] md:h-[32rem] bg-orange-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
                <div className="absolute bottom-0 -right-40 w-96 h-96 md:w-[32rem] md:h-[32rem] bg-sky-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob" style={{animationDelay: '3s'}}></div>

                <div className="relative container mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-x-12 gap-y-16 items-center">
                    
                    {/* Kolom Kiri: Konten Teks */}
                    <div className={`flex flex-col justify-center transition-all duration-1000 ${isMounted ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                        {/* SEO: H1 tag untuk judul utama */}
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight mb-6">
                            Wujudkan Website Impian yang <span className="text-amber-500">Menghasilkan</span>
                        </h1>
                        
                        <p className={`text-lg text-slate-600 max-w-xl mb-8 transition-opacity duration-1000 delay-200 ${isMounted ? 'opacity-100' : 'opacity-0'}`}>
                            Kami bukan hanya membangun website, kami merancang mesin penjualan digital. Dapatkan website profesional yang cepat, SEO-friendly, dan dioptimalkan untuk mengubah pengunjung menjadi pelanggan.
                        </p>
                        
                        {/* Social Proof (Bukti Sosial) */}
                        <div className={`flex items-center mb-10 transition-opacity duration-1000 delay-300 ${isMounted ? 'opacity-100' : 'opacity-0'}`}>
                            <div className="flex -space-x-3">
                                <Image src="/agung.jpg" alt="Wajah Klien 1" width={40} height={40} className="rounded-full ring-2 ring-white" />
                                <Image src="/aisyah.jpg" alt="Wajah Klien 2" width={40} height={40} className="rounded-full ring-2 ring-white" />
                                <Image src="/femi.jpg" alt="Wajah Klien 3" width={40} height={40} className="rounded-full ring-2 ring-white" />
                            </div>
                            <span className="ml-4 font-semibold text-slate-600">Dipercaya oleh 200+ bisnis sukses.</span>
                        </div>

                        {/* Tombol Aksi (CTA) */}
                        <div className={`flex flex-col sm:flex-row gap-4 transition-opacity duration-1000 delay-500 ${isMounted ? 'opacity-100' : 'opacity-0'}`}>
                            <button onClick={() => setIsModalOpen(true)} className="group inline-flex items-center justify-center bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold py-3 px-8 rounded-full shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/40 transition-all duration-300 transform hover:-translate-y-1 button-pulse-glow">
                                Konsultasi Gratis
                                <ArrowIcon />
                            </button>
                            <Link href="/portofolio" className="group inline-flex items-center justify-center bg-white text-slate-700 font-bold py-3 px-8 rounded-full border-2 border-slate-300 hover:bg-slate-50 hover:border-slate-400 transition-all duration-300 transform hover:-translate-y-1">
                                Lihat Portofolio
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

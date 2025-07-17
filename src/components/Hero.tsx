"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// --- KOMPONEN-KOMPONEN KECIL ---
const ArrowIcon = () => (
  <svg className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5-5 5M6 12h12" />
  </svg>
);

const PlayIcon = () => (
    <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
    </svg>
);

const ClientLogo = ({ src, alt }: { src: string; alt: string; }) => (
    <div className="flex-shrink-0 mx-10 flex items-center justify-center h-16">
        <Image 
            src={src} 
            alt={alt} 
            width={120} 
            height={40} 
            style={{ objectFit: 'contain' }}
            className="filter grayscale opacity-60 transition-all duration-300 hover:grayscale-0 hover:opacity-100"
        />
    </div>
);

// --- KOMPONEN MODAL FORM ---
const ConsultationModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [formData, setFormData] = useState({ name: '', company: '', service: 'Diskusi Umum' });
  if (!isOpen) return null;
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const phoneNumber = '6281234567890';
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

// --- KOMPONEN UTAMA HERO ---
export default function Hero() {
  const [isMounted, setIsMounted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [playVideo, setPlayVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (playVideo && videoRef.current) {
        videoRef.current.play();
    }
  }, [playVideo]);

  const clientLogos = [
    { src: "/klien-1.png", alt: "Logo Klien A" },
    { src: "/klien-2.png", alt: "Logo Klien B" },
    { src: "/klien-3.png", alt: "Logo Klien C" },
    { src: "/klien-4.png", alt: "Logo Klien D" },
    { src: "/klien-5.png", alt: "Logo Klien E" },
    { src: "/klien-6.png", alt: "Logo Klien F" },
  ];

  return (
    <>
      <style jsx global>{`
        @keyframes scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        .hover\\:pause-animation:hover {
          animation-play-state: paused;
        }
        @keyframes pulse-effect { 0%, 100% { box-shadow: 0 0 0 0 rgba(249, 115, 22, 0); } 70% { box-shadow: 0 0 0 15px rgba(249, 115, 22, 0.7); } }
        .button-pulse { animation: pulse-effect 2.5s infinite; animation-delay: 1.5s; }
      `}</style>
      
      <section className="relative bg-white pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:32px_32px] opacity-30"></div>
        <div className="relative container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Kolom Kiri: Konten Teks */}
            <div className="text-center lg:text-left z-10">
              <div className={`transition-all duration-700 delay-100 ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
                  <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
                    Solusi Digital Cerdas
                  </span>
                  <br/>
                  <span className="text-slate-900">untuk Bisnis Anda.</span>
                </h1>
                <p className="max-w-xl mx-auto lg:mx-0 text-lg text-slate-600 mb-10">
                  Kami membantu bisnis Anda bertumbuh melalui desain website modern, strategi marketing yang efektif, dan pengembangan tools inovatif.
                </p>
              </div>
              <div className={`flex flex-col sm:flex-row gap-4 justify-center lg:justify-start transition-all duration-700 delay-300 ${isMounted ? 'opacity-100' : 'opacity-0'}`}>
                <button onClick={() => setIsModalOpen(true)} className="relative group inline-flex items-center justify-center bg-orange-500 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-orange-600 transition-all duration-300 transform hover:-translate-y-1 button-pulse">
                  Konsultasi Gratis
                  <ArrowIcon />
                </button>
                <Link href="#portofolio" className="group inline-flex items-center justify-center bg-white border-2 border-slate-300 text-slate-700 font-bold py-3 px-8 rounded-full hover:bg-slate-100 hover:border-slate-400 transition-all duration-300 transform hover:-translate-y-1">
                  Lihat Portofolio
                </Link>
              </div>
            </div>
            
            {/* Kolom Kanan: Video Player */}
            <div className={`relative mt-12 lg:mt-0 transition-all duration-1000 delay-500 ${isMounted ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
              <div className="aspect-video rounded-xl shadow-2xl overflow-hidden ring-1 ring-black/5 bg-slate-900">
                {playVideo ? (
                  <video
                    ref={videoRef}
                    className="w-full h-full object-cover"
                    src="/Introkk.mp4"
                    title="Intro Kami Kreatif"
                    controls
                    loop
                    muted
                    playsInline
                  >
                    Browser Anda tidak mendukung tag video.
                  </video>
                ) : (
                  <div className="w-full h-full flex items-center justify-center cursor-pointer relative" onClick={() => setPlayVideo(true)}>
                    {/* Ganti dengan path thumbnail video Anda */}
                    <Image src="/thumbnail-video.jpg" alt="Video Thumbnail" layout="fill" objectFit="cover" priority />
                    <div className="absolute inset-0 transition-opacity duration-300 hover:bg-opacity-20"></div>
                    <div className="absolute">
                        <div className="bg-black/30 p-4 rounded-full backdrop-blur-sm transition-transform duration-300 hover:scale-110">
                            <PlayIcon />
                        </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Logo Slider Klien */}
        <div className={`mt-24 lg:mt-32 transition-all duration-1000 delay-700 ${isMounted ? 'opacity-100' : 'opacity-0'}`}>
          <h3 className="text-sm font-bold text-center text-slate-500 tracking-widest uppercase mb-8">
            DIPERCAYA OLEH PERUSAHAAN TERKEMUKA
          </h3>
          <div className="relative w-full overflow-hidden">
            <div className="flex w-max animate-scroll hover:pause-animation">
              {[...clientLogos, ...clientLogos].map((logo, index) => (
                <ClientLogo key={`logo-${index}`} src={logo.src} alt={logo.alt} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <ConsultationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}

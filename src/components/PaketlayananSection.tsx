"use client";

import React, { useState, useEffect, useRef } from 'react';

// --- Helper Hook & Komponen ---
interface UseInViewOptions extends IntersectionObserverInit {
  triggerOnce?: boolean;
}
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
        return () => observer.unobserve(element);
    }, [triggerOnce, observerOptions]);
    return [ref, isInView];
};

const CheckIcon = ({ isDimmed = false }: { isDimmed?: boolean }) => (
    <svg className={`h-6 w-6 mr-3 flex-shrink-0 ${isDimmed ? 'text-slate-400' : 'text-green-500'}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
);

// --- KOMPONEN MODAL KONSULTASI ---
const ConsultationModal = ({ isOpen, onClose, selectedPlan }: { isOpen: boolean, onClose: () => void, selectedPlan: string }) => {
  const [formData, setFormData] = useState({ name: '', company: '', service: selectedPlan });
  useEffect(() => { setFormData(prev => ({ ...prev, service: selectedPlan })) }, [selectedPlan]);
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
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md m-4 relative animate-modal-enter" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-800"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" /></svg></button>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Formulir Konsultasi</h2>
        <p className="text-slate-600 mb-6">Isi data di bawah ini untuk memulai percakapan di WhatsApp.</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div><label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">Nama Anda</label><input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-orange-500 focus:border-orange-500" /></div>
          <div><label htmlFor="company" className="block text-sm font-medium text-slate-700 mb-1">Perusahaan</label><input type="text" id="company" name="company" value={formData.company} onChange={handleChange} required className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-orange-500 focus:border-orange-500" /></div>
          <div><label htmlFor="service" className="block text-sm font-medium text-slate-700 mb-1">Paket yang Diminati</label><select id="service" name="service" value={formData.service} onChange={handleChange} className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-orange-500 focus:border-orange-500"><option>Paket Basic</option><option>Paket Pro</option><option>Paket Custom</option></select></div>
          <button type="submit" className="w-full bg-orange-500 text-white font-bold py-3 rounded-md mt-6 hover:bg-orange-600 transform hover:scale-105">Kirim via WhatsApp</button>
        </form>
      </div>
    </div>
  );
};

// --- Data Paket Layanan (Bundling) ---
const pricingPlans = [
  { name: "Basic", price: { oneTime: "7.499.000", maintenance: "6.499.000" }, maintenanceFee: "500rb/bln", description: "Paket esensial untuk meluncurkan kehadiran digital bisnis Anda.", features: [{ text: "Website Profesional (hingga 5 halaman)" }, { text: "Setup Google Business & SEO Awal" }, { text: "Integrasi Form Kontak & WhatsApp" }, { text: "Desain Responsif (Mobile-Friendly)" }, { text: "1x Sesi Revisi Desain" }], isPopular: false },
  { name: "Pro", price: { oneTime: "14.999.000", maintenance: "12.999.000" }, maintenanceFee: "1jt/bln", description: "Solusi lengkap untuk akselerasi pertumbuhan dan jangkauan pasar.", features: [{ text: "Semua di Paket Basic, ditambah:", isDimmed: true }, { text: "Website Kustom (hingga 10 halaman) + Blog" }, { text: "Manajemen 2 Akun Media Sosial" }, { text: "Laporan Performa Digital Bulanan" }, { text: "Dashboard Analitik Pengunjung" }, { text: "Dukungan Prioritas" }], isPopular: true },
  { name: "Custom", price: { oneTime: "Hubungi Kami", maintenance: "Hubungi Kami" }, maintenanceFee: "N/A", description: "Kemitraan strategis dengan solusi yang dirancang khusus untuk Anda.", features: [{ text: "Solusi Skala Enterprise (Portal, Web App)" }, { text: "Strategi & Kampanye Digital Penuh" }, { text: "Pengembangan Sistem & Automasi Internal" }, { text: "Manajemen Iklan (SEO/SEM)" }, { text: "Dedicated Account Manager" }], isPopular: false },
];

// --- Komponen Utama ---
export default function PaketLayananSection() {
  const [ref, isInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('Paket Pro');
  const [billingCycle, setBillingCycle] = useState<'oneTime' | 'maintenance'>('oneTime');

  const handleCTAClick = (planName: string) => {
    setSelectedPlan(`Paket ${planName}`);
    setIsModalOpen(true);
  };

  return (
    <>
      {/* Menambahkan definisi animasi pulse */}
      <style jsx global>{`
        @keyframes pulse-effect { 0% { box-shadow: 0 0 0 0 rgba(249, 115, 22, 0.7); } 70% { box-shadow: 0 0 0 15px rgba(249, 115, 22, 0); } 100% { box-shadow: 0 0 0 0 rgba(249, 115, 22, 0); } }
        .button-pulse { animation: pulse-effect 2.5s infinite; }
        @keyframes modal-enter { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        .animate-modal-enter { animation: modal-enter 0.3s ease-out forwards; }
      `}</style>

      <section id="paket-layanan" className="bg-slate-50 py-20 md:py-28 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Solusi Digital Terintegrasi</h2>
            <p className="max-w-2xl mx-auto text-lg text-slate-600">Pilih paket lengkap yang mencakup semua kebutuhan digital Anda, dari website hingga marketing.</p>
          </div>

          <div className="flex justify-center items-center space-x-4 mb-16">
            <span className={`font-medium ${billingCycle === 'oneTime' ? 'text-orange-600' : 'text-slate-500'}`}>Satu Kali Bayar</span>
            <button onClick={() => setBillingCycle(billingCycle === 'oneTime' ? 'maintenance' : 'oneTime')} className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors bg-slate-300">
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${billingCycle === 'maintenance' ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
            <span className={`font-medium ${billingCycle === 'maintenance' ? 'text-orange-600' : 'text-slate-500'}`}>Dengan Maintenance <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-0.5 rounded-full">LEBIH HEMAT</span></span>
          </div>

          <div ref={ref as React.RefObject<HTMLDivElement>} className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-start">
            {pricingPlans.map((plan, index) => (
              <div key={plan.name} className={`relative bg-white rounded-xl shadow-lg p-8 flex flex-col h-full transition-all duration-500 transform ${plan.isPopular ? 'border-2 border-orange-500 shadow-2xl scale-105' : 'hover:scale-105'} ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: `${index * 150}ms` }}>
                {plan.isPopular && <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-orange-500 text-white text-xs font-bold uppercase px-4 py-1.5 rounded-full">Paling Populer</div>}
                <div className="flex-grow">
                  <h3 className="text-2xl font-bold text-slate-800 text-center">{plan.name}</h3>
                  <p className="text-slate-500 text-center mt-2 mb-6 h-12">{plan.description}</p>
                  <div className="text-center my-6">
                    <span className="text-4xl font-extrabold text-slate-900">{plan.price[billingCycle].startsWith('Hubungi') ? plan.price[billingCycle] : `Rp ${plan.price[billingCycle]}`}</span>
                    {billingCycle === 'oneTime' && !plan.price.oneTime.startsWith('Hubungi') && <span className="text-slate-500"> /proyek</span>}
                    {billingCycle === 'maintenance' && !plan.price.maintenance.startsWith('Hubungi') && <span className="text-slate-500"> + {plan.maintenanceFee}</span>}
                  </div>
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature) => (
                      <li key={feature.text} className="flex items-start">
                        <CheckIcon isDimmed={feature.isDimmed} />
                        <span className={feature.isDimmed ? 'text-slate-400 italic' : 'text-slate-600'}>{feature.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                {/* Menambahkan kelas 'button-pulse' secara kondisional */}
                <button onClick={() => handleCTAClick(plan.name)} className={`w-full font-bold py-3 px-6 rounded-lg transition-all duration-300 mt-4 ${plan.isPopular ? 'bg-orange-500 text-white hover:bg-orange-600 button-pulse' : 'bg-orange-100 text-orange-700 hover:bg-orange-200'}`}>Konsultasi Sekarang</button>
              </div>
            ))}
          </div>
        </div>
      </section>
      <ConsultationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} selectedPlan={selectedPlan} />
    </>
  );
}
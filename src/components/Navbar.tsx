"use client";

import React, { useState } from "react"; // 'useEffect' dihapus karena tidak digunakan
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";

// --- KOMPONEN MODAL KONSULTASI ---
const ConsultationModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [formData, setFormData] = useState({ name: '', company: '', service: 'Diskusi Umum' });
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

// --- Komponen Utama Navbar ---
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const pathname = usePathname();

  const serviceLinks = [
    { href: "/layanan", label: "Semua Layanan" },
    { href: "/layanan/pembuatan-website", label: "Pembuatan Website" },
    { href: "/layanan/digital-marketing", label: "Digital Marketing" },
    { href: "/layanan/social-media", label: "Social Media" },
    { href: "/layanan/tools-automasi", label: "Tools & Automasi" },
  ];

  const navLinks = [
    { href: "/", label: "Beranda" },
    { href: "/tentang", label: "Tentang" },
    { href: "/layanan", label: "Layanan", dropdown: serviceLinks },
    { href: "/portofolio", label: "Portofolio" },
    { href: "/kontak", label: "Kontak" },
  ];

  const isActive = (href: string) => pathname === href;
  const isServiceActive = () => pathname.startsWith('/layanan');

  return (
    <>
      <nav className="bg-white/80 backdrop-blur-md fixed top-0 left-0 w-full z-50 shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="text-xl font-bold text-orange-500">
              Kami<span className="text-slate-900">Kreatif</span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) =>
                link.dropdown ? (
                  <div
                    key={link.href}
                    className="relative"
                    onMouseEnter={() => setIsServicesOpen(true)}
                    onMouseLeave={() => setIsServicesOpen(false)}
                  >
                    <button className={`flex items-center transition-colors duration-200 font-medium ${isServiceActive() ? "text-orange-500" : "text-slate-900 hover:text-orange-500"}`}>
                      {link.label}
                      <ChevronDown size={16} className={`ml-1 transition-transform duration-200 ${isServicesOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {isServicesOpen && (
                      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
                        <div className="py-2">
                          {link.dropdown.map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              className={`block px-4 py-2 text-sm ${isActive(item.href) ? 'text-orange-600 font-semibold' : 'text-slate-700'} hover:bg-slate-100 hover:text-orange-600`}
                            >
                              {item.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link key={link.href} href={link.href} className={`transition-colors duration-200 font-medium ${isActive(link.href) ? "text-orange-500" : "text-slate-900 hover:text-orange-500"}`}>
                    {link.label}
                  </Link>
                )
              )}
              <button
                onClick={() => setIsModalOpen(true)}
                className="ml-4 px-4 py-2 rounded-lg bg-orange-500 text-white hover:bg-orange-600 transition-colors duration-200 text-sm font-semibold"
              >
                Konsultasi Gratis
              </button>
            </div>

            {/* Mobile Toggle */}
            <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-slate-900" aria-label="Toggle Menu">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden px-4 pb-4 pt-2 space-y-1 bg-white shadow-lg">
            {navLinks.map((link) =>
              link.dropdown ? (
                <div key={link.href}>
                  <button onClick={() => setIsServicesOpen(!isServicesOpen)} className="w-full flex justify-between items-center py-2 font-medium text-slate-900">
                    {link.label}
                    <ChevronDown size={16} className={`transition-transform duration-200 ${isServicesOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isServicesOpen && (
                    <div className="pl-4 space-y-1 pt-1 pb-2 border-l-2 border-slate-200">
                      {link.dropdown.map((item) => (
                        <Link key={item.href} href={item.href} onClick={() => setIsOpen(false)} className={`block py-2 text-sm ${isActive(item.href) ? "text-orange-600 font-semibold" : "text-slate-700"}`}>
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)} className={`block py-2 font-medium ${isActive(link.href) ? "text-orange-500 font-semibold" : "text-slate-900"}`}>
                  {link.label}
                </Link>
              )
            )}
            <button onClick={() => { setIsModalOpen(true); setIsOpen(false); }} className="block w-full text-center px-4 py-2 mt-2 rounded-lg bg-orange-500 text-white font-semibold">
              Konsultasi Gratis
            </button>
          </div>
        )}
      </nav>
      <ConsultationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}

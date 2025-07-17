"use client";

import React, { useState, useEffect, useRef } from 'react';

// --- Helper Hook untuk deteksi saat elemen masuk ke viewport ---
const useInView = (options: IntersectionObserverInit = {}) => {
    const ref = useRef<HTMLDivElement>(null);
    const [isInView, setIsInView] = useState(false);
    useEffect(() => {
        const element = ref.current;
        if (!element) return;
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsInView(true);
                observer.unobserve(element);
            }
        }, options);
        observer.observe(element);
        return () => { if (element) observer.unobserve(element); };
    }, [options]);
    return [ref, isInView] as const;
};

// --- Komponen Ikon ---
const MailIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
const PhoneIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>;
const LocationIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;

// --- Komponen Utama ---
export default function KontakSection() {
  const [ref, isInView] = useInView({ threshold: 0.2});
  const [formStatus, setFormStatus] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const name = formData.get('name') as string;
      const email = formData.get('email') as string;
      const subject = formData.get('subject') as string;
      const message = formData.get('message') as string;

      const phoneNumber = '6281287718683'; // Ganti dengan nomor WhatsApp Anda
      const whatsappMessage = `Hallo admin kamikreatif.com, perkenalkan saya ${name}.\n\nSaya ingin bertanya mengenai *${subject}*.\n\nBerikut pesan saya:\n${message}\n\nAnda bisa menghubungi saya kembali melalui email di ${email}.`;
      
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;
      
      window.open(whatsappUrl, '_blank');

      setFormStatus('Terima kasih! Pesan Anda sedang dialihkan ke WhatsApp.');
      
      setTimeout(() => {
          (e.target as HTMLFormElement).reset();
          setFormStatus('');
      }, 5000);
  };

  return (
    <section ref={ref} className="bg-white py-20 md:py-28">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Kiri: Form Kontak */}
          <div className={`transition-all duration-700 ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Hubungi Kami</h2>
            <p className="text-lg text-slate-600 mb-8">
              Punya pertanyaan atau ingin memulai proyek? Isi formulir di bawah dan tim kami akan segera menghubungi Anda.
            </p>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">Nama Lengkap</label>
                <input type="text" id="name" name="name" required className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition" placeholder="John Doe" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">Alamat Email</label>
                <input type="email" id="email" name="email" required className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition" placeholder="anda@email.com" />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-slate-700 mb-1">Subjek</label>
                <select id="subject" name="subject" required className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition bg-white">
                    <option>Pertanyaan Umum</option>
                    <option>Penawaran Harga</option>
                    <option>Dukungan Teknis</option>
                    <option>Lainnya</option>
                </select>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1">Pesan Anda</label>
                <textarea id="message" name="message" rows={5} required className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition" placeholder="Tuliskan pesan atau pertanyaan Anda di sini..."></textarea>
              </div>
              <div>
                <button type="submit" className="w-full bg-orange-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-orange-600 transition-all duration-300 transform hover:scale-105 shadow-lg">
                  Kirim via WhatsApp
                </button>
              </div>
              {formStatus && (
                <p className="text-center text-green-600 bg-green-50 p-3 rounded-lg">{formStatus}</p>
              )}
            </form>
          </div>

          {/* Kanan: Info & Peta */}
          <div className={`space-y-10 transition-all duration-700 delay-200 ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="bg-slate-50 p-8 rounded-xl">
              <h3 className="text-2xl font-bold text-slate-800 mb-6">Informasi Kontak</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="bg-orange-100 text-orange-600 p-3 rounded-full mr-4"><MailIcon /></div>
                  <div>
                    <p className="font-semibold text-slate-700">Email</p>
                    <a href="mailto:kamikreatif.info@gmail.com" className="text-slate-600 hover:text-orange-600 transition-colors">kamikreatif.info@gmail.com</a>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-orange-100 text-orange-600 p-3 rounded-full mr-4"><PhoneIcon /></div>
                  <div>
                    <p className="font-semibold text-slate-700">WhatsApp</p>
                    <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-orange-600 transition-colors">+62 812-8771-8683</a>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-orange-100 text-orange-600 p-3 rounded-full mr-4"><LocationIcon /></div>
                  <div>
                    <p className="font-semibold text-slate-700">Alamat</p>
                    <p className="text-slate-600">Jakarta Selatan, DKI Jakarta</p>
                  </div>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">Lokasi Kami</h3>
              <div className="w-full h-80 rounded-xl overflow-hidden shadow-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.1852130142247!2d106.85365767499047!3d-6.2393031937489525!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3f6f5069503%3A0x5ddceeb9e9a735b3!2sKopikina!5e0!3m2!1sid!2sid!4v1752759907050!5m2!1sid!2sid"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  title="Peta Lokasi Kami Kreatif"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
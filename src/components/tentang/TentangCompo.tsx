"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { FaLightbulb, FaUsers, FaStopwatch, FaEye } from 'react-icons/fa';
import Masonry from 'react-masonry-css';

// --- Helper Hooks ---
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

const useCountUp = (end: number, duration: number, inView: boolean) => {
    const [count, setCount] = useState(0);
    useEffect(() => {
        if (inView) {
            let start = 0;
            const stepTime = end > 0 ? Math.abs(Math.floor(duration / end)) : duration;
            const timer = setInterval(() => {
                start += 1;
                setCount(start);
                if (start >= end) clearInterval(timer);
            }, stepTime);
            return () => clearInterval(timer);
        }
    }, [end, duration, inView]);
    return count;
};

// --- Komponen-komponen Kecil & Ikon ---
const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 text-center">{children}</h2>
);

const SectionSubtitle = ({ children }: { children: React.ReactNode }) => (
    <p className="max-w-3xl mx-auto text-lg text-slate-600 mb-16 text-center">{children}</p>
);

const ValueIcon = ({ children }: { children: React.ReactNode }) => (
    <div className="bg-orange-100 text-orange-600 rounded-full h-16 w-16 flex items-center justify-center mb-4 mx-auto transition-all duration-300 group-hover:bg-orange-500 group-hover:text-white group-hover:scale-110">
        {children}
    </div>
);

// --- Komponen Modal ---
const ConsultationModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [formData, setFormData] = useState({ name: '', company: '', service: 'Diskusi Umum' });
  if (!isOpen) return null;
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const phoneNumber = '6281287718683';
    const message = `Hallo admin kamikreatif.com, perkenalkan saya ${formData.name} dari perusahaan ${formData.company} ingin berkonsultasi untuk ${formData.service}.`;
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
          <button type="submit" className="w-full bg-orange-500 text-white font-bold py-3 rounded-md mt-6 hover:bg-orange-600 transform hover:scale-105">Kirim via WhatsApp</button>
        </form>
      </div>
    </div>
  );
};

// --- Data Mockup ---
const teamMembers = [
    { name: "Fadel P Wiratama", role: "Founder & CEO", imageUrl: "/fadel.jpg", linkedin: "https://www.linkedin.com/in/fadel-wiratama/?originalSubdomain=my", bio: "Fadel adalah seorang visioner dengan lebih dari 5 tahun pengalaman dalam strategi digital dan pengembangan bisnis." },
    { name: "Tectona G Abimanyu", role: "Project Manager", imageUrl: "/tectona.jpg", linkedin: "#", bio: "Tectona adalah arsitek di balik solusi teknologi kami, memastikan setiap baris kode andal dan efisien." },
];
const stats = [
    { value: 5, label: "Tahun Pengalaman", suffix: "+" },
    { value: 50, label: "Klien Puas", suffix: "+" },
    { value: 100, label: "Proyek Selesai", suffix: "+" },
    { value: 4.9, label: "Rating Klien", suffix: "/5" },
];
const galleryImages = [
    { src: "/budaya-1.jpg", alt: "Sesi brainstorming tim" },
    { src: "/budaya-2.jpg", alt: "Suasana kerja di kantor" },
    { src: "/budaya-3.jpg", alt: "Workshop internal tim" },
];
const timelineData = [
    { year: "2019", title: "Kelahiran Ide", description: "Kami Kreatif didirikan dengan misi membantu UKM go digital secara efektif.", icon: <FaLightbulb /> },
    { year: "2021", title: "Tim Bertumbuh", description: "Tim inti terbentuk, menggabungkan keahlian desain, development, dan marketing.", icon: <FaUsers /> },
    { year: "2023", title: "Ekspansi Layanan", description: "Meluncurkan paket layanan terintegrasi untuk solusi digital yang lebih komprehensif.", icon: <FaStopwatch /> },
    { year: "Kini", title: "Partner Terpercaya", description: "Menjadi mitra digital bagi puluhan bisnis yang tersebar di seluruh Indonesia.", icon: <FaEye /> },
];

// --- Komponen Stat Counter ---
const StatCounter = ({ end, duration, inView, suffix = '' }: { end: number, duration: number, inView: boolean, suffix?: string }) => {
    const count = useCountUp(end, duration, inView);
    return <p className="text-5xl font-extrabold text-orange-400">{Number.isInteger(end) ? count : count.toFixed(1)}{suffix}</p>;
};

// --- Komponen Utama ---
export default function TentangPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [ref1,] = useInView({ threshold: 0.2 });
    const [ref2, inView2] = useInView({ threshold: 0.2 });
    const [ref3, inView3] = useInView({ threshold: 0.2 });
    const [ref4, inView4] = useInView({ threshold: 0.2 });
    const [ref5,] = useInView({ threshold: 0.2 });

    return (
        <>
            <style jsx global>{`
                @keyframes shine {
                    0% { transform: translateX(-100%) skewX(-20deg); }
                    100% { transform: translateX(200%) skewX(-20deg); }
                }
                .shine-effect::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 50%;
                    height: 100%;
                    background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0) 100%);
                    z-index: 10;
                    animation: shine 3s infinite;
                    opacity: 0;
                }
                .group:hover .shine-effect::before {
                    opacity: 1;
                }
            `}</style>
            <div className="bg-white">
                {/* 1. Hero Section */}
                <section className="relative bg-slate-50 pt-24 pb-16 md:pt-32 md:pb-24 text-center overflow-hidden">
                    <div className="container mx-auto px-6">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 mb-4">Kami Kreatif</h1>
                        <p className="text-xl md:text-2xl text-orange-600 font-semibold mb-8">Digital Agency yang Tumbuh Bersama Kliennya</p>
                        <div className="max-w-4xl mx-auto mt-12 rounded-xl shadow-2xl transition-transform duration-500 hover:scale-105">
                            <Image src="/tim-kreatif.jpg" alt="Tim Kami Kreatif" width={1200} height={600} className="rounded-xl" />
                        </div>
                    </div>
                </section>

                {/* 2. Cerita Kami (Timeline) */}
                <section ref={ref1} className="py-20 md:py-28">
                    <div className="container mx-auto px-6">
                        <SectionTitle>Perjalanan Kami</SectionTitle>
                        <SectionSubtitle>Dari ide sederhana menjadi partner digital terpercaya.</SectionSubtitle>
                        <VerticalTimeline>
                            {timelineData.map((item, index) => (
                                <VerticalTimelineElement
                                    key={index}
                                    date={item.year}
                                    iconStyle={{ background: 'rgb(234, 88, 12)', color: '#fff' }}
                                    icon={item.icon}
                                >
                                    <h3 className="vertical-timeline-element-title">{item.title}</h3>
                                    <p>{item.description}</p>
                                </VerticalTimelineElement>
                            ))}
                        </VerticalTimeline>
                    </div>
                </section>

                {/* 3. Visi & Misi */}
                <section className="relative bg-slate-800 text-white py-20 md:py-24 overflow-hidden">
                    <div className="absolute inset-0 bg-[url('/pattern.svg')] bg-repeat opacity-[0.03]"></div>
                    <div className="relative container mx-auto px-6 grid md:grid-cols-2 gap-12">
                        <div>
                            <h3 className="text-2xl font-bold mb-3 text-orange-400">Visi Kami</h3>
                            <p className="text-lg text-slate-300">Menjadi mitra digital utama bagi bisnis di Indonesia yang ingin berkembang pesat melalui teknologi dan strategi kreatif yang terukur.</p>
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold mb-3 text-orange-400">Misi Kami</h3>
                            <p className="text-lg text-slate-300">Memberikan solusi digital cerdas yang terarah dan efisien, menggabungkan desain yang memikat, teknologi yang andal, dan strategi yang tepat sasaran.</p>
                        </div>
                    </div>
                </section>

                {/* 4. Nilai-Nilai Inti */}
                <section ref={ref2} className="py-20 md:py-28">
                    <div className="container mx-auto px-6">
                        <SectionTitle>Nilai-Nilai Inti Kami</SectionTitle>
                        <div className={`grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16 transition-all duration-700 ${inView2 ? 'opacity-100' : 'opacity-0'}`}>
                            <div className="text-center group"><ValueIcon><FaLightbulb /></ValueIcon><h4 className="text-xl font-bold mb-2">Inovatif</h4><p className="text-slate-600">Selalu mencari cara baru dan lebih baik untuk memberikan hasil.</p></div>
                            <div className="text-center group"><ValueIcon><FaUsers /></ValueIcon><h4 className="text-xl font-bold mb-2">Kolaboratif</h4><p className="text-slate-600">Kami adalah bagian dari tim Anda, bekerja bersama untuk tujuan yang sama.</p></div>
                            <div className="text-center group"><ValueIcon><FaStopwatch /></ValueIcon><h4 className="text-xl font-bold mb-2">Efisien</h4><p className="text-slate-600">Memberikan solusi tepat guna tanpa membuang waktu dan biaya.</p></div>
                            <div className="text-center group"><ValueIcon><FaEye /></ValueIcon><h4 className="text-xl font-bold mb-2">Transparan</h4><p className="text-slate-600">Komunikasi yang jujur dan terbuka di setiap tahap proyek.</p></div>
                        </div>
                    </div>
                </section>

                {/* 5. Tim Kami */}
                <section ref={ref3} className="bg-slate-50 py-20 md:py-28">
                    <div className="container mx-auto px-6">
                        <SectionTitle>Perkenalkan Tim Kami</SectionTitle>
                        <SectionSubtitle>Wajah-wajah di balik setiap ide kreatif dan baris kode yang kami tulis.</SectionSubtitle>
                        <div className={`grid md:grid-cols-2 gap-4 transition-all duration-700 ${inView3 ? 'opacity-100' : 'opacity-0'}`}>
                            {teamMembers.map(member => (
                                <div key={member.name} className="text-center group relative">
                                    <div className="relative w-48 h-48 mx-auto rounded-full overflow-hidden shadow-lg mb-4 shine-effect">
                                        <Image src={member.imageUrl} alt={member.name} layout="fill" objectFit="cover" className="transition-transform duration-500 group-hover:scale-110" />
                                        <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-500 flex items-center justify-center p-4">
                                            <p className="text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500">{member.bio}</p>
                                        </div>
                                    </div>
                                    <h4 className="text-xl font-bold">{member.name}</h4>
                                    <p className="text-orange-600">{member.role}</p>
                                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-orange-600 transition-colors">LinkedIn</a>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 6. Statistik */}
                <section ref={ref4} className="py-20 md:py-24 bg-slate-800">
                    <div className={`container mx-auto px-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center text-white transition-all duration-700 ${inView4 ? 'opacity-100' : 'opacity-0'}`}>
                        {stats.map(stat => (
                            <div key={stat.label}>
                                <StatCounter end={stat.value} duration={2000} inView={inView4} suffix={stat.suffix} />
                                <p className="text-lg text-slate-300 mt-2">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 7. Galeri Budaya Kerja */}
                <section ref={ref5} className="py-20 md:py-28">
                    <div className="container mx-auto px-6">
                        <SectionTitle>Budaya Kerja Kami</SectionTitle>
                        <SectionSubtitle>Momen kolaborasi, kreativitas, dan kerja keras yang kami nikmati setiap hari.</SectionSubtitle>
                        <Masonry
                            breakpointCols={{ default: 3, 1100: 2, 700: 1 }}
                            className="flex w-auto -ml-4"
                            columnClassName="pl-4 bg-clip-padding"
                        >
                            {galleryImages.map((img, i) => (
                                <div key={i} className="mb-4">
                                    <Image src={img.src} alt={img.alt} width={600} height={img.src.includes('x800') ? 800 : 400} className="rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300" />
                                </div>
                            ))}
                        </Masonry>
                    </div>
                </section>

                {/* 8. CTA */}
                <section className="bg-orange-500">
                    <div className="container mx-auto px-6 py-16 text-center text-white">
                        <h2 className="text-3xl font-bold mb-4">Kami siap menjadi partner digital bisnis Anda.</h2>
                        <p className="mb-8 text-lg">Konsultasikan kebutuhan Anda hari ini, gratis tanpa komitmen.</p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <button onClick={() => setIsModalOpen(true)} className="bg-white text-orange-600 font-bold py-3 px-8 rounded-full hover:bg-orange-100 transition-colors">Konsultasi Gratis</button>
                            <Link href="/layanan" className="border-2 border-white text-white font-bold py-3 px-8 rounded-full hover:bg-white/20 transition-colors">Lihat Layanan Kami</Link>
                        </div>
                    </div>
                </section>
            </div>
            <ConsultationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    );
}

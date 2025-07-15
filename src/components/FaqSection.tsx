"use client";

import React, { useState, useEffect, useRef } from 'react';

// --- Helper Hook untuk deteksi saat elemen masuk ke viewport ---
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

// --- Komponen Ikon untuk Accordion ---
const ChevronIcon = ({ isOpen }: { isOpen: boolean }) => (
    <svg className={`w-6 h-6 text-orange-500 flex-shrink-0 ml-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
);

// --- Data FAQ ---
const faqs = [
    {
        question: "Berapa lama proses pengerjaan sebuah proyek?",
        answer: "Durasi proyek sangat bervariasi. Untuk Paket Basic, estimasi sekitar 2-3 minggu. Paket Pro biasanya memakan waktu 4-6 minggu karena melibatkan desain kustom dan fitur yang lebih kompleks. Untuk Paket Custom, timeline akan ditentukan bersama setelah diskusi kebutuhan awal."
    },
    {
        question: "Apa saja yang perlu saya siapkan sebelum memulai proyek?",
        answer: "Untuk mempercepat proses, ada baiknya Anda menyiapkan materi konten seperti teks profil perusahaan, deskripsi layanan/produk, dan gambar atau logo jika sudah ada. Namun, jangan khawatir, tim kami siap membantu dan memberikan arahan jika Anda belum memilikinya."
    },
    {
        question: "Bagaimana sistem pembayarannya?",
        answer: "Kami menerapkan sistem pembayaran yang fleksibel. Umumnya, kami meminta Down Payment (DP) sebesar 50% di awal proyek. Sisa 50% dilunasi setelah proyek selesai dan disetujui oleh Anda, sebelum website di-publish secara resmi."
    },
    {
        question: "Apakah saya bisa meng-upgrade paket di kemudian hari?",
        answer: "Tentu saja! Kami memahami bahwa kebutuhan bisnis bisa berkembang. Anda bisa meng-upgrade paket kapan saja. Kami akan menghitung selisih biaya berdasarkan fitur tambahan yang Anda butuhkan."
    },
    {
        question: "Apa yang termasuk dalam layanan maintenance bulanan?",
        answer: "Layanan maintenance mencakup pembaruan keamanan, backup data rutin, monitoring performa website, dan support teknis untuk kendala minor. Ini memastikan website Anda tetap aman, cepat, dan berjalan optimal setiap saat."
    }
];

// --- Komponen FAQ Item (Accordion) ---
const FaqItem = ({ faq, isOpen, onClick }: { faq: { question: string; answer: string }, isOpen: boolean, onClick: () => void }) => {
    const contentRef = useRef<HTMLDivElement>(null);

    return (
        <div className={`border border-slate-200 rounded-lg mb-4 transition-all duration-300 ${isOpen ? 'bg-white shadow-lg' : 'bg-slate-50 hover:bg-white'}`}>
            <button
                className="flex justify-between items-center w-full text-left p-6"
                onClick={onClick}
                aria-expanded={isOpen}
            >
                <span className="text-lg font-semibold text-slate-800">{faq.question}</span>
                <ChevronIcon isOpen={isOpen} />
            </button>
            <div
                ref={contentRef}
                className="overflow-hidden transition-[max-height] duration-500 ease-in-out"
                style={{ maxHeight: isOpen ? `${contentRef.current?.scrollHeight}px` : '0px' }}
            >
                <p className="text-slate-600 px-6 pb-6">
                    {faq.answer}
                </p>
            </div>
        </div>
    );
};

// --- Komponen Utama ---
export default function FaqSection() {
    const [ref, isInView] = useInView({ threshold: 0.1, triggerOnce: true });
    const [openIndex, setOpenIndex] = useState<number | null>(0); // Buka item pertama secara default

    const handleToggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section id="faq" className="bg-white py-20 md:py-28">
            <div ref={ref as React.RefObject<HTMLDivElement>} className="container mx-auto px-6">
                <div className="grid lg:grid-cols-3 gap-12">
                    {/* Kolom Kiri: Judul dan Deskripsi */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-28">
                            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 transition-all duration-700" style={{ opacity: isInView ? 1 : 0, transform: isInView ? 'translateX(0)' : 'translateX(-20px)' }}>
                                Pertanyaan yang Sering Diajukan
                            </h2>
                            <p className="text-lg text-slate-600 transition-all duration-700 delay-100" style={{ opacity: isInView ? 1 : 0, transform: isInView ? 'translateX(0)' : 'translateX(-20px)' }}>
                                Tidak menemukan jawaban Anda? Jangan ragu untuk menghubungi kami secara langsung.
                            </p>
                        </div>
                    </div>

                    {/* Kolom Kanan: Daftar FAQ */}
                    <div className="lg:col-span-2">
                        {faqs.map((faq, index) => (
                            <div
                                key={index}
                                className={`transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
                                style={{ transitionDelay: `${100 + index * 100}ms` }}
                            >
                                <FaqItem
                                    faq={faq}
                                    isOpen={openIndex === index}
                                    onClick={() => handleToggle(index)}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
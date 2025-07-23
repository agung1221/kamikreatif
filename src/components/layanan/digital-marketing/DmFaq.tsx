"use client";

import React, { useState, useEffect, useRef } from 'react';

// --- Tipe kustom untuk opsi hook ---
interface UseInViewOptions extends IntersectionObserverInit {
  triggerOnce?: boolean;
}

// --- Helper Hook untuk deteksi saat elemen masuk ke viewport ---
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
        return () => { if (element) observer.unobserve(element); };
    }, [triggerOnce, observerOptions]);
    return [ref, isInView] as const;
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
        question: "Berapa budget minimal untuk mulai beriklan?",
        answer: "Tidak ada angka pasti, karena budget ideal sangat tergantung pada industri, target audiens, dan tujuan Anda. Namun, kami bisa memulai dengan budget yang fleksibel dan terukur, bahkan dari angka Rp 1.000.000/bulan, lalu kita optimasi bersama untuk hasil terbaik."
    },
    {
        question: "Kapan saya bisa melihat hasil dari kampanye digital marketing?",
        answer: "Untuk iklan berbayar (Ads), Anda bisa melihat peningkatan traffic dalam beberapa hari pertama. Untuk SEO, biasanya membutuhkan waktu 3-6 bulan untuk melihat hasil yang signifikan karena prosesnya organik dan bertahap. Kami akan memberikan proyeksi yang realistis di awal kerjasama."
    },
    {
        question: "Platform apa saja yang akan digunakan?",
        answer: "Kami akan merekomendasikan platform yang paling relevan untuk bisnis Anda, bisa mencakup Google Ads, Meta Ads (Facebook & Instagram), TikTok Ads, dan optimasi SEO di mesin pencari Google. Semua strategi disesuaikan dengan di mana target pasar Anda berada."
    },
    {
        question: "Apakah saya akan mendapatkan laporan rutin?",
        answer: "Tentu saja. Transparansi adalah kunci. Anda akan menerima laporan performa mingguan atau bulanan yang mudah dipahami, berisi data penting seperti jangkauan, klik, konversi, dan ROI dari setiap kampanye yang berjalan."
    },
    {
        question: "Apa bedanya layanan ini dengan hanya posting di sosial media sendiri?",
        answer: "Layanan kami lebih dari sekadar posting. Kami melakukan riset audiens, perencanaan konten strategis, optimasi iklan berbayar, analisis data, dan A/B testing untuk memastikan setiap rupiah yang Anda keluarkan memberikan hasil yang terukur dan berdampak pada pertumbuhan bisnis."
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
export default function DmFaq() {
    const [ref, isInView] = useInView({ threshold: 0.1, triggerOnce: true });
    const [openIndex, setOpenIndex] = useState<number | null>(0); // Buka item pertama secara default

    const handleToggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section id="faq" ref={ref} className="bg-white py-20 md:py-28">
            <div className="container mx-auto px-6">
                <div className={`text-center mb-16 transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
                        Pertanyaan yang Sering Diajukan
                    </h2>
                    <p className="max-w-2xl mx-auto text-lg text-slate-600">
                        Masih ada yang ingin ditanyakan? Temukan jawabannya di sini atau hubungi tim kami.
                    </p>
                </div>

                <div className="max-w-3xl mx-auto">
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
        </section>
    );
}
"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

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

// --- Komponen Ikon ---
const QuoteIcon = () => (
    <svg className="absolute top-6 right-6 w-16 h-16 text-slate-100/80 -z-10" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
        <path d="M9.33 5.5c-4.58 0-8.33 3.75-8.33 8.33s3.75 8.33 8.33 8.33 8.33-3.75 8.33-8.33c0-1.2-.25-2.33-.75-3.42-1.42 1.5-3.33 2.5-5.5 2.5-1.17 0-2.25-.33-3.25-1-1.08-1.92 1-4.75 4.25-4.75.25 0 .5 0 .67.08C12.17 6.42 10.83 5.5 9.33 5.5zm13.34 0c-4.58 0-8.33 3.75-8.33 8.33s3.75 8.33 8.33 8.33 8.33-3.75 8.33-8.33c0-1.2-.25-2.33-.75-3.42-1.42 1.5-3.33 2.5-5.5 2.5-1.17 0-2.25-.33-3.25-1-1.08-1.92 1-4.75 4.25-4.75.25 0 .5 0 .67.08-1.08-1-2.42-1.83-3.92-1.83z" />
    </svg>
);

const StarIcon = ({ isFilled }: { isFilled: boolean }) => (
    <svg className={`w-5 h-5 ${isFilled ? 'text-yellow-400' : 'text-slate-300'}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
);

// --- Data Testimoni ---
const testimonials = [
  {
    quote: "Prosesnya cepat dan hasilnya sangat profesional. Website personal yang dibuatkan Kami Kreatif benar-benar membantu saya membangun citra sebagai praktisi Human Capital. Sangat direkomendasikan!",
    name: "Agung Saputra",
    title: "Praktisi Human Capital",
    imageUrl: "/agung.jpg",
    rating: 5,
  },
  {
    quote: "Kami Kreatif tidak hanya membuatkan landing page yang konversinya tinggi, tapi juga strategi social media yang 'hidup'. Tim kami merasa sangat terbantu dengan pendekatan mereka yang berbasis data.",
    name: "Aisyah",
    title: "Marketing Manager, Supergrowtaz",
    imageUrl: "/aisyah.jpg",
    rating: 5,
  },
  {
    quote: "Sistem buyer portal yang dikembangkan benar-benar mengubah alur kerja kami. Tim Kami Kreatif mampu menerjemahkan kebutuhan operasional kami yang kompleks menjadi sebuah tools yang efisien dan mudah digunakan.",
    name: "Femi",
    title: "Operation Manager, PT. Tropis Jaya Abadi",
    imageUrl: "/femi.jpg",
    rating: 5,
  },
];

// --- Komponen Utama ---
export default function TestimonialSection() {
  const [ref, isInView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section className="relative bg-slate-50 py-20 md:py-28 overflow-hidden">
        {/* Latar belakang berpola */}
        <div className="absolute inset-0 bg-[url('/pattern.svg')] bg-repeat opacity-5"></div>
        <div className="relative container mx-auto px-6">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
                Apa Kata Klien Kami?
                </h2>
                <p className="max-w-2xl mx-auto text-lg text-slate-600">
                Kami bangga bisa menjadi bagian dari kesuksesan mereka. Inilah cerita dari beberapa klien yang telah mempercayai kami.
                </p>
            </div>

            {/* Grid Testimoni */}
            <div ref={ref as React.RefObject<HTMLDivElement>} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
                <div
                    key={index}
                    className={`relative bg-white rounded-xl p-8 shadow-lg transition-all duration-500 transform hover:-translate-y-2 z-10 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                    style={{ transitionDelay: `${index * 150}ms` }}
                >
                    <QuoteIcon />
                    <div className="flex items-center mb-4">
                        {[...Array(5)].map((_, i) => (
                            <StarIcon key={i} isFilled={i < testimonial.rating} />
                        ))}
                    </div>
                    <p className="text-slate-700 italic mb-6">&quot;{testimonial.quote}&quot;</p>
                    <div className="flex items-center mt-auto">
                        <Image
                            src={testimonial.imageUrl}
                            alt={`Foto ${testimonial.name}`}
                            width={48}
                            height={48}
                            className="rounded-full mr-4"
                        />
                        <div>
                            <p className="font-bold text-slate-800">{testimonial.name}</p>
                            <p className="text-sm text-slate-500">{testimonial.title}</p>
                        </div>
                    </div>
                </div>
            ))}
            </div>
        </div>
    </section>
  );
}
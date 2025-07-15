"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

// --- Komponen Ikon ---
const WrenchIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

const ArrowLeftIcon = () => (
    <svg className="w-5 h-5 mr-2 transition-transform duration-300 group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
);

// --- Komponen Penghitung Waktu Mundur ---
const CountdownTimer = () => {
    const calculateTimeLeft = () => {
        const difference = +new Date("2025-09-01T00:00:00") - +new Date();
        let timeLeft: { [key: string]: number } = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60)
            };
        }
        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
        return () => clearTimeout(timer);
    });

    const timerComponents: React.ReactNode[] = [];

    Object.keys(timeLeft).forEach((interval) => {
        // Baris @ts-expect-error dan kondisi if dihapus karena tidak diperlukan dan berlebihan.
        timerComponents.push(
            <div key={interval} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-slate-800 bg-slate-200/70 p-4 rounded-lg">
                    {/* Baris @ts-expect-error dihapus karena tidak ada error di sini. */}
                    {String(timeLeft[interval as keyof typeof timeLeft]).padStart(2, '0')}
                </div>
                <div className="text-xs uppercase tracking-wider mt-2 text-slate-500">{interval}</div>
            </div>
        );
    });

    return (
        <div className="grid grid-cols-4 gap-4 max-w-sm mx-auto my-10">
            {timerComponents.length ? timerComponents : <span>Waktu Habis!</span>}
        </div>
    );
};


// --- Komponen Utama ---
export default function DevelopmentSection() {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleNotifySubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            setSubmitted(true);
        }
    };

    return (
        <section className="relative bg-slate-50 flex items-center justify-center min-h-[calc(100vh-10rem)] py-16 overflow-hidden">
            <div className="absolute inset-0 bg-[url('/pattern.svg')] bg-repeat opacity-5"></div>
            <div className="relative container mx-auto px-6 text-center">
                <div className="bg-white p-8 md:p-12 rounded-xl shadow-2xl max-w-3xl mx-auto">
                    <div className="flex justify-center mb-6">
                        <WrenchIcon />
                    </div>
                    <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
                        Sesuatu yang Hebat Akan Datang
                    </h1>
                    <p className="text-lg text-slate-600 mb-6">
                        Tim kami sedang bekerja keras untuk menyelesaikan halaman ini. Kami akan segera kembali dengan konten yang lebih menarik dan informatif untuk Anda!
                    </p>
                    
                    <CountdownTimer />

                    <div className="mt-12">
                        <p className="font-semibold text-slate-700 mb-4">Dapatkan notifikasi saat halaman ini rilis:</p>
                        {!submitted ? (
                            <form onSubmit={handleNotifySubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Masukkan email Anda"
                                    required
                                    className="flex-grow px-4 py-3 border border-slate-300 rounded-md focus:ring-orange-500 focus:border-orange-500 transition w-full"
                                />
                                <button type="submit" className="bg-slate-800 text-white font-bold py-3 px-6 rounded-md hover:bg-slate-900 transition-all duration-300">
                                    Beritahu Saya
                                </button>
                            </form>
                        ) : (
                            <p className="text-lg font-semibold text-green-600 bg-green-100 p-4 rounded-md">
                                Terima kasih! Anda akan menjadi yang pertama tahu.
                            </p>
                        )}
                    </div>

                    <div className="mt-16 border-t pt-8">
                        <Link href="/" className="group inline-flex items-center justify-center text-orange-600 font-semibold hover:text-orange-700 transition-all duration-300">
                            <ArrowLeftIcon />
                            Kembali ke Beranda
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
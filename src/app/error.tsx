// src/app/error.tsx

'use client';

import { useEffect } from 'react';
import Image from 'next/image';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error("Error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-red-50 text-red-700 p-6 text-center">
      {/* Logo */}
      <Image
        src="/logo-kami-kreatif.png"
        alt="Kami Kreatif Logo"
        width={70}
        height={70}
        className="mb-4"
        priority
      />

      <h2 className="text-2xl font-bold mb-2">Oops! Terjadi kesalahan.</h2>
      <p className="mb-5">Kami tidak dapat memuat halaman. Silakan coba lagi.</p>

      <button
        onClick={reset}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
      >
        Coba Lagi
      </button>
    </div>
  );
}

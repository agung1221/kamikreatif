// src/app/not-found.tsx

import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 py-12 text-gray-800 text-center">
      {/* Logo Brand */}
      <Image
        src="/logo-kami-kreatif.png"
        alt="Kami Kreatif Logo"
        width={80}
        height={80}
        priority
        className="mb-6"
      />

      {/* Heading */}
      <h1 className="text-5xl md:text-6xl font-extrabold text-orange-500 mb-4">
        404
      </h1>

      {/* Subheading */}
      <h2 className="text-xl md:text-2xl font-semibold mb-2">
        Ups! Kami tidak menemukan halaman yang kamu cari
      </h2>

      {/* Message */}
      <p className="max-w-md text-base md:text-lg text-gray-600 mb-6">
        Bisa jadi link-nya sudah pindah rumah, atau mungkin belum tersedia.
      </p>

      {/* CTA Button */}
      <Link
        href="/"
        className="inline-block px-6 py-3 bg-orange-500 text-white rounded-lg text-sm font-bold hover:bg-green-500 transition"
      >
        Yuk kembali ke beranda dan mulai perjalanan digitalmu bersama kami.
      </Link>
    </div>
  );
}

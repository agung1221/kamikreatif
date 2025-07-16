// src/app/loading.tsx

import Image from "next/image";

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-orange-700">
      {/* Logo Brand */}
      <Image
        src="/logo-kami-kreatif.png"
        alt="Kami Kreatif Logo"
        width={80}
        height={80}
        className="mb-6 animate-pulse"
        priority
      />

      {/* Spinner SVG */}
      <svg
        className="animate-spin h-10 w-10 text-orange-700"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        />
      </svg>

      {/* Text */}
      <span className="mt-4 text-base font-medium">Memuat halaman...</span>
    </div>
  );
}

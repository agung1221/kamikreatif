"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "Beranda" },
    { href: "/tentang", label: "Tentang" },
    { href: "/layanan", label: "Layanan" },
    { href: "/portofolio", label: "Portofolio" },
    { href: "/kontak", label: "Kontak" },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <nav className="bg-white fixed top-0 left-0 w-full z-50 shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-orange-500">
          Kami<span className="text-slate-900">Kreatif</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`transition-colors duration-200 font-medium ${
                isActive(link.href)
                  ? "text-orange-500 font-semibold border-b-2 border-orange-500"
                  : "text-slate-900 hover:text-orange-500"
              }`}
            >
              {link.label}
            </Link>
          ))}

          {/* CTA Button */}
          <Link
            href="https://wa.me/62xxxxxxxxxxx"
            className="ml-4 px-4 py-2 rounded-lg bg-orange-500 text-white hover:bg-orange-600 transition-colors duration-200 text-sm font-semibold"
          >
            Konsultasi Gratis
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-slate-900 hover:text-orange-500 transition-colors duration-200"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 pt-2 space-y-3 bg-white shadow">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`block transition-colors duration-200 font-medium ${
                isActive(link.href)
                  ? "text-orange-500 font-semibold"
                  : "text-slate-900 hover:text-orange-500"
              }`}
            >
              {link.label}
            </Link>
          ))}

          {/* CTA Button (Mobile) */}
          <Link
            href="https://wa.me/62xxxxxxxxxxx"
            className="block w-full text-center px-4 py-2 mt-2 rounded-lg bg-orange-500 text-white hover:bg-orange-600 transition-colors duration-200 font-semibold"
          >
            Konsultasi Gratis
          </Link>
        </div>
      )}
    </nav>
  );
}
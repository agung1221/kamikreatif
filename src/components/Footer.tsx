import React from 'react';
import Link from 'next/link';

// --- Komponen Ikon ---
const Logo = () => (
    <span className="text-2xl font-bold text-white">
        Kami<span className="text-orange-500">Kreatif</span>
    </span>
);

const SocialIcon = ({ href, children }: { href: string, children: React.ReactNode }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-orange-500 transition-colors duration-300">
        {children}
    </a>
);

// --- Data untuk Footer ---
const footerLinks = {
    layanan: [
        { name: "Pembuatan Website", href: "/layanan/pembuatan-website" },
        { name: "Digital Marketing", href: "/layanan/digital-marketing" },
        { name: "Social Media Management", href: "/layanan/social-media" },
        { name: "Tools & Automasi", href: "/layanan/tools-automasi" },
    ],
    perusahaan: [
        { name: "Tentang Kami", href: "/tentang" },
        { name: "Portofolio", href: "/portofolio" },
        { name: "Kontak", href: "/kontak" },
    ],
    sosial: [
        { name: "Instagram", href: "https://instagram.com/kamikreatifcom", icon: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.012 3.584-.07 4.85c-.148 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.07-1.645-.07-4.85s.012-3.584.07-4.85c.148-3.225 1.664-4.771 4.919-4.919C8.416 2.175 8.796 2.163 12 2.163zm0 1.441c-3.116 0-3.479.011-4.69.068-2.877.13-4.042 1.28-4.172 4.172-.057 1.218-.067 1.575-.067 4.69s.01 3.472.067 4.69c.13 2.892 1.295 4.042 4.172 4.172 1.21.057 1.574.067 4.69.067s3.48-.01 4.69-.067c2.877-.13 4.042-1.28 4.172-4.172.057-1.218.067-1.575.067-4.69s-.01-3.472-.067-4.69c-.13-2.892-1.295-4.042-4.172-4.172-1.21-.057-1.574-.067-4.69-.067zM12 8.25a3.75 3.75 0 100 7.5 3.75 3.75 0 000-7.5zM12 14a2 2 0 110-4 2 2 0 010 4zm6.406-7.875a.938.938 0 00-.938-.938.938.938 0 000 1.875.938.938 0 00.938-.937z" /></svg> },
    ],
};

// --- Komponen Utama Footer ---
export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          
          {/* Kolom 1: Brand & Sosial Media */}
          <div className="col-span-2 lg:col-span-2">
            <Link href="/" className="mb-4 inline-block">
                <Logo />
            </Link>
            <p className="max-w-xs text-slate-400 mb-6">
              Agensi digital yang berfokus membantu bisnis bertumbuh melalui solusi cerdas dan kreatif.
            </p>
            <div className="flex space-x-5">
                {footerLinks.sosial.map((link) => (
                    <SocialIcon key={link.name} href={link.href}>
                        {link.icon}
                    </SocialIcon>
                ))}
            </div>
          </div>

          {/* Kolom 2: Layanan */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Layanan</h3>
            <ul className="space-y-3">
              {footerLinks.layanan.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="hover:text-orange-500 transition-colors duration-300">
                      {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kolom 3: Perusahaan */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Perusahaan</h3>
            <ul className="space-y-3">
              {footerLinks.perusahaan.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="hover:text-orange-500 transition-colors duration-300">
                      {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kolom 4: Kontak */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Kontak</h3>
            <ul className="space-y-3">
              <li><a href="mailto:halo@kamikreatif.com" className="hover:text-orange-500 transition-colors duration-300">kamikreatif.info@gmail.com</a></li>
              <li><a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer" className="hover:text-orange-500 transition-colors duration-300">(+62) 812-8771-8683</a></li>
              <li className="text-slate-400">Jakarta Selatan, Indonesia</li>
            </ul>
          </div>

        </div>
      </div>
      
      {/* Bagian Copyright */}
      <div className="bg-slate-950 py-4">
        <div className="container mx-auto px-6 text-center text-xs text-slate-500">
          &copy; {new Date().getFullYear()} Kami Kreatif. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}

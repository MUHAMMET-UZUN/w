"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";

import BizKimizMenu from "./mega-menus/BizKimizMenu";
import NeYapiyoruzMenu from "./mega-menus/NeYapiyoruzMenu";
import NeYapabilirsinizMenu from "./mega-menus/NeYapabilirsinizMenu";

export default function MainHeader() {
  // ✅ Hook'lar component içinde olmalı
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    handleScroll(); // sayfa yenilenince doğru state gelsin

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
      <div
        className={`
          max-w-[1440px] mx-auto px-4
          transition-all duration-300
          ${scrolled ? "h-20" : "h-28"}
        `}
      >
        <div className="grid grid-cols-3 items-center h-full">
          {/* SOL MENÜ */}
          <nav className="flex items-center gap-8 text-[15px] font-medium text-gray-800">
            <div className="relative group">
              <span className="cursor-pointer hover:text-green-700 transition">
                Biz kimiz
              </span>
              <div className="absolute left-0 top-full mt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <BizKimizMenu />
              </div>
            </div>

            <div className="relative group">
              <span className="cursor-pointer hover:text-green-700 transition">
                Ne yapıyoruz
              </span>
              <div className="absolute left-0 top-full mt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <NeYapiyoruzMenu />
              </div>
            </div>

            <div className="relative group">
              <span className="cursor-pointer hover:text-green-700 transition">
                Ne yapabilirsiniz
              </span>
              <div className="absolute left-0 top-full mt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <NeYapabilirsinizMenu />
              </div>
            </div>

            <Link
              href="/search"
              className="text-gray-700 hover:text-green-700 transition"
              aria-label="Ara"
              title="Ara"
            >
              <i className="fa-solid fa-magnifying-glass text-[15px]" />
            </Link>
          </nav>

          {/* ORTA LOGO */}
          <div className="flex justify-center items-center">
            <Link href="/" aria-label="Ana sayfa">
              <img
                src="/ihh-logo.jpg"
                alt="İHH Logo"
                className={`
                  w-auto object-contain cursor-pointer
                  transition-all duration-300
                  ${scrolled ? "h-16" : "h-20"}
                `}
              />
            </Link>
          </div>

          {/* SAĞ */}
          <div className="flex items-center justify-end gap-5">
            <button className="text-gray-700 hover:text-green-700 font-medium transition">
              Oturum aç
            </button>

            <button className="bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-lg font-semibold flex items-center gap-2 transition">
              <i className="fa-solid fa-lock text-[14px]" />
              Bağış Yap
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

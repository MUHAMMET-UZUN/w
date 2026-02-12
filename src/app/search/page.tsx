"use client";

import { useState, useEffect, useRef } from "react";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  const suggestions = [
    "Sadaka Bağışı",
    "Banka Hesap Numaraları",
    "Yetim Sponsorluğu",
    "Acil Yardım Bağışı",
    "Zekat Hesaplama",
    "Su Kuyusu Aç",
  ];

  // Dışarı tıklanınca kapat
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-6 pt-24">

        {/* BAŞLIK */}
        <h1 className="text-2xl font-semibold text-center mb-6">
          Arama
        </h1>

        {/* INPUT */}
        <div className="flex justify-center mb-16">
          <div ref={boxRef} className="relative w-full max-w-xl">

            <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

            <input
              type="text"
              placeholder="Arama"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              className="
                w-full
                border
                rounded-xl
                pl-11
                pr-4
                py-3
                outline-none
                focus:ring-2
                focus:ring-green-500
                transition
              "
            />

            {showSuggestions && (
              <div
                className="
                  absolute
                  top-full
                  left-0
                  w-full
                  bg-white
                  border
                  rounded-xl
                  mt-2
                  shadow-lg
                  z-50
                "
              >
                <div className="px-4 py-2 text-xs text-gray-500">
                  Önerilenler
                </div>

                {suggestions
                  .filter((item) =>
                    item.toLowerCase().includes(query.toLowerCase())
                  )
                  .map((item) => (
                    <div
                      key={item}
                      className="
                        px-4
                        py-2
                        text-sm
                        cursor-pointer
                        hover:bg-gray-100
                        flex
                        justify-between
                        items-center
                      "
                      onClick={() => {
                        setQuery(item);
                        setShowSuggestions(false);
                      }}
                    >
                      <span>{item}</span>
                      <span className="text-gray-400">→</span>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>

        <div className="h-40" />

        {/* ALT MENÜLER */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 text-sm">

          <SearchColumn
            title="BAĞIŞ YAPIN"
            color="text-blue-600"
            items={[
              "Acil Yardım Bağışı Yap",
              "Su Kuyusu Aç",
              "Ramazan 2026",
              "Kurban 2026",
            ]}
          />

          <SearchColumn
            title="BİLGİ EDİNİN"
            color="text-yellow-600"
            items={[
              "Zekat Hesaplama",
              "KVKK",
              "Sıkça Sorulan Sorular",
              "Nasıl Gönüllü Olurum?",
              "Bilgi Güvenliği Politikası",
            ]}
          />

          <SearchColumn
            title="HIZLI ULAŞ"
            color="text-green-600"
            items={[
              "Sponsorluk Ödemesi Yap",
              "Kurban Vekaletlerim",
              "Sakarya Eğitim Kampüsü",
              "Yeni Kumbara Talep / Dolu",
              "Kumbara Teslimat Formu",
            ]}
          />

          <SearchColumn
            title="KURUMSAL"
            color="text-red-600"
            items={[
              "Hakkımızda",
              "Kurumsal Kimlik",
              "Medya Odası",
              "Şube ve Temsilcilikler",
              "SMS Abonelik",
            ]}
          />
        </div>
      </div>
    </div>
  );
}

function SearchColumn({
  title,
  items,
  color,
}: {
  title: string;
  items: string[];
  color: string;
}) {
  return (
    <div>
      <h3 className={`font-semibold mb-3 ${color}`}>
        {title}
      </h3>

      <ul className="space-y-2">
        {items.map((item) => (
          <li
            key={item}
            className="text-gray-700 hover:text-green-700 cursor-pointer transition"
          >
            {item} →
          </li>
        ))}
      </ul>
    </div>
  );
}

"use client";

import Link from "next/link";
import {
  BuildingLibraryIcon,
  PhoneIcon,
  GiftIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";

const items = [
  {
    label: "Hesap Numaraları",
    href: "/hesap-numaralari",
    icon: BuildingLibraryIcon,
  },
  {
    label: "Bize Ulaşın",
    href: "/iletisim",
    icon: PhoneIcon,
  },
  {
    label: "Hediye Bağışı",
    href: "/hediye-bagis",
    icon: GiftIcon,
  },
  {
    label: "Kumanya Kart",
    href: "/kumanya-kart",
    icon: ShoppingCartIcon,
  },
];

export default function SubHeader() {
  return (
    <div className="bg-white border-b border-gray-200">
      {/* MainHeader ile aynı hizalama */}
      <div className="max-w-[1440px] mx-auto px-4">
        <div className="flex items-center justify-center text-[15px] text-gray-700">
          {items.map((item, idx) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`
                  flex items-center gap-2
                  py-3 px-6
                  hover:text-green-700 transition
                  ${idx !== 0 ? "border-l border-gray-200" : ""}
                `}
              >
                <Icon className="w-4 h-4 text-green-600" />
                <span className="whitespace-nowrap">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

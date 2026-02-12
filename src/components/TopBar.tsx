"use client";

import "@fortawesome/fontawesome-free/css/all.min.css";
import { ReactNode } from "react";
import {
  PhoneIcon,
  CheckCircleIcon,
  GlobeAltIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/outline";

/* =======================
   PANEL DROPDOWN
======================= */
function Dropdown({
  label,
  icon: Icon,
  children,
  align = "left",
  width = "w-64",
}: {
  label: string;
  icon: any;
  children: ReactNode;
  align?: "left" | "right";
  width?: string;
}) {
  return (
    <div className="relative inline-flex group">
      {/* Trigger */}
      <div
        className="
          flex items-center gap-1 cursor-pointer
          text-gray-700 hover:text-green-700 transition
          select-none
        "
      >
        <Icon className="w-4 h-4 text-gray-500 group-hover:text-green-700 transition" />
        <span className="leading-none">{label}</span>
        <span className="text-[10px] leading-none transition group-hover:rotate-180">
          ▼
        </span>
      </div>

      {/* Panel */}
      <div
        className={`
          absolute top-full mt-2
          ${align === "right" ? "right-0" : "left-0"}
          z-50
          opacity-0 invisible
          group-hover:opacity-100 group-hover:visible
          transition-all duration-150
        `}
      >
        <div
          className={`
            bg-white border border-gray-200
            shadow-lg rounded-xl p-2
            ${width}
          `}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

/* =======================
   PANEL ITEM
======================= */
function PanelItem({
  icon,
  label,
  href,
}: {
  icon?: ReactNode;
  label: string;
  href?: string;
}) {
  const Tag: any = href ? "a" : "div";

  return (
    <Tag
      {...(href ? { href, target: "_blank", rel: "noreferrer" } : {})}
      className="
        group
        flex items-center gap-3
        px-3 py-2
        rounded-lg
        text-gray-700 text-sm
        transition
        hover:bg-gray-100 hover:text-green-700
      "
    >
      {icon && (
        <span className="w-4 text-gray-400 group-hover:text-green-700 transition">
          {icon}
        </span>
      )}
      <span className="whitespace-nowrap">{label}</span>
    </Tag>
  );
}

/* =======================
   TOPBAR
======================= */
export default function TopBar() {
  return (
    <div className="bg-gray-100 text-[13px] border-b border-gray-200">
      {/* Header ile aynı hizaya gelsin */}
      <div className="max-w-[1440px] mx-auto px-4 h-12 flex justify-between items-center">
        {/* Left */}
        <div className="flex items-center gap-6">
          <a
            href="tel:+902126312121"
            className="flex items-center gap-1 text-gray-700 hover:text-green-700 transition"
          >
            <PhoneIcon className="w-4 h-4 text-gray-500" />
            <span className="leading-none">0 212 631 21 21</span>
          </a>

          <Dropdown label="Takip Et" icon={CheckCircleIcon} width="w-44">
            <PanelItem
              icon={<i className="fa-brands fa-x-twitter" />}
              label="X (Twitter)"
              href="https://x.com/sakaryaihh"
            />
            <PanelItem
              icon={<i className="fa-brands fa-facebook" />}
              label="Facebook"
              href="https://facebook.com/sakaryaihhtr"
            />
            <PanelItem
              icon={<i className="fa-brands fa-instagram" />}
              label="Instagram"
              href="https://instagram.com/sakaryaihh"
            />
            <PanelItem
              icon={<i className="fa-brands fa-youtube" />}
              label="YouTube"
              href="https://youtube.com/@sakaryaihh"
            />
          </Dropdown>
        </div>

        {/* Right */}
        <div className="flex items-center gap-8">
          <Dropdown label="TR" icon={GlobeAltIcon} align="right" width="w-40">
            <PanelItem label="Türkçe" />
            <PanelItem label="English" />
            <PanelItem label="العربية" />
          </Dropdown>

          <Dropdown
            label="TRY"
            icon={CurrencyDollarIcon}
            align="right"
            width="w-52"
          >
            <PanelItem
              icon={<i className="fa-solid fa-turkish-lira-sign" />}
              label="Türk Lirası"
            />
            <PanelItem
              icon={<i className="fa-solid fa-dollar-sign" />}
              label="US Dollar"
            />
            <PanelItem
              icon={<i className="fa-solid fa-euro-sign" />}
              label="Euro"
            />
            <PanelItem
              icon={<i className="fa-solid fa-sterling-sign" />}
              label="British Pound"
            />
          </Dropdown>
        </div>
      </div>
    </div>
  );
}

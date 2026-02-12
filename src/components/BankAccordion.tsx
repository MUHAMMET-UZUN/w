"use client";

import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

type Bank = {
  name: string;
  accounts: string[];
};

export default function BankAccordion({ bank }: { bank: Bank }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border rounded-lg overflow-hidden bg-white">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center px-4 py-3 hover:bg-gray-50 transition"
      >
        <span className="font-medium text-gray-800">
          {bank.name}
        </span>

        <ChevronDownIcon
          className={`w-5 h-5 transition ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="px-6 py-4 bg-gray-50 space-y-2 text-sm text-gray-700">
          {bank.accounts.map((acc, i) => (
            <div
              key={i}
              className="flex justify-between items-center border-b pb-1"
            >
              <span>{acc}</span>
              <button className="text-green-600 hover:underline text-xs">
                Kopyala
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

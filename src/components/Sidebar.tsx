"use client";
import { useState } from "react";

export default function FloatingCampaigns() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Yuvarlak Buton */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-green-600 text-white shadow-lg animate-bounce"
      >
        🎉
      </button>

      {/* Modal içinde Sidebar içeriği */}
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Kampanyalar</h2>
            <div className="space-y-4">
              <img src="/afis1.jpg" alt="Kampanya 1" className="rounded shadow" />
              <img src="/afis2.jpg" alt="Kampanya 2" className="rounded shadow" />
              <img src="/afis3.jpg" alt="Kampanya 3" className="rounded shadow" />
            </div>
            <button
              onClick={() => setOpen(false)}
              className="mt-4 bg-red-600 text-white px-4 py-2 rounded"
            >
              Kapat
            </button>
          </div>
        </div>
      )}
    </>
  );
}
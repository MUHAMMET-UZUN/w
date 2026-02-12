"use client";

import { useState } from "react";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setLoading(true);

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setErr(data.message ?? data.error ?? "Giriş yapılamadı");
      return;
    }

    // Admin yetkisi kontrolü - MEMBER ise panele giremez
    if (data.user?.role === "MEMBER") {
      setErr("Admin paneline erişim yetkiniz yok.");
      return;
    }

    // Full page navigation - cookie'nin sonraki istekte gönderilmesini garanti eder
    window.location.href = "/admin/dashboard";
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-sm border rounded-xl p-6 space-y-4"
      >
        <h1 className="text-xl font-semibold">Admin Giriş</h1>

        <input
          className="w-full border rounded px-3 py-2"
          placeholder="E-posta"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
        />

        <input
          className="w-full border rounded px-3 py-2"
          placeholder="Şifre"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 text-white rounded px-3 py-2 disabled:opacity-60"
        >
          {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
        </button>

        {err && <p className="text-sm text-red-600">{err}</p>}
      </form>
    </div>
  );
}

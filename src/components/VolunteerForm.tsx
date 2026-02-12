"use client";

import { useState, useEffect } from "react";

type FormConfig = {
  title: string;
  fullNameLabel: string;
  emailLabel: string;
  phoneLabel: string;
  reasonLabel: string;
  fullNamePlaceholder: string;
  emailPlaceholder: string;
  phonePlaceholder: string;
  reasonPlaceholder: string;
  submitText: string;
  successMessage: string;
};

const defaultConfig: FormConfig = {
  title: "Gönüllü Başvuru Formu",
  fullNameLabel: "Ad Soyad",
  emailLabel: "E-posta",
  phoneLabel: "Telefon",
  reasonLabel: "Başvuru Gerekçesi / Mesajınız",
  fullNamePlaceholder: "Ad Soyad",
  emailPlaceholder: "ornek@email.com",
  phonePlaceholder: "05XXXXXXXXX",
  reasonPlaceholder:
    "Neden gönüllü olmak istiyorsunuz? Hangi alanlarda destek olabilirsiniz?",
  submitText: "Gönder",
  successMessage: "Başvurunuz alındı. En kısa sürede değerlendirilecektir.",
};

export default function VolunteerForm() {
  const [config, setConfig] = useState<FormConfig>(defaultConfig);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    reason: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/settings/volunteer-form")
      .then((res) => res.json())
      .then((data) => setConfig({ ...defaultConfig, ...data }))
      .catch(() => {});
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/volunteer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        const msg =
          data.details?.fieldErrors
            ? Object.values(data.details.fieldErrors).flat().join(", ")
            : data.message || "Başvuru gönderilemedi.";
        throw new Error(msg);
      }

      setSuccess(true);
      setFormData({ fullName: "", email: "", phone: "", reason: "" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 max-w-lg mx-auto bg-white shadow rounded-lg p-6"
    >
      {config.title && (
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {config.title}
        </h3>
      )}
      <div>
        <label className="block text-sm font-medium mb-1">
          {config.fullNameLabel}
        </label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder={config.fullNamePlaceholder}
          required
          minLength={2}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          {config.emailLabel}
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder={config.emailPlaceholder}
          required
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          {config.phoneLabel}
        </label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder={config.phonePlaceholder}
          required
          minLength={10}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          {config.reasonLabel}
        </label>
        <textarea
          name="reason"
          value={formData.reason}
          onChange={handleChange}
          placeholder={config.reasonPlaceholder}
          required
          minLength={10}
          rows={4}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      {error && <p className="text-red-600 text-sm">{error}</p>}

      {success && (
        <p className="text-green-600 text-sm">{config.successMessage}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold disabled:opacity-50 transition"
      >
        {loading ? "Gönderiliyor..." : config.submitText}
      </button>
    </form>
  );
}

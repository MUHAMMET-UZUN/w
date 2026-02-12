"use client";

import { useState } from "react";

export default function VolunteerForm() {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone: "",
    skills: "",
    departments: [] as string[],
    message: "",
  });

  // Input değişiklikleri
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Checkbox değişiklikleri
  const handleCheckboxChange = (dept: string) => {
    const selected = formData.departments.includes(dept)
      ? formData.departments.filter((d) => d !== dept)
      : [...formData.departments, dept];
    setFormData({ ...formData, departments: selected });
  };

  // Form gönderme
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Ad Soyad kontrolü
    if (!formData.fullname.includes(" ")) {
      alert("Lütfen ad ve soyadınızı birlikte giriniz.");
      return;
    }

    // Gmail kontrolü
    if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(formData.email)) {
      alert("Lütfen geçerli bir Gmail adresi giriniz (örnek@gmail.com).");
      return;
    }

    // Telefon kontrolü (05 ile başlayan 11 haneli)
    if (!/^05[0-9]{9}$/.test(formData.phone)) {
      alert("Lütfen geçerli bir telefon numarası giriniz. Örn: 05XXXXXXXXX");
      return;
    }

    alert("Form başarıyla gönderildi!");
    setFormData({
      fullname: "",
      email: "",
      phone: "",
      skills: "",
      departments: [],
      message: "",
    });
  };

  // Birim listesi
  const departmentsList = [
    "Gençlik Birimi",
    "Kadın Kolları",
    "Eğitim Birimi",
    "Yardım Organizasyonları",
    "Lojistik / Dağıtım",
    "Medya ve Tanıtım",
    "Arama ve Kurtarma",
    "Yetim Birimi",
    "Yardım İl İçi Birimi",
  ];

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto bg-white shadow rounded p-6 space-y-4"
    >
      {/* Ad Soyad */}
      <div>
        <label className="block text-sm font-medium mb-1">Ad Soyad</label>
        <input
          type="text"
          name="fullname"
          value={formData.fullname}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
          required
          placeholder="Ad Soyad"
        />
      </div>

      {/* E-posta */}
      <div>
        <label className="block text-sm font-medium mb-1">E-posta (Gmail)</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
          required
          placeholder="ornek@gmail.com"
        />
      </div>

      {/* Telefon */}
      <div>
        <label className="block text-sm font-medium mb-1">Telefon</label>
        <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
            placeholder="05XXXXXXXXX"
            pattern="^05[0-9]{9}$" // 05 ile başlayan ve toplam 11 haneli
        />
        </div>

      {/* Yetenekler */}
      <div>
        <label className="block text-sm font-medium mb-1">Yetenekler / İlgi Alanları</label>
        <input
          type="text"
          name="skills"
          value={formData.skills}
          onChange={handleChange}
          placeholder="Örn: Çeviri, Sosyal medya, Lojistik"
          className="w-full border rounded px-3 py-2"
          required
        />
      </div>

      {/* Birim Seçimi (Checkbox yan yana) */}
            <div>
            <label className="block text-sm font-medium mb-2">
                Destek Olmak İstediğiniz Birimler
            </label>
            <div className="grid grid-cols-2 gap-2">
                {departmentsList.map((dept) => (
                <label key={dept} className="flex items-center space-x-2">
                    <input
                    type="checkbox"
                    name="departments"
                    value={dept}
                    checked={formData.departments.includes(dept)}
                    onChange={() => handleCheckboxChange(dept)}
                    className="h-4 w-4"
                    />
                    <span>{dept}</span>
                </label>
                ))}
            </div>
            </div>

      {/* Mesaj */}
      <div>
        <label className="block text-sm font-medium mb-1">Ek Mesaj</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
          rows={4}
        />
      </div>

      {/* Gönder Butonu */}
        <div className="flex justify-center">
        <button
            type="submit"
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
            Gönder
        </button>
        </div>
    </form>
  );
}
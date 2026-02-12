"use client";

import { useState, useEffect } from "react";
import { Check, X, ChevronDown, ChevronUp } from "lucide-react";

type Application = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  reason: string;
  status: string;
  createdAt: string;
};

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

const defaultFormConfig: FormConfig = {
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

export default function AdminVolunteerPage() {
  const [tab, setTab] = useState<"applications" | "form">("applications");
  const [applications, setApplications] = useState<Application[]>([]);
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    total: 0,
  });
  const [statusFilter, setStatusFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [formConfig, setFormConfig] = useState<FormConfig>(defaultFormConfig);
  const [configSaving, setConfigSaving] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const fetchApplications = async () => {
    const params = new URLSearchParams();
    params.set("page", "1");
    params.set("limit", "50");
    if (statusFilter) params.set("status", statusFilter);
    const res = await fetch(`/api/admin/volunteer?${params}`, {
      credentials: "include",
    });
    const data = await res.json();
    if (data.applications) setApplications(data.applications);
    if (data.pagination) setPagination(data.pagination);
    setLoading(false);
  };

  const fetchFormConfig = async () => {
    const res = await fetch("/api/admin/settings?key=volunteer_form", {
      credentials: "include",
    });
    const data = await res.json();
    if (data.value) setFormConfig({ ...defaultFormConfig, ...data.value });
  };

  useEffect(() => {
    if (tab === "applications") {
      setLoading(true);
      fetchApplications();
    } else {
      fetchFormConfig();
    }
  }, [tab, statusFilter]);

  const updateStatus = async (id: string, status: "APPROVED" | "REJECTED") => {
    const res = await fetch(`/api/admin/volunteer/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ status }),
    });
    if (res.ok) fetchApplications();
  };

  const saveFormConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    setConfigSaving(true);
    await fetch("/api/admin/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ key: "volunteer_form", value: formConfig }),
    });
    setConfigSaving(false);
    alert("Form ayarları kaydedildi.");
  };

  const statusBadge = (s: string) => {
    const styles: Record<string, string> = {
      PENDING: "bg-amber-100 text-amber-700",
      APPROVED: "bg-green-100 text-green-700",
      REJECTED: "bg-red-100 text-red-700",
    };
    const labels: Record<string, string> = {
      PENDING: "Beklemede",
      APPROVED: "Onaylandı",
      REJECTED: "Reddedildi",
    };
    return (
      <span className={`px-2 py-1 rounded text-sm ${styles[s] ?? "bg-gray-100"}`}>
        {labels[s] ?? s}
      </span>
    );
  };

  return (
    <div className="p-6 max-w-6xl">
      <div className="flex gap-4 mb-6 border-b border-gray-200">
        <button
          onClick={() => setTab("applications")}
          className={`pb-3 px-1 font-medium ${
            tab === "applications"
              ? "text-[#009044] border-b-2 border-[#009044]"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          Başvurular
        </button>
        <button
          onClick={() => setTab("form")}
          className={`pb-3 px-1 font-medium ${
            tab === "form"
              ? "text-[#009044] border-b-2 border-[#009044]"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          Form Ayarları
        </button>
      </div>

      {tab === "applications" && (
        <>
          <div className="flex gap-4 mb-4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#009044]"
            >
              <option value="">Tümü</option>
              <option value="PENDING">Beklemede</option>
              <option value="APPROVED">Onaylandı</option>
              <option value="REJECTED">Reddedildi</option>
            </select>
          </div>

          {loading ? (
            <p className="text-gray-500">Yükleniyor...</p>
          ) : applications.length === 0 ? (
            <p className="text-gray-500 py-8">Henüz başvuru yok.</p>
          ) : (
            <div className="space-y-2">
              {applications.map((app) => (
                <div
                  key={app.id}
                  className="bg-white border border-gray-200 rounded-lg overflow-hidden"
                >
                  <div
                    className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
                    onClick={() =>
                      setExpandedId(expandedId === app.id ? null : app.id)
                    }
                  >
                    <div className="flex-1 min-w-0">
                      <span className="font-medium">{app.fullName}</span>
                      <span className="text-gray-500 ml-2">• {app.email}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      {statusBadge(app.status)}
                      {app.status === "PENDING" && (
                        <div
                          className="flex gap-2"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <button
                            onClick={() => updateStatus(app.id, "APPROVED")}
                            className="p-1.5 text-green-600 hover:bg-green-50 rounded"
                            title="Onayla"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => updateStatus(app.id, "REJECTED")}
                            className="p-1.5 text-red-600 hover:bg-red-50 rounded"
                            title="Reddet"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                      {expandedId === app.id ? (
                        <ChevronUp className="w-5 h-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                  </div>
                  {expandedId === app.id && (
                    <div className="px-4 pb-4 pt-0 border-t bg-gray-50/50">
                      <div className="grid gap-2 mt-3 text-sm">
                        <p>
                          <span className="text-gray-500">Telefon:</span>{" "}
                          {app.phone}
                        </p>
                        <p>
                          <span className="text-gray-500">Başvuru:</span>{" "}
                          {app.reason}
                        </p>
                        <p className="text-gray-500 text-xs">
                          {new Date(app.createdAt).toLocaleString("tr-TR")}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {tab === "form" && (
        <form
          onSubmit={saveFormConfig}
          className="max-w-xl space-y-4 bg-white p-6 rounded-xl border border-gray-200"
        >
          <h3 className="font-semibold text-gray-900">Gönüllü Formu Metinleri</h3>
          <p className="text-sm text-gray-500">
            Bu ayarlar /gonullu sayfasındaki formda görünecektir.
          </p>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Form Başlığı
            </label>
            <input
              type="text"
              value={formConfig.title}
              onChange={(e) =>
                setFormConfig({ ...formConfig, title: e.target.value })
              }
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ad Soyad Etiketi
              </label>
              <input
                type="text"
                value={formConfig.fullNameLabel}
                onChange={(e) =>
                  setFormConfig({ ...formConfig, fullNameLabel: e.target.value })
                }
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ad Soyad Placeholder
              </label>
              <input
                type="text"
                value={formConfig.fullNamePlaceholder}
                onChange={(e) =>
                  setFormConfig({
                    ...formConfig,
                    fullNamePlaceholder: e.target.value,
                  })
                }
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                E-posta Etiketi
              </label>
              <input
                type="text"
                value={formConfig.emailLabel}
                onChange={(e) =>
                  setFormConfig({ ...formConfig, emailLabel: e.target.value })
                }
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                E-posta Placeholder
              </label>
              <input
                type="text"
                value={formConfig.emailPlaceholder}
                onChange={(e) =>
                  setFormConfig({
                    ...formConfig,
                    emailPlaceholder: e.target.value,
                  })
                }
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Telefon Etiketi
              </label>
              <input
                type="text"
                value={formConfig.phoneLabel}
                onChange={(e) =>
                  setFormConfig({ ...formConfig, phoneLabel: e.target.value })
                }
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Telefon Placeholder
              </label>
              <input
                type="text"
                value={formConfig.phonePlaceholder}
                onChange={(e) =>
                  setFormConfig({
                    ...formConfig,
                    phonePlaceholder: e.target.value,
                  })
                }
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Başvuru Gerekçesi Etiketi
            </label>
            <input
              type="text"
              value={formConfig.reasonLabel}
              onChange={(e) =>
                setFormConfig({ ...formConfig, reasonLabel: e.target.value })
              }
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Başvuru Placeholder
            </label>
            <input
              type="text"
              value={formConfig.reasonPlaceholder}
              onChange={(e) =>
                setFormConfig({
                  ...formConfig,
                  reasonPlaceholder: e.target.value,
                })
              }
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Gönder Butonu Metni
            </label>
            <input
              type="text"
              value={formConfig.submitText}
              onChange={(e) =>
                setFormConfig({ ...formConfig, submitText: e.target.value })
              }
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Başarı Mesajı
            </label>
            <input
              type="text"
              value={formConfig.successMessage}
              onChange={(e) =>
                setFormConfig({
                  ...formConfig,
                  successMessage: e.target.value,
                })
              }
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>
          <button
            type="submit"
            disabled={configSaving}
            className="px-4 py-2 bg-[#009044] text-white rounded-lg hover:bg-[#007a38] disabled:opacity-50"
          >
            {configSaving ? "Kaydediliyor..." : "Kaydet"}
          </button>
        </form>
      )}
    </div>
  );
}

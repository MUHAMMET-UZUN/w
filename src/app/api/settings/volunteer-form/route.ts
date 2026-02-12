import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/** Public: Gönüllü form ayarlarını getir */
export async function GET() {
  const setting = await prisma.setting.findUnique({
    where: { id: "volunteer_form" },
  });

  const defaultValue = {
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
    successMessage:
      "Başvurunuz alındı. En kısa sürede değerlendirilecektir.",
  };

  const value = setting
    ? (JSON.parse(setting.value) as typeof defaultValue)
    : defaultValue;

  return NextResponse.json(value);
}

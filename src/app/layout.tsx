import "./globals.css";
import TopBar from "@/components/TopBar";
import MainHeader from "@/components/MainHeader";
import SubHeader from "@/components/SubHeader";

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body className="bg-white text-gray-900">
        {/* SABİT */}
        <TopBar />
        <MainHeader />

        {/* AKIŞTA */}
        <SubHeader />

        {/* SAYFA İÇERİĞİ */}
        <main className="pt-[80px]">
          {children}
        </main>
      </body>
    </html>
  );
}

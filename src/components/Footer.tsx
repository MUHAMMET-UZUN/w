export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-12">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* İletişim Bilgileri */}
        <div>
          <h3 className="text-lg font-semibold mb-4">İletişim</h3>
          <p>Sakarya İHH Akıf Derneği</p>
          <p>Adres: Adapazarı, Sakarya</p>
          <p>Tel: +90 555 555 55 55</p>
          <p>E-posta: info@sakarya-ihh.org</p>
        </div>

        {/* Hızlı Linkler */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Hızlı Linkler</h3>
          <ul className="space-y-2">
            <li><a href="/haberler" className="hover:text-green-400">Haberler</a></li>
            <li><a href="/gonullu" className="hover:text-green-400">Gönüllü Ol</a></li>
            <li><a href="/bagis" className="hover:text-green-400">Bağış Yap</a></li>
          </ul>
        </div>

        {/* Sosyal Medya */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Sosyal Medya</h3>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-green-400">Facebook</a>
            <a href="#" className="hover:text-green-400">Twitter</a>
            <a href="#" className="hover:text-green-400">Instagram</a>
          </div>
        </div>
      </div>

      {/* Alt Çizgi */}
      <div className="text-center mt-8 text-sm text-gray-400">
        © 2026 Sakarya İHH. Tüm hakları saklıdır.
      </div>
    </footer>
  );
}
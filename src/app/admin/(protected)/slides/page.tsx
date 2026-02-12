import Link from "next/link";

export default function AdminSlidesPage() {
  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Slides</h1>
        <Link
          className="px-4 py-2 rounded bg-green-600 text-white"
          href="/"
        >
          Siteye dön
        </Link>
      </div>

      <p className="mt-4 text-gray-600">
        Şimdi tarayıcıda <code>/api/admin/slides</code> çağırınca artık 401 değil
        200 dönmeli (profil/role durumuna göre 403 de olabilir).
      </p>
    </div>
  );
}

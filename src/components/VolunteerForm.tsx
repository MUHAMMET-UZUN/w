export default function VolunteerForm() {
  return (
    <form className="space-y-4 max-w-md mx-auto">
      <input type="text" placeholder="Ad Soyad" className="w-full p-2 border rounded" />
      <input type="email" placeholder="E-posta" className="w-full p-2 border rounded" />
      <input type="tel" placeholder="Telefon" className="w-full p-2 border rounded" />
      <textarea placeholder="İlgi Alanları" className="w-full p-2 border rounded"></textarea>
      <button className="bg-green-600 text-white px-4 py-2 rounded">Gönder</button>
    </form>
  );
}
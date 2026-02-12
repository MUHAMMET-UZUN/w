export default function MainNav() {
  return (
    <nav className="bg-white shadow flex justify-center space-x-8 py-3 font-medium">
      <a href="/biz-kimiz" className="hover:text-red-600">Biz Kimiz</a>
      <a href="/ne-yapiyoruz" className="hover:text-red-600">Ne Yapıyoruz</a>
      <a href="/ne-yapabilirsiniz" className="hover:text-red-600">Ne Yapabilirsiniz</a>
    </nav>
  );
}
// Props tipini tanımlıyoruz
interface NewsCardProps {
  title: string;
  description: string;
}

export default function NewsCard({ title, description }: NewsCardProps) {
  return (
    <div className="border rounded shadow p-4">
      <h3 className="font-semibold">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
      <a href="#" className="text-blue-600 text-sm">Devamını Oku →</a>
    </div>
  );
}
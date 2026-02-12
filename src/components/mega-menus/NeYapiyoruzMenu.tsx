import Link from "next/link";

type MenuItem = {
  label: string;
  icon: string;
};

type MenuColumnProps = {
  title: string;
  items: MenuItem[];
};

/* MENÜ VERİLERİ */
const gundem: MenuItem[] = [
  { label: "Filistin / Gazze", icon: "fa-globe" },
  { label: "Katarakt", icon: "fa-eye" },
  { label: "Yetim", icon: "fa-child" },
  { label: "Suriye", icon: "fa-house-chimney-crack" },
  { label: "Su", icon: "fa-droplet" },
  { label: "Mavi Marmara", icon: "fa-ship" },
  { label: "İyilikte Yarışan Sınıflar", icon: "fa-graduation-cap" },
  { label: "Türkiye", icon: "fa-location-dot" },
];

const calismaAlanlari: MenuItem[] = [
  { label: "İnsani Yardım", icon: "fa-box" },
  { label: "İnsan Hakları", icon: "fa-people-group" },
  { label: "İnsani Diplomasi", icon: "fa-comments" },
  { label: "Acil Yardım", icon: "fa-truck-medical" },
  { label: "Afet Yönetimi", icon: "fa-triangle-exclamation" },
  { label: "Gönüllü Faaliyetleri", icon: "fa-handshake-angle" },
  { label: "Bilinçlendirme", icon: "fa-bullhorn" },
];

/* ANA BİLEŞEN */
export default function NeYapiyoruzMenu() {
  return (
    <div
      className="
        bg-white
        border
        shadow-2xl
        z-50
        w-[700px]
        rounded-xl
      "
    >
      <div className="px-8 py-6">
        {/* KOLONLAR */}
        <div className="grid grid-cols-2 gap-10">
          <MenuColumn title="Gündem" items={gundem} />
          <MenuColumn title="Çalışma Alanları" items={calismaAlanlari} />
        </div>
      </div>
    </div>
  );
}

/* ALT BİLEŞEN */
function MenuColumn({ title, items }: MenuColumnProps) {
  return (
    <div>
      <h3 className="text-xs font-semibold text-gray-900 mb-3 uppercase tracking-wide">
        {title}
      </h3>

      <ul className="space-y-1">
        {items.map((item) => (
          <li key={item.label}>
            <Link
              href="#"
              className="
                group
                flex
                items-center
                gap-3
                px-2
                py-1.5
                rounded-md
                text-gray-700
                transition
                hover:bg-gray-100
                hover:text-green-700
              "
            >
              {/* ICON KUTUSU */}
              <span
                className="
                  w-7
                  h-7
                  flex
                  items-center
                  justify-center
                  rounded-md
                  bg-gray-100
                  text-gray-500
                  text-[13px]
                  group-hover:bg-green-100
                  group-hover:text-green-700
                  transition
                "
              >
                <i className={`fa-solid ${item.icon}`} />
              </span>

              <span className="text-[14px] leading-snug">
                {item.label}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

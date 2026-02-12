import Link from "next/link";

type MenuItem = {
  label: string;
  icon: string;
};

type MenuColumnProps = {
  title: string;
  items: MenuItem[];
};

const kurumsal: MenuItem[] = [
  { label: "Biz Kimiz", icon: "fa-circle-info" },
  { label: "Hakkımızda", icon: "fa-circle-info" },
  { label: "Tarihçe", icon: "fa-clock-rotate-left" },
  { label: "Yetkili Kurullar", icon: "fa-users" },
  { label: "Vakıf Kuruluş Senedi", icon: "fa-file-lines" },
  { label: "Denetim", icon: "fa-scale-balanced" },
  { label: "Etik Değerler", icon: "fa-shield-halved" },
  { label: "Uyum ve Risk", icon: "fa-shield-halved" },
  { label: "Medya Odası", icon: "fa-bullhorn" },
  { label: "İnsan Kaynakları", icon: "fa-user-tie" },
];

const bilgilendirme: MenuItem[] = [
  { label: "Kişisel Verilerin Korunması Kanunu", icon: "fa-lock" },
  { label: "Bilgi Güvenliği Politikası", icon: "fa-shield-halved" },
  { label: "Yolsuzluk ve Rüşvetle Mücadele", icon: "fa-gavel" },
  { label: "Bağışçı Hakları", icon: "fa-hand-holding-heart" },
  { label: "Gıda Bankacılığı", icon: "fa-bowl-food" },
];

const dokumanlar: MenuItem[] = [
  { label: "Vergi Muafiyeti", icon: "fa-percent" },
  { label: "Gelir Gider Tablosu", icon: "fa-table" },
  { label: "Bağımsız Denetim Raporu", icon: "fa-file-circle-check" },
];

export default function BizKimizMenu() {
  return (
    <div
      className="
        bg-white
        border
        shadow-2xl
        z-50
        w-[900px]
        rounded-xl
      "
    >

      <div className="px-6 py-5">
        <div className="grid grid-cols-3 gap-8">
          <MenuColumn title="Kurumsal" items={kurumsal} />
          <MenuColumn title="Bilgilendirme" items={bilgilendirme} />
          <MenuColumn title="Dokümanlar" items={dokumanlar} />
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

      <ul className="space-y-0.5">
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
              <span
                className="
                  w-9
                  h-9
                  flex
                  items-center
                  justify-center
                  rounded-lg
                  bg-gray-100
                  text-gray-500
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

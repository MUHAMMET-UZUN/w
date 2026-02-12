import Link from "next/link";

type MenuItem = {
  label: string;
  icon: string;
};

const items: MenuItem[] = [
  { label: "Bağış Yapın", icon: "fa-heart" },
  { label: "Sponsor Olun", icon: "fa-user-plus" },
  { label: "Su Kuyusu Açın", icon: "fa-droplet" },
  { label: "Gayrimenkul Bağışı", icon: "fa-building" },
  { label: "Uygulamayı İndirin", icon: "fa-mobile-screen-button" },
  { label: "Kumbara Alın", icon: "fa-piggy-bank" },
  { label: "Gönüllü Olun", icon: "fa-hands-helping" },
  { label: "Haberdar Olun", icon: "fa-bell" },
];

export default function NeYapabilirsinizMenu() {
  return (
    <div
      className="
        bg-white
        border
        shadow-2xl
        z-50
        w-[320px]
        rounded-xl
        p-3
      "
    >
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
                px-3
                py-2
                rounded-lg
                text-gray-700
                transition
                hover:bg-gray-100
                hover:text-green-700
              "
            >
              {/* ICON KUTUSU */}
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

              <span className="text-[14px] font-medium">
                {item.label}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

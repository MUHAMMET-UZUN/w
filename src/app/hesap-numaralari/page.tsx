import BankAccordion from "@/components/BankAccordion";

const banks = [
  {
    name: "Ziraat Bankası",
    accounts: [
      "TL IBAN: TR00 0000 0000 0000 0000 0001",
      "USD IBAN: TR00 0000 0000 0000 0000 0002",
    ],
  },
  {
    name: "Halkbank",
    accounts: [
      "TL IBAN: TR00 1111 1111 1111 1111 1111",
    ],
  },
  {
    name: "VakıfBank",
    accounts: [
      "TL IBAN: TR00 2222 2222 2222 2222 2222",
      "EUR IBAN: TR00 3333 3333 3333 3333 3333",
    ],
  },
  {
    name: "Kuveyt Türk",
    accounts: [
      "TL IBAN: TR00 4444 4444 4444 4444 4444",
    ],
  },
];

export default function HesapNumaralariPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-6 py-20">

        {/* Başlık */}
        <div className="text-center mb-10">
          <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-green-100 flex items-center justify-center">
            🏦
          </div>
          <h1 className="text-2xl font-bold">
            Banka Hesap Numaralarımız
          </h1>
        </div>

        {/* Liste */}
        <div className="space-y-4">
          {banks.map((bank) => (
            <BankAccordion key={bank.name} bank={bank} />
          ))}
        </div>
      </div>
    </div>
  );
}

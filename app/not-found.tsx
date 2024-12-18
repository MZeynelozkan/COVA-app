import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-900 text-white">
      {/* Animasyonlu 404 */}
      <div className="animate-bounce text-9xl font-bold text-red-500">404</div>
      {/* Başlık */}
      <h1 className="animate-fade-in mt-6 text-4xl font-extrabold">
        Sayfa Bulunamadı
      </h1>
      {/* Açıklama */}
      <p className="animate-fade-in mt-4 text-lg text-gray-400">
        Üzgünüz, aradığınız sayfa mevcut değil.
      </p>
      {/* Ana Sayfa Butonu */}
      <Link
        href="/"
        className="animate-fade-in mt-8 rounded-lg bg-red-600 px-6 py-3 font-semibold text-white shadow-md transition-all hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
      >
        Ana Sayfaya Dön
      </Link>
    </div>
  );
}

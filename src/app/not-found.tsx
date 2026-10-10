import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="text-8xl font-bold text-green-600">404</h1>

      <h2 className="mt-4 text-2xl font-bold text-gray-900">
        পেজটি খুঁজে পাওয়া যায়নি!
      </h2>

      <p className="mt-2 text-gray-600">
        দুঃখিত, তুমি যে পেজটি খুঁজছ সেটি পাওয়া যাচ্ছে না।
      </p>

      <Link
        href="/"
        className="mt-6 rounded-lg bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700"
      >
        হোম পেজে ফিরে যান
      </Link>
    </main>
  );
}
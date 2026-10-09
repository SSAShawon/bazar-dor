export default function Loading() {
  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-2xl font-bold text-gray-800">
          পণ্য লোড হচ্ছে...
        </h1>

        <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div
              key={item}
              className="rounded-xl bg-white p-5 shadow-sm"
            >
              <div className="h-16 w-16 animate-pulse rounded-lg bg-gray-200" />

              <div className="mt-4 h-5 w-32 animate-pulse rounded bg-gray-200" />

              <div className="mt-3 h-4 w-24 animate-pulse rounded bg-gray-200" />

              <div className="mt-6 h-8 w-full animate-pulse rounded bg-gray-100" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
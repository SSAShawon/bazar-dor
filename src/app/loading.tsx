export default function Loading() {
  return (
    <main className="mx-auto max-w-7xl animate-pulse px-4 py-8">
      <div className="mb-8 h-8 w-48 rounded-lg bg-gray-200" />

      <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm"
          >
            <div className="mb-4 h-24 rounded-lg bg-gray-200" />
            <div className="mb-3 h-5 w-3/4 rounded bg-gray-200" />
            <div className="mb-3 h-4 w-1/2 rounded bg-gray-200" />
            <div className="h-6 w-2/3 rounded bg-gray-200" />
          </div>
        ))}
      </div>
    </main>
  );
}
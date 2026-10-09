export default function Loading() {
  return (
    <main className="min-h-screen bg-gray-50 py-6">
      <div className="mx-auto max-w-7xl px-5 sm:px-7 lg:px-8">
        {/* Breadcrumb Skeleton */}
        <div className="flex gap-3">
          <div className="h-4 w-12 animate-pulse rounded bg-gray-200" />
          <div className="h-4 w-4 animate-pulse rounded bg-gray-200" />
          <div className="h-4 w-20 animate-pulse rounded bg-gray-200" />
        </div>

        {/* Product Header Skeleton */}
        <section className="mt-5 rounded-2xl bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <div className="h-20 w-20 animate-pulse rounded-xl bg-gray-200" />

              <div className="space-y-3">
                <div className="h-6 w-40 animate-pulse rounded bg-gray-200" />
                <div className="h-4 w-28 animate-pulse rounded bg-gray-200" />
                <div className="h-4 w-56 animate-pulse rounded bg-gray-100" />
              </div>
            </div>

            <div className="h-28 w-full animate-pulse rounded-xl bg-gray-100 md:w-36" />
          </div>
        </section>

        {/* Price Summary Skeleton */}
        <section className="mt-5 rounded-2xl bg-white p-6 shadow-sm">
          <div className="h-6 w-40 animate-pulse rounded bg-gray-200" />

          <div className="mt-5 grid gap-5 md:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="flex flex-col items-center gap-3 py-5"
              >
                <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
                <div className="h-8 w-28 animate-pulse rounded bg-gray-200" />
                <div className="h-4 w-32 animate-pulse rounded bg-gray-100" />
              </div>
            ))}
          </div>
        </section>

        {/* Market Table Skeleton */}
        <section className="mt-5 overflow-hidden rounded-2xl bg-white p-6 shadow-sm">
          <div className="h-6 w-52 animate-pulse rounded bg-gray-200" />

          <div className="mt-6 space-y-4">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="h-12 animate-pulse rounded bg-gray-100"
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
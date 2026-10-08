import Link from "next/link";
import { notFound } from "next/navigation";

type Product = {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: {
    dir: "up" | "down";
    pct: number;
  };
  markets: {
    market: string;
    division: string;
    min: number;
    max: number;
  }[];
};

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;

  const response = await fetch(
    "https://api.abcz.workers.dev/api/bazardor/products",
    {
      cache: "force-cache",
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const products: Product[] = await response.json();

  const product = products.find((item) => item.slug === slug);

  if (!product) {
    notFound();
  }

  const lowestMarket = product.markets.reduce((lowest, current) =>
    current.min < lowest.min ? current : lowest,
  );

  const highestMarket = product.markets.reduce((highest, current) =>
    current.max > highest.max ? current : highest,
  );

  const averagePrice =
    product.markets.reduce(
      (total, market) => total + (market.min + market.max) / 2,
      0,
    ) / product.markets.length;

  const averagePriceRounded = Math.round(averagePrice * 100) / 100;

  const priceDifference = Math.abs(product.today - product.yesterday);

  const isUp = product.change.dir === "up";

  return (
    <main className="min-h-screen bg-gray-50 py-6">
      <div className="mx-auto max-w-7xl px-5 sm:px-7 lg:px-8">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500">
          <Link href="/" className="hover:text-green-600">
            হোম
          </Link>

          <span className="mx-2">›</span>

          <Link
            href={`/category/${product.category}`}
            className="hover:text-green-600"
          >
            {product.categoryNameBn}
          </Link>

          <span className="mx-2">›</span>

          <span className="text-gray-900">{product.nameBn}</span>
        </div>

        {/* Product Header */}
        <section className="mt-5 rounded-2xl bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            {/* Product Info */}
            <div className="flex items-center gap-4">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-gray-50">
                <span className="text-5xl">{product.image}</span>
              </div>

              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {product.nameBn}
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                  প্রতি {product.unit} · {product.categoryNameBn}
                </p>

                <p className="mt-2 text-sm text-gray-600">
                  গতকালের তুলনায় আজ দাম{" "}
                  <span
                    className={
                      isUp
                        ? "font-semibold text-red-500"
                        : "font-semibold text-green-500"
                    }
                  >
                    {isUp ? "বেড়েছে" : "কমেছে"}
                  </span>{" "}
                  · {priceDifference} টাকা
                </p>
              </div>
            </div>

            {/* Today's Price */}
            <div className="w-full rounded-xl bg-gray-50 p-4 text-center md:w-36">
              <p className="text-xs text-gray-500">আজকের দাম</p>

              <p className="mt-1 text-2xl font-bold text-gray-900">
                ৳{product.today}
              </p>

              <p className="text-xs text-gray-500">৳/{product.unit}</p>

              <p
                className={
                  isUp
                    ? "mt-1 text-sm font-semibold text-red-500"
                    : "mt-1 text-sm font-semibold text-green-500"
                }
              >
                {isUp ? "▲" : "▼"} {Math.abs(product.change.pct)}%
              </p>
            </div>
          </div>
        </section>

        {/* Price Summary */}
        {/* Price Summary */}
        <section className="mt-5 rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900">দামের সারসংক্ষেপ</h2>

          <div className="mt-5 grid grid-cols-1 divide-y divide-gray-100 md:grid-cols-3 md:divide-x md:divide-y-0">
            {/* Minimum Price */}
            <div className="px-4 py-4 text-center md:first:pl-0">
              <p className="text-sm text-gray-500">সর্বনিম্ন দাম</p>

              <p className="mt-2 text-2xl font-bold text-green-600">
                ৳{lowestMarket.min}
              </p>

              <p className="mt-1 text-sm text-gray-500">
                {lowestMarket.market}
              </p>
            </div>

            {/* Maximum Price */}
            <div className="px-4 py-4 text-center">
              <p className="text-sm text-gray-500">সর্বাধিক দাম</p>

              <p className="mt-2 text-2xl font-bold text-red-500">
                ৳{highestMarket.max}
              </p>

              <p className="mt-1 text-sm text-gray-500">
                {highestMarket.market}
              </p>
            </div>

            {/* Average Price */}
            <div className="px-4 py-4 text-center md:last:pr-0">
              <p className="text-sm text-gray-500">গড় দাম</p>

              <p className="mt-2 text-2xl font-bold text-green-600">
                ৳{averagePriceRounded}
              </p>

              <p className="mt-1 text-sm text-gray-500">প্রতি {product.unit}</p>
            </div>
          </div>
        </section>
        {/* Market Prices */}
        <section className="mt-5 overflow-hidden rounded-2xl bg-white shadow-sm">
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-900">
              বাজারভিত্তিক আজকের দাম
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] border-collapse text-sm">
              <thead>
                <tr className="border-y border-gray-200 bg-gray-50 text-left">
                  <th className="px-6 py-4 font-semibold text-gray-700">
                    বাজার
                  </th>

                  <th className="px-6 py-4 font-semibold text-gray-700">
                    বিভাগ
                  </th>

                  <th className="px-6 py-4 font-semibold text-gray-700">
                    সর্বনিম্ন
                  </th>

                  <th className="px-6 py-4 font-semibold text-gray-700">
                    সর্বাধিক
                  </th>

                  <th className="px-6 py-4 font-semibold text-gray-700">গড়</th>
                </tr>
              </thead>

              <tbody>
                {product.markets.map((market, index) => {
                  const average = (market.min + market.max) / 2;

                  return (
                    <tr
                      key={`${market.market}-${index}`}
                      className={`border-b border-gray-200 ${
                        index % 2 === 0 ? "bg-gray-50" : "bg-white"
                      }`}
                    >
                      <td className="px-6 py-4 font-medium text-gray-900">
                        {market.market}
                      </td>

                      <td className="px-6 py-4 text-gray-600">
                        {market.division}
                      </td>

                      <td className="px-6 py-4 font-semibold text-green-600">
                        ৳{market.min}
                      </td>

                      <td className="px-6 py-4 font-semibold text-red-500">
                        ৳{market.max}
                      </td>

                      <td className="px-6 py-4 font-semibold text-gray-900">
                        ৳{average.toFixed(2)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Page;

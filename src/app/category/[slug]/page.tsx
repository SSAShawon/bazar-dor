import { notFound } from "next/navigation";
import Link from "next/link";

export const instant = false;

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
  change: {
    dir: "up" | "down";
    pct: number;
  };
};

type Category = {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
};

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;

  const [categoryResponse, productResponse] = await Promise.all([
    fetch("https://api.abcz.workers.dev/api/bazardor/categories", {
      cache: "force-cache",
    }),
    fetch("https://api.abcz.workers.dev/api/bazardor/products", {
      cache: "force-cache",
    }),
  ]);

  if (!categoryResponse.ok || !productResponse.ok) {
    throw new Error("Failed to fetch data");
  }

  const categories: Category[] = await categoryResponse.json();
  const products: Product[] = await productResponse.json();

  const category = categories.find((item) => item.slug === slug);

  if (!category) {
    notFound();
  }

  const categoryProducts = products.filter(
    (product) => product.category === slug,
  );

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-7xl px-5 sm:px-7 lg:px-8">
        {/* Category Header */}
        <section className="rounded-2xl bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{category.icon}</span>

            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {category.nameBn}
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                মোট {categoryProducts.length}টি পণ্য
              </p>
            </div>
          </div>
        </section>

        {/* Sort Section */}
        <section className="mt-5 rounded-2xl bg-white p-4 shadow-sm">
          <div className="flex justify-end">
            <select
              className="select select-bordered w-full max-w-xs text-gray-700"
              defaultValue=""
            >
              <option value="" disabled>
                সাজান
              </option>
              <option value="low-to-high">দাম: কম থেকে বেশি</option>
              <option value="high-to-low">দাম: বেশি থেকে কম</option>
              <option value="change">দামের পরিবর্তন</option>
            </select>
          </div>
        </section>

        {/* Products */}
        <section className="mt-5">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {categoryProducts.map((product) => (
              <Link
  key={product.id}
  href={`/product/${product.slug}`}
  className="block rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
>
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-gray-50">
                    <span className="text-4xl">{product.image}</span>
                  </div>

                  <div>
                    <h2 className="font-semibold text-gray-900">
                      {product.nameBn}
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                      প্রতি {product.unit}
                    </p>
                  </div>
                </div>

                <div className="mt-5 flex items-end justify-between border-t border-gray-100 pt-4">
                  <div>
                    <p className="text-sm text-gray-500">আজকের দাম</p>

                    <p className="mt-1 text-xl font-bold text-gray-900">
                      ৳{product.today}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-sm text-gray-500">দামের পরিবর্তন</p>

                    <p className="mt-1 font-semibold">
                      <span
                        className={
                          product.change.dir === "up"
                            ? "text-red-500"
                            : "text-green-500"
                        }
                      >
                        {product.change.dir === "up" ? "▲" : "▼"}
                      </span>{" "}
                      {Math.abs(product.change.pct)}%
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default Page;

import Image from "next/image";

type Product = {
  id: number;
  nameBn: string;
  unit: string;
  today: number;
  image: string;
  change: {
    dir: "up" | "down";
    pct: number;
  };
};

const AllProducts = async () => {
  const response = await fetch(
    "https://api.abcz.workers.dev/api/bazardor/products",
    {
      cache: "force-cache",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const products: Product[] = await response.json();

  return (
    <section id="সব-পণ্য" className="bg-gray-50 py-12">
      <div className="mx-auto max-w-7xl px-5 sm:px-7 lg:px-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            সব পণ্য
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            মোট {products.length}টি পণ্য দেখানো হচ্ছে
          </p>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <div
              key={product.id}
              className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-gray-50">
                  {product.image.startsWith("/") ? (
                    <Image
                      src={product.image}
                      alt={product.nameBn}
                      width={50}
                      height={50}
                      className="object-contain"
                    />
                  ) : (
                    <span className="text-4xl">{product.image}</span>
                  )}
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900">
                    {product.nameBn}
                  </h3>

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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AllProducts;
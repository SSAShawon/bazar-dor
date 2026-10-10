"use client";

import { useState } from "react";
import Link from "next/link";

type Product = {
  id: number;
  slug: string;
  nameBn: string;
  unit: string;
  image: string;
  today: number;
  change: {
    dir: "up" | "down";
    pct: number;
  };
};

type Props = {
  products: Product[];
};

export default function CategoryProductList({ products }: Props) {
  const [sortBy, setSortBy] = useState("default");

  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === "low-to-high") return a.today - b.today;
    if (sortBy === "high-to-low") return b.today - a.today;
    return 0;
  });

  return (
    <>
      <div className="mt-5 flex justify-end rounded-2xl bg-white p-4 shadow-sm">
        <select
          aria-label="পণ্য সাজান"
          className="select select-bordered w-full max-w-xs text-gray-700"
          value={sortBy}
          onChange={(event) => setSortBy(event.target.value)}
        >
          <option value="default">ডিফল্ট সাজানো</option>
          <option value="low-to-high">দাম: কম থেকে বেশি</option>
          <option value="high-to-low">দাম: বেশি থেকে কম</option>
        </select>
      </div>

      <section className="mt-5">
        {sortedProducts.length === 0 ? (
          <div className="rounded-xl bg-white p-8 text-center text-gray-600">
            এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {sortedProducts.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.slug}`}
                className="block rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-gray-50">
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
                    <p className="text-sm text-gray-500">
                      দামের পরিবর্তন
                    </p>
                    <p className="mt-1 font-semibold">
                      {product.change.pct === 0 ? (
                        <span className="text-gray-400">—</span>
                      ) : (
                        <>
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
                        </>
                      )}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
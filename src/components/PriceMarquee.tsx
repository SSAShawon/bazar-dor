"use cache";

import Marquee from "react-fast-marquee";
import Link from "next/link";

type Product = {
  id: number;
  slug: string;
  nameBn: string;
  unit: string;
  today: number;
  categoryIcon: string;
  change: {
    dir: "up" | "down";
    pct: number;
  };
};

const PriceMarquee = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products",
    {
      cache: "force-cache",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const data: Product[] = await res.json();

  return (
    <div className="border-y border-gray-200 bg-white py-2 text-black">
      <Marquee speed={100} pauseOnHover>
        {data.map((product) => (
          <Link
            key={product.id}
            href={`/product/${product.slug}`}
            className="mx-8 flex items-center gap-3 whitespace-nowrap border-r border-gray-200 pr-8 transition-opacity hover:opacity-70"
          >
            <span className="text-lg">{product.categoryIcon}</span>

            <span className="font-medium">{product.nameBn}</span>

            <span>
              ৳{product.today}/{product.unit}
            </span>

            <span
              className={
                product.change.pct === 0
                  ? "font-semibold text-gray-400"
                  : product.change.dir === "up"
                    ? "font-semibold text-red-500"
                    : "font-semibold text-green-500"
              }
            >
              {product.change.pct === 0
                ? "—"
                : `${product.change.dir === "up" ? "▲" : "▼"} ${Math.abs(product.change.pct)}%`}
            </span>
          </Link>
        ))}
      </Marquee>
    </div>
  );
};

export default PriceMarquee;
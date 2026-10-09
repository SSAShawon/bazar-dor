"use cache";
import Marquee from "react-fast-marquee";

type Product = {
  id: number;
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
    "https://api.abcz.workers.dev/api/bazardor/products",
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
          <div
            key={product.id}
            className="mx-8 flex items-center gap-3 whitespace-nowrap border-r border-gray-200 pr-8"
          >
            <span className="text-lg">{product.categoryIcon}</span>

            <span className="font-medium">{product.nameBn}</span>

            <span>
              ৳{product.today}/{product.unit}
            </span>

            <span
              className={
                product.change.dir === "up"
                  ? "font-semibold text-red-500"
                  : "font-semibold text-green-500"
              }
            >
              {product.change.dir === "up" ? "▲" : "▼"}{" "}
              {Math.abs(product.change.pct)}%
            </span>
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default PriceMarquee;
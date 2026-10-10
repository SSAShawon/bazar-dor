
import { Suspense } from "react";
import AllProducts from "@/components/AllProducts";
import FallingProducts from "@/components/FallingProducts";
import Hero from "@/components/Hero";
import PriceMarquee from "@/components/PriceMarquee";
import RisingProducts from "@/components/RisingProducts";

function ProductSectionFallback() {
  return (
    <div className="min-h-40 animate-pulse bg-gray-50 px-5 py-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 h-7 w-48 rounded bg-gray-200" />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="h-36 rounded-xl bg-gray-200"
            />
          ))}
        </div>
      </div>
    </div>
  );
}



export default function Home() {
  return (
    <main>
      

      <Hero />

      <Suspense fallback={<ProductSectionFallback />}>
        <RisingProducts />
      </Suspense>

      <Suspense fallback={<ProductSectionFallback />}>
        <FallingProducts />
      </Suspense>

      <Suspense fallback={<ProductSectionFallback />}>
        <AllProducts />
      </Suspense>
    </main>
  );
}
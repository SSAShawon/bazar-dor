import { notFound } from "next/navigation";
import Link from "next/link";
import CategoryProductList from "@/components/CategoryProductList";

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
    fetch("https://openapi.programming-hero.com/api/bazardor/categories", {
      cache: "force-cache",
    }),
    fetch("https://openapi.programming-hero.com/api/bazardor/products", {
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
        <CategoryProductList products={categoryProducts} />

       
      </div>
    </main>
  );
};

export default Page;

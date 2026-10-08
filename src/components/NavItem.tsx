const NavItem = async () => {
  const response = await fetch(
    "https://api.abcz.workers.dev/api/bazardor/categories",
    {
      cache: "force-cache",
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch categories: ${response.status}`);
  }

  const categories = await response.json();

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-5 sm:px-7 lg:px-8">
        <div className="flex items-center justify-start gap-8 py-3">
          {categories.map(
            (category: {
              id: string;
              slug: string;
              nameBn: string;
              icon: string;
            }) => (
              <a
                key={category.id}
                href={`/category/${category.slug}`}
                className="flex items-center gap-2 font-medium text-black hover:text-green-600"
              >
                <span>{category.icon}</span>
                <span>{category.nameBn}</span>
              </a>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default NavItem;
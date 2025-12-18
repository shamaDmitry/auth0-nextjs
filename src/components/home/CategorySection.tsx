import { Category } from "@/types";
import Link from "next/link";

interface CategorySectionProps {
  categories: Category[] | null;
}

export function CategorySection({ categories }: CategorySectionProps) {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="mb-10 text-center">
          <h2 className="mb-3 text-3xl font-bold">Browse by Category</h2>

          <p className="text-muted-foreground">
            Find the perfect deal in your favorite category
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
          {categories &&
            categories.map((category, index) => {
              return (
                <Link
                  key={category.id}
                  href={`/coupons?category=${category.slug}`}
                  className="group flex flex-col items-center rounded-xl border border-border bg-card p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <span className="mb-3 text-4xl transition-transform duration-300 group-hover:scale-110">
                    {category.icon}
                  </span>

                  <span className="mb-1 text-sm font-semibold">
                    {category.name}
                  </span>

                  <span className="text-xs text-muted-foreground">
                    {category.coupon_count > 1
                      ? `${category.coupon_count} deals`
                      : `${category.coupon_count} deal`}
                  </span>
                </Link>
              );
            })}
        </div>
      </div>
    </section>
  );
}

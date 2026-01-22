import { getCategoriesQuery, getFeaturedCouponsQuery } from "@/api/couponsAPI";
import { CategorySection } from "@/components/home/CategorySection";
import { FeaturedDeals } from "@/components/home/FeaturedDeals";
import { HeroSection } from "@/components/home/HeroSection";
import { createClient } from "@/lib/supabase/server";

export default async function Home() {
  const supabase = await createClient();

  const categoriesQuery = getCategoriesQuery(supabase);
  const { data: categories } = await categoriesQuery;

  const featuredQuery = getFeaturedCouponsQuery(supabase);
  const { data: featuredCoupons } = await featuredQuery;

  return (
    <div className="container mx-auto p-4">
      <HeroSection />

      {categories && categories.length > 0 && (
        <CategorySection categories={categories} />
      )}

      {featuredCoupons && featuredCoupons.length > 0 && (
        <FeaturedDeals featuredCoupons={featuredCoupons} />
      )}
    </div>
  );
}

import { getFeaturedCouponsQuery } from "@/api/couponsAPI";
import { CategorySection } from "@/components/home/CategorySection";
import { FeaturedDeals } from "@/components/home/FeaturedDeals";
import { HeroSection } from "@/components/home/HeroSection";
import { createClient } from "@/lib/supabase/server";

export default async function Home() {
  const supabase = await createClient();

  const { data: categories } = await supabase.from("categories").select("*");

  const featuredQuery = getFeaturedCouponsQuery(supabase);
  const { data: featuredCoupons } = await featuredQuery;

  return (
    <div className="container mx-auto p-4">
      <HeroSection />

      <CategorySection categories={categories} />

      {featuredCoupons && featuredCoupons.length > 0 && (
        <FeaturedDeals featuredCoupons={featuredCoupons} />
      )}
    </div>
  );
}

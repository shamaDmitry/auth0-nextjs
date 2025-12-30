import { getFeaturedCoupons } from "@/api/couponsAPI";
import { CategorySection } from "@/components/home/CategorySection";
import { FeaturedDeals } from "@/components/home/FeaturedDeals";
import { HeroSection } from "@/components/home/HeroSection";
import { createClient } from "@/lib/supabase/server";
import { QueryData } from "@supabase/supabase-js";

export default async function Home() {
  const supabase = await createClient();

  const { data: categories } = await supabase.from("categories").select();
  const { data: featuredCoupons } = await supabase
    .from("coupons")
    .select("*, category(*)")
    .eq("is_featured", true);

  const test = await getFeaturedCoupons();

  console.log("test", test);

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

import { getCouponCategories, getFeaturedCoupons } from "@/api/couponsAPI";
import { CategorySection } from "@/components/home/CategorySection";
import { FeaturedDeals } from "@/components/home/FeaturedDeals";
import { HeroSection } from "@/components/home/HeroSection";
import { createClient } from "@/lib/supabase/server";

export default async function Home() {
  const categories = await getCouponCategories();
  const featuredCoupons = await getFeaturedCoupons();

  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  console.log("user", user);

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

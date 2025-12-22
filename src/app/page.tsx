import { auth0 } from "@/lib/auth0";

import { CategorySection } from "@/components/home/CategorySection";
import { FeaturedDeals } from "@/components/home/FeaturedDeals";
import { HeroSection } from "@/components/home/HeroSection";
import { createClient } from "@/lib/supabase/server";

export default async function Home() {
  const supabase = await createClient();
  const session = await auth0.getSession();
  console.log("session", session?.user);

  const { data: categories } = await supabase.from("categories").select();
  const { data: featuredCoupons } = await supabase
    .from("coupons")
    .select("*")
    .eq("is_featured", true);

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

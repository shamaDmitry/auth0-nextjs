import { getCouponCategories, getFeaturedCoupons } from "@/api/couponsAPI";
import { CategorySection } from "@/components/home/CategorySection";
import { FeaturedDeals } from "@/components/home/FeaturedDeals";
import { HeroSection } from "@/components/home/HeroSection";
import { createClient } from "@/lib/supabase/server";

// import { createClient } from "@/lib/supabase/server";
// import { QueryData } from "@supabase/supabase-js";

// const supabase = await createClient();

// const featuredCouponsQuery = supabase
//   .from("coupons")
//   .select("*, category(*)")
//   .eq("is_featured", true);

// export type FeaturedCoupons = QueryData<typeof featuredCouponsQuery>;

// export async function getFeaturedCoupons(): Promise<FeaturedCoupons | null> {
//   const { data } = await featuredCouponsQuery;

//   return data;
// }

// const categoriesQuery = supabase.from("categories").select();

// export type Categories = QueryData<typeof categoriesQuery>;

// export async function getCouponCategories(): Promise<Categories | null> {
//   const { data } = await categoriesQuery;

//   return data;
// }

export default async function Home() {
  // const supabase = await createClient();

  // const { categories } = await supabase.from("categories").select("*");
  // const featuredCoupons = await getFeaturedCoupons();

  // const supabase = await createClient();

  // const {
  //   data: { user },
  // } = await supabase.auth.getUser();

  // console.log("user", user);

  return (
    <div className="container mx-auto p-4">
      <HeroSection />

      {/* <CategorySection categories={categories} /> */}

      {/* {featuredCoupons && featuredCoupons.length > 0 && (
        <FeaturedDeals featuredCoupons={featuredCoupons} />
      )} */}
    </div>
  );
}

import { createClient } from "@/lib/supabase/server";
import { QueryData } from "@supabase/supabase-js";

const supabase = await createClient();

const featuredCouponsQuery = supabase
  .from("coupons")
  .select("*, category(*)")
  .eq("is_featured", true);

export type FeaturedCoupons = QueryData<typeof featuredCouponsQuery>;

export async function getFeaturedCoupons(): Promise<FeaturedCoupons | null> {
  const { data } = await featuredCouponsQuery;

  // if (Array.isArray(data)) return data[0]; // handle array vs single logic
  return data;
}

const categoriesQuery = supabase.from("categories").select();

export type Categories = QueryData<typeof categoriesQuery>;

export async function getCouponCategories(): Promise<Categories | null> {
  const { data } = await categoriesQuery;

  return data;
}

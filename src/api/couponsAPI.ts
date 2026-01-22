import { Database } from "@/types/supabase";
import { QueryData, SupabaseClient } from "@supabase/supabase-js";

type TypedSupabaseClient = SupabaseClient<Database>;

export const getFeaturedCouponsQuery = (client: TypedSupabaseClient) => {
  return client
    .from("coupons")
    .select("*, category(*)")
    .eq("is_featured", true);
};
export type FeaturedCoupons = QueryData<
  ReturnType<typeof getFeaturedCouponsQuery>
>[number];

export const getCouponsQuery = (client: TypedSupabaseClient) => {
  return client.from("coupons").select("*, category(*)");
};
export type Coupons = QueryData<ReturnType<typeof getCouponsQuery>>[number];

export const getCategoriesQuery = (client: TypedSupabaseClient) => {
  return client.from("categories").select("*");
};
export type Categories = QueryData<
  ReturnType<typeof getCategoriesQuery>
>[number];

export const getCouponQuery = (client: TypedSupabaseClient, id: string) => {
  return client
    .from("coupons")
    .select("*, category(name, icon)")
    .eq("id", id)
    .single();
};
export type Coupon = QueryData<ReturnType<typeof getCouponQuery>>;

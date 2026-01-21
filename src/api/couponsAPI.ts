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

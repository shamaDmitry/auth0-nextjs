import { Database } from "@/types/supabase";
import { QueryData, SupabaseClient } from "@supabase/supabase-js";

type TypedSupabaseClient = SupabaseClient<Database>;

export const getUserRoleQuery = (client: TypedSupabaseClient, id: string) => {
  return client.from("profiles").select("role(*)").eq("id", id).single();
};
export type UserRole = QueryData<ReturnType<typeof getUserRoleQuery>>;

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Role } from "@/hooks/useUser";

export async function getUser() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { user: null, role: null };

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  return { user, role: profile?.role ?? null };
}

export async function getUserRole() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("role(*)")
    .eq("id", user.id)
    .single();

  return profile?.role;
}

export async function protectRoute(requiredRole: string) {
  const role = await getUserRole();

  if (role?.slug !== requiredRole) {
    redirect("/unauthorized"); // Create this page to show an error
  }
}

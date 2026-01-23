"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export type FormState = {
  message: string;
  error?: string;
};

export async function login(prevState: FormState, formData: FormData) {
  const supabase = await createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const redirectTo = formData.get("redirectTo") as string | null;

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    return { message: "Login failed", error: error.message };
  }

  revalidatePath("/", "layout");
  redirect(redirectTo || "/coupons");
}

export async function signup(prevState: FormState, formData: FormData) {
  const supabase = await createClient();
  const origin = (await headers()).get("origin");

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signUp({
    ...data,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    return { message: "Signup failed", error: error.message };
  }

  revalidatePath("/", "layout");
  redirect("/check-email");
}

export async function signout() {
  const supabase = await createClient();
  await supabase.auth.signOut();

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signInWithProvider(provider: "google" | "github") {
  const supabase = await createClient();
  const origin = (await headers()).get("origin");

  const { data } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${origin}/auth/callback`,
      queryParams: {
        access_type: "offline", // Request refresh token (Google specific)
        prompt: "consent", // Force consent screen (Google specific)
      },
    },
  });

  if (data.url) {
    redirect(data.url);
  }
}

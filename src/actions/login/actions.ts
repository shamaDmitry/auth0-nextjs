"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    return { message: "Login failed", error: error.message };
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signup(prevState: FormState, formData: FormData) {
  const supabase = await createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    return { message: "Signup failed", error: error.message };
  }

  revalidatePath("/", "layout");
  redirect("/");
}

"use client";

import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner"; // Or your preferred toast library

export async function resendVerificationEmail(email: string) {
  const supabase = createClient();

  const { error } = await supabase.auth.resend({
    type: "signup",
    email: email,
    options: {
      emailRedirectTo: `${window.location.origin}/auth/confirm`,
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  toast.success("Verification email sent!");

  return { success: true };
}

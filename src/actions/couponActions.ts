"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export interface CouponFormData {
  title: string;
  description: string;
  original_price: number;
  discounted_price: number;
  category: string;
  quantity: number;
  valid_from: string;
  valid_until: string;
  merchant_name: string;
  location?: string;
  image_url: string;
  terms: string;
}

export async function createCoupon(data: CouponFormData) {
  const supabase = await createClient();

  // const discountPercentage = Math.round(
  //   ((data.originalPrice - data.discountedPrice) / data.originalPrice) * 100
  // );

  const { data: category } = await supabase
    .from("categories")
    .select("id")
    .eq("slug", data.category)
    .single();

  if (!category) {
    return { error: "Category not found" };
  }

  const { error } = await supabase.from("coupons").insert({
    title: data.title,
    description: data.description,
    short_description: data.description.slice(0, 100),
    original_price: data.original_price,
    discounted_price: data.discounted_price,
    // discount_percentage: discountPercentage,
    category: category.id,
    quantity: data.quantity,
    valid_from: data.valid_from,
    valid_until: data.valid_until,
    expires_at: data.valid_until,
    merchant_name: data.merchant_name,
    location: data.location || null,
    image_url: data.image_url,
    terms_and_conditions: data.terms,
    is_active: true,
    sold_count: 0,
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin");

  return { success: true };
}

export async function updateCoupon(id: string, data: CouponFormData) {
  const supabase = await createClient();

  const discountPercentage = Math.round(
    ((data.original_price - data.discounted_price) / data.original_price) * 100
  );

  const { data: category } = await supabase
    .from("categories")
    .select("id")
    .eq("slug", data.category)
    .single();

  if (!category) {
    return { error: "Category not found" };
  }

  const { error } = await supabase
    .from("coupons")
    .update({
      title: data.title,
      description: data.description,
      short_description: data.description.slice(0, 100),
      original_price: data.original_price,
      discounted_price: data.discounted_price,
      discount_percentage: discountPercentage,
      category_id: category.id,
      quantity: data.quantity,
      valid_from: data.valid_from,
      valid_until: data.valid_until,
      expires_at: data.valid_until,
      merchant_name: data.merchant_name,
      location: data.location || null,
      image_url: data.image_url,
      terms_and_conditions: data.terms,
    })
    .eq("id", id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin");
  return { success: true };
}

export async function deleteCoupon(id: string) {
  const supabase = await createClient();

  const { error } = await supabase.from("coupons").delete().eq("id", id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin");
  return { success: true };
}

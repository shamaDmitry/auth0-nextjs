"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export interface CouponFormData {
  title: string;
  description: string;
  originalPrice: number;
  discountedPrice: number;
  category: string;
  quantity: number;
  validFrom: string;
  validUntil: string;
  merchantName: string;
  location?: string;
  imageUrl: string;
  terms: string;
}

export async function createCoupon(data: CouponFormData) {
  const supabase = await createClient();

  const discountPercentage = Math.round(
    ((data.originalPrice - data.discountedPrice) / data.originalPrice) * 100
  );

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
    original_price: data.originalPrice,
    discounted_price: data.discountedPrice,
    // discount_percentage: discountPercentage,
    category: category.id,
    quantity: data.quantity,
    valid_from: data.validFrom,
    valid_until: data.validUntil,
    expires_at: data.validUntil,
    merchant_name: data.merchantName,
    location: data.location || null,
    image_url: data.imageUrl,
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
    ((data.originalPrice - data.discountedPrice) / data.originalPrice) * 100
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
      original_price: data.originalPrice,
      discounted_price: data.discountedPrice,
      discount_percentage: discountPercentage,
      category_id: category.id,
      quantity: data.quantity,
      valid_from: data.validFrom,
      valid_until: data.validUntil,
      expires_at: data.validUntil,
      merchant_name: data.merchantName,
      location: data.location || null,
      image_url: data.imageUrl,
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

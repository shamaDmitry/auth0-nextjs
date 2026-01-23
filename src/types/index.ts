import { Database } from "@/types/supabase";

// export interface Coupon {
//   id: string;
//   title: string;
//   description: string;
//   short_description: string;
//   original_price: number;
//   discounted_price: number;
//   discount_percentage: number;
//   image_url: string;
//   category: Category;
//   expires_at: string;
//   terms_and_conditions: string;
//   is_active: boolean;
//   created_at: string;
//   updated_at: string;
//   quantity: number;
//   sold_count: number;
//   merchant_name: string;
//   merchant_logo?: string;
//   location?: string;
//   valid_from: string;
//   valid_until: string;
//   is_featured?: boolean;
// }

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  coupon_count: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: "admin" | "user";
  avatarUrl?: string;
  createdAt: string;
}

export interface PurchasedCoupon {
  id: string;
  couponId: string;
  // coupon: Coupon;
  userId: string;
  purchasedAt: string;
  code: string;
  isUsed: boolean;
  usedAt?: string;
  pdfUrl?: string;
}

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

export interface CouponFilters {
  search: string;
  category: string;
  priceRange: [number, number];
  sortBy: "newest" | "popular" | "price-low" | "price-high" | "discount";
  minDiscount?: number;
  verifiedOnly?: boolean;
  expiringSoon?: boolean;
}

export type Role = Database["public"]["Tables"]["roles"]["Row"];

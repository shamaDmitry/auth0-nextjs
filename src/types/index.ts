export interface Coupon {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  originalPrice: number;
  discountedPrice: number;
  discountPercentage: number;
  imageUrl: string;
  category: string;
  expiresAt: string;
  termsAndConditions: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  quantity: number;
  soldCount: number;
  merchantName: string;
  merchantLogo?: string;
  location?: string;
  validFrom: string;
  validUntil: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  couponCount: number;
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
  coupon: Coupon;
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

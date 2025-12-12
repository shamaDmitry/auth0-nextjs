import { Coupon, Category, PurchasedCoupon } from "@/types";

export const categories: Category[] = [
  {
    id: "1",
    name: "Restaurants",
    slug: "restaurants",
    icon: "🍽️",
    couponCount: 45,
  },
  {
    id: "2",
    name: "Beauty & Spa",
    slug: "beauty-spa",
    icon: "💆",
    couponCount: 32,
  },
  { id: "3", name: "Travel", slug: "travel", icon: "✈️", couponCount: 28 },
  {
    id: "4",
    name: "Entertainment",
    slug: "entertainment",
    icon: "🎭",
    couponCount: 56,
  },
  { id: "5", name: "Shopping", slug: "shopping", icon: "🛍️", couponCount: 89 },
  {
    id: "6",
    name: "Health & Fitness",
    slug: "health-fitness",
    icon: "💪",
    couponCount: 23,
  },
  {
    id: "7",
    name: "Education",
    slug: "education",
    icon: "📚",
    couponCount: 15,
  },
  {
    id: "8",
    name: "Electronics",
    slug: "electronics",
    icon: "📱",
    couponCount: 41,
  },
];

export const coupons: Coupon[] = [
  {
    id: "1",
    title: "50% Off Fine Dining Experience",
    description:
      "Enjoy an exquisite five-course meal at the renowned La Maison restaurant. This exclusive offer includes appetizers, main course, dessert, and a complimentary glass of wine. Perfect for special occasions or a romantic evening out.",
    shortDescription: "Five-course meal with wine at La Maison",
    originalPrice: 150,
    discountedPrice: 75,
    discountPercentage: 50,
    imageUrl:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800",
    category: "Restaurants",
    expiresAt: "2025-03-15",
    termsAndConditions:
      "Valid for dine-in only. Reservation required. Not valid on holidays. One coupon per table.",
    isActive: true,
    createdAt: "2024-12-01",
    updatedAt: "2024-12-01",
    quantity: 100,
    soldCount: 45,
    merchantName: "La Maison",
    location: "Downtown",
    validFrom: "2024-12-01",
    validUntil: "2025-03-15",
  },
  {
    id: "2",
    title: "Full Spa Day Package",
    description:
      "Treat yourself to a complete spa day including a 60-minute massage, facial treatment, sauna access, and a healthy lunch. Unwind and rejuvenate in our luxurious spa environment.",
    shortDescription: "Massage, facial, sauna & lunch",
    originalPrice: 200,
    discountedPrice: 99,
    discountPercentage: 51,
    imageUrl: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800",
    category: "Beauty & Spa",
    expiresAt: "2025-02-28",
    termsAndConditions:
      "Appointment required. 24-hour cancellation policy applies. Valid Monday-Thursday only.",
    isActive: true,
    createdAt: "2024-12-01",
    updatedAt: "2024-12-01",
    quantity: 50,
    soldCount: 23,
    merchantName: "Serenity Spa",
    location: "Wellness District",
    validFrom: "2024-12-01",
    validUntil: "2025-02-28",
  },
  {
    id: "3",
    title: "Weekend Getaway Package",
    description:
      "Escape for a weekend with this amazing hotel package. Includes 2 nights in a deluxe room, breakfast buffet, pool access, and late checkout. Perfect for a quick city break.",
    shortDescription: "2 nights hotel + breakfast + pool",
    originalPrice: 400,
    discountedPrice: 249,
    discountPercentage: 38,
    imageUrl:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
    category: "Travel",
    expiresAt: "2025-04-30",
    termsAndConditions:
      "Subject to availability. Blackout dates apply. Must book 7 days in advance.",
    isActive: true,
    createdAt: "2024-12-01",
    updatedAt: "2024-12-01",
    quantity: 30,
    soldCount: 12,
    merchantName: "Grand Hotel",
    location: "City Center",
    validFrom: "2024-12-01",
    validUntil: "2025-04-30",
  },
  {
    id: "4",
    title: "Movie Night Bundle",
    description:
      "Get 2 movie tickets, a large popcorn, and 2 drinks for an unbeatable price. Valid for any showing at Premium Cinemas locations.",
    shortDescription: "2 tickets + popcorn + drinks",
    originalPrice: 50,
    discountedPrice: 29,
    discountPercentage: 42,
    imageUrl:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800",
    category: "Entertainment",
    expiresAt: "2025-01-31",
    termsAndConditions:
      "Valid at participating locations. Not valid for premium formats (IMAX, 3D).",
    isActive: true,
    createdAt: "2024-12-01",
    updatedAt: "2024-12-01",
    quantity: 200,
    soldCount: 156,
    merchantName: "Premium Cinemas",
    location: "Multiple Locations",
    validFrom: "2024-12-01",
    validUntil: "2025-01-31",
  },
  {
    id: "5",
    title: "Designer Fashion Sale",
    description:
      "Get an exclusive 40% off on all designer items at Fashion Hub. From clothing to accessories, refresh your wardrobe with premium brands.",
    shortDescription: "40% off designer clothing & accessories",
    originalPrice: 300,
    discountedPrice: 180,
    discountPercentage: 40,
    imageUrl:
      "https://images.unsplash.com/photo-1445205170230-053b83016050?w=800",
    category: "Shopping",
    expiresAt: "2025-02-14",
    termsAndConditions:
      "In-store only. Cannot be combined with other offers. Excludes new arrivals.",
    isActive: true,
    createdAt: "2024-12-01",
    updatedAt: "2024-12-01",
    quantity: 75,
    soldCount: 34,
    merchantName: "Fashion Hub",
    location: "Fashion Mall",
    validFrom: "2024-12-01",
    validUntil: "2025-02-14",
  },
  {
    id: "6",
    title: "3-Month Gym Membership",
    description:
      "Start your fitness journey with a 3-month all-access gym membership. Includes group classes, personal training session, and nutrition consultation.",
    shortDescription: "Full gym access + PT session + nutrition",
    originalPrice: 180,
    discountedPrice: 99,
    discountPercentage: 45,
    imageUrl:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800",
    category: "Health & Fitness",
    expiresAt: "2025-03-31",
    termsAndConditions:
      "New members only. Must be 18+. Photo ID required for signup.",
    isActive: true,
    createdAt: "2024-12-01",
    updatedAt: "2024-12-01",
    quantity: 100,
    soldCount: 67,
    merchantName: "FitLife Gym",
    location: "Multiple Locations",
    validFrom: "2024-12-01",
    validUntil: "2025-03-31",
  },
  {
    id: "7",
    title: "Online Course Bundle",
    description:
      "Access 5 premium online courses covering web development, design, and marketing. Learn at your own pace with lifetime access.",
    shortDescription: "5 courses with lifetime access",
    originalPrice: 500,
    discountedPrice: 149,
    discountPercentage: 70,
    imageUrl:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800",
    category: "Education",
    expiresAt: "2025-06-30",
    termsAndConditions:
      "One account per purchase. Non-transferable. Courses delivered via email.",
    isActive: true,
    createdAt: "2024-12-01",
    updatedAt: "2024-12-01",
    quantity: 500,
    soldCount: 289,
    merchantName: "SkillUp Academy",
    validFrom: "2024-12-01",
    validUntil: "2025-06-30",
  },
  {
    id: "8",
    title: "Smart Watch Pro",
    description:
      "The latest Smart Watch Pro with heart rate monitoring, GPS, and 7-day battery life. Perfect for fitness enthusiasts and tech lovers.",
    shortDescription: "Premium smartwatch with health features",
    originalPrice: 350,
    discountedPrice: 249,
    discountPercentage: 29,
    imageUrl:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800",
    category: "Electronics",
    expiresAt: "2025-01-15",
    termsAndConditions:
      "Limited stock. Includes 1-year warranty. Free shipping on orders over $200.",
    isActive: true,
    createdAt: "2024-12-01",
    updatedAt: "2024-12-01",
    quantity: 50,
    soldCount: 38,
    merchantName: "TechZone",
    location: "Online",
    validFrom: "2024-12-01",
    validUntil: "2025-01-15",
  },
];

export const purchasedCoupons: PurchasedCoupon[] = [
  {
    id: "p1",
    couponId: "1",
    coupon: coupons[0],
    userId: "user1",
    purchasedAt: "2024-12-05",
    code: "DEAL-ABC123",
    isUsed: false,
    pdfUrl: "/coupons/deal-abc123.pdf",
  },
  {
    id: "p2",
    couponId: "4",
    coupon: coupons[3],
    userId: "user1",
    purchasedAt: "2024-12-03",
    code: "DEAL-XYZ789",
    isUsed: true,
    usedAt: "2024-12-08",
    pdfUrl: "/coupons/deal-xyz789.pdf",
  },
];

export const generateMoreCoupons = (count: number): Coupon[] => {
  const additionalCoupons: Coupon[] = [];
  const images = [
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800",
    "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800",
    "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=800",
    "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=800",
  ];

  for (let i = 0; i < count; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const discount = Math.floor(Math.random() * 50) + 20;
    const originalPrice = Math.floor(Math.random() * 400) + 50;

    additionalCoupons.push({
      id: `gen-${i}`,
      title: `Amazing ${category.name} Deal #${i + 1}`,
      description: `This is an incredible offer for ${category.name.toLowerCase()}. Don't miss out on this exclusive deal that brings you premium quality at an unbeatable price.`,
      shortDescription: `Special ${category.name} offer`,
      originalPrice,
      discountedPrice: Math.round(originalPrice * (1 - discount / 100)),
      discountPercentage: discount,
      imageUrl: images[i % images.length],
      category: category.name,
      expiresAt: "2025-03-15",
      termsAndConditions: "Standard terms apply. See merchant for details.",
      isActive: true,
      createdAt: "2024-12-01",
      updatedAt: "2024-12-01",
      quantity: 100,
      soldCount: Math.floor(Math.random() * 80),
      merchantName: `${category.name} Partner`,
      validFrom: "2024-12-01",
      validUntil: "2025-03-15",
    });
  }

  return additionalCoupons;
};

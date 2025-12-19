import { Coupon, Category, PurchasedCoupon } from "@/types";

export const categories: Category[] = [
  {
    id: "1",
    name: "Restaurants",
    slug: "restaurants",
    icon: "🍽️",
    coupon_count: 45,
  },
  {
    id: "2",
    name: "Beauty & Spa",
    slug: "beauty-spa",
    icon: "💆",
    coupon_count: 32,
  },
  { id: "3", name: "Travel", slug: "travel", icon: "✈️", coupon_count: 28 },
  {
    id: "4",
    name: "Entertainment",
    slug: "entertainment",
    icon: "🎭",
    coupon_count: 56,
  },
  { id: "5", name: "Shopping", slug: "shopping", icon: "🛍️", coupon_count: 89 },
  {
    id: "6",
    name: "Health & Fitness",
    slug: "health-fitness",
    icon: "💪",
    coupon_count: 23,
  },
  {
    id: "7",
    name: "Education",
    slug: "education",
    icon: "📚",
    coupon_count: 15,
  },
  {
    id: "8",
    name: "Electronics",
    slug: "electronics",
    icon: "📱",
    coupon_count: 41,
  },
];

export const coupons: Coupon[] = [
  {
    id: "1",
    title: "50% Off Fine Dining Experience",
    description:
      "Enjoy an exquisite five-course meal at the renowned La Maison restaurant. This exclusive offer includes appetizers, main course, dessert, and a complimentary glass of wine. Perfect for special occasions or a romantic evening out.",
    short_description: "Five-course meal with wine at La Maison",
    original_price: 150,
    discounted_price: 75,
    discount_percentage: 50,
    image_url:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800",
    category: "Restaurants",
    expires_at: "2025-03-15",
    terms_and_conditions:
      "Valid for dine-in only. Reservation required. Not valid on holidays. One coupon per table.",
    is_active: true,
    created_at: "2024-12-01",
    updated_at: "2024-12-01",
    quantity: 100,
    sold_count: 45,
    merchant_name: "La Maison",
    location: "Downtown",
    valid_from: "2024-12-01",
    valid_until: "2025-03-15",
  },
  {
    id: "2",
    title: "Full Spa Day Package",
    description:
      "Treat yourself to a complete spa day including a 60-minute massage, facial treatment, sauna access, and a healthy lunch. Unwind and rejuvenate in our luxurious spa environment.",
    short_description: "Massage, facial, sauna & lunch",
    original_price: 200,
    discounted_price: 99,
    discount_percentage: 51,
    image_url:
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800",
    category: "Beauty & Spa",
    expires_at: "2025-02-28",
    terms_and_conditions:
      "Appointment required. 24-hour cancellation policy applies. Valid Monday-Thursday only.",
    is_active: true,
    created_at: "2024-12-01",
    updated_at: "2024-12-01",
    quantity: 50,
    sold_count: 23,
    merchant_name: "Serenity Spa",
    location: "Wellness District",
    valid_from: "2024-12-01",
    valid_until: "2025-02-28",
  },
  {
    id: "3",
    title: "Weekend Getaway Package",
    description:
      "Escape for a weekend with this amazing hotel package. Includes 2 nights in a deluxe room, breakfast buffet, pool access, and late checkout. Perfect for a quick city break.",
    short_description: "2 nights hotel + breakfast + pool",
    original_price: 400,
    discounted_price: 249,
    discount_percentage: 38,
    image_url:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
    category: "Travel",
    expires_at: "2025-04-30",
    terms_and_conditions:
      "Subject to availability. Blackout dates apply. Must book 7 days in advance.",
    is_active: true,
    created_at: "2024-12-01",
    updated_at: "2024-12-01",
    quantity: 30,
    sold_count: 12,
    merchant_name: "Grand Hotel",
    location: "City Center",
    valid_from: "2024-12-01",
    valid_until: "2025-04-30",
  },
  {
    id: "4",
    title: "Movie Night Bundle",
    description:
      "Get 2 movie tickets, a large popcorn, and 2 drinks for an unbeatable price. Valid for any showing at Premium Cinemas locations.",
    short_description: "2 tickets + popcorn + drinks",
    original_price: 50,
    discounted_price: 29,
    discount_percentage: 42,
    image_url:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800",
    category: "Entertainment",
    expires_at: "2025-01-31",
    terms_and_conditions:
      "Valid at participating locations. Not valid for premium formats (IMAX, 3D).",
    is_active: true,
    created_at: "2024-12-01",
    updated_at: "2024-12-01",
    quantity: 200,
    sold_count: 156,
    merchant_name: "Premium Cinemas",
    location: "Multiple Locations",
    valid_from: "2024-12-01",
    valid_until: "2025-01-31",
  },
  {
    id: "5",
    title: "Designer Fashion Sale",
    description:
      "Get an exclusive 40% off on all designer items at Fashion Hub. From clothing to accessories, refresh your wardrobe with premium brands.",
    short_description: "40% off designer clothing & accessories",
    original_price: 300,
    discounted_price: 180,
    discount_percentage: 40,
    image_url:
      "https://images.unsplash.com/photo-1445205170230-053b83016050?w=800",
    category: "Shopping",
    expires_at: "2025-02-14",
    terms_and_conditions:
      "In-store only. Cannot be combined with other offers. Excludes new arrivals.",
    is_active: true,
    created_at: "2024-12-01",
    updated_at: "2024-12-01",
    quantity: 75,
    sold_count: 34,
    merchant_name: "Fashion Hub",
    location: "Fashion Mall",
    valid_from: "2024-12-01",
    valid_until: "2025-02-14",
  },
  {
    id: "6",
    title: "3-Month Gym Membership",
    description:
      "Start your fitness journey with a 3-month all-access gym membership. Includes group classes, personal training session, and nutrition consultation.",
    short_description: "Full gym access + PT session + nutrition",
    original_price: 180,
    discounted_price: 99,
    discount_percentage: 45,
    image_url:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800",
    category: "Health & Fitness",
    expires_at: "2025-03-31",
    terms_and_conditions:
      "New members only. Must be 18+. Photo ID required for signup.",
    is_active: true,
    created_at: "2024-12-01",
    updated_at: "2024-12-01",
    quantity: 100,
    sold_count: 67,
    merchant_name: "FitLife Gym",
    location: "Multiple Locations",
    valid_from: "2024-12-01",
    valid_until: "2025-03-31",
  },
  {
    id: "7",
    title: "Online Course Bundle",
    description:
      "Access 5 premium online courses covering web development, design, and marketing. Learn at your own pace with lifetime access.",
    short_description: "5 courses with lifetime access",
    original_price: 500,
    discounted_price: 149,
    discount_percentage: 70,
    image_url:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800",
    category: "Education",
    expires_at: "2025-06-30",
    terms_and_conditions:
      "One account per purchase. Non-transferable. Courses delivered via email.",
    is_active: true,
    created_at: "2024-12-01",
    updated_at: "2024-12-01",
    quantity: 500,
    sold_count: 289,
    merchant_name: "SkillUp Academy",
    location: "Online",
    valid_from: "2024-12-01",
    valid_until: "2025-06-30",
  },
  {
    id: "8",
    title: "Smart Watch Pro",
    description:
      "The latest Smart Watch Pro with heart rate monitoring, GPS, and 7-day battery life. Perfect for fitness enthusiasts and tech lovers.",
    short_description: "Premium smartwatch with health features",
    original_price: 350,
    discounted_price: 249,
    discount_percentage: 29,
    image_url:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800",
    category: "Electronics",
    expires_at: "2025-01-15",
    terms_and_conditions:
      "Limited stock. Includes 1-year warranty. Free shipping on orders over $200.",
    is_active: true,
    created_at: "2024-12-01",
    updated_at: "2024-12-01",
    quantity: 50,
    sold_count: 38,
    merchant_name: "TechZone",
    location: "Online",
    valid_from: "2024-12-01",
    valid_until: "2025-01-15",
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
      short_description: `Special ${category.name} offer`,
      original_price: originalPrice,
      discounted_price: Math.round(originalPrice * (1 - discount / 100)),
      discount_percentage: discount,
      image_url: images[i % images.length],
      category: category.name,
      expires_at: "2025-03-15",
      terms_and_conditions: "Standard terms apply. See merchant for details.",
      is_active: true,
      created_at: "2024-12-01",
      updated_at: "2024-12-01",
      quantity: 100,
      sold_count: Math.floor(Math.random() * 80),
      merchant_name: `${category.name} Partner`,
      valid_from: "2024-12-01",
      valid_until: "2025-03-15",
    });
  }

  return additionalCoupons;
};

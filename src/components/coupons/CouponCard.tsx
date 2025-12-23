import { Coupon } from "@/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, ShoppingCart } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface CouponCardProps {
  coupon: Coupon;
}

export function CouponCard({ coupon }: CouponCardProps) {
  const daysLeft = Math.ceil(
    (new Date(coupon.expires_at).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="group overflow-hidden rounded-xl border border-border bg-card shadow-card transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-2xl">
      {/* Image */}
      <div className="relative aspect-4/3 overflow-hidden">
        <Image
          width={200}
          height={200}
          src={coupon.image_url}
          alt={coupon.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Discount Badge */}
        <div className="absolute left-3 top-3">
          <Badge className="bg-primary text-primary-foreground shadow-lg">
            -{coupon.discount_percentage}%
          </Badge>
        </div>

        {/* Category Badge */}
        <div className="absolute right-3 top-3">
          <Badge
            variant="secondary"
            className="bg-background/90 backdrop-blur-sm"
          >
            <span className="mr-1">{coupon.category.icon}</span>
            {coupon.category.name}
          </Badge>
        </div>

        {/* Quick Buy Overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-foreground/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <Button asChild size="lg">
            <Link href={`/coupons/${coupon.id}`}>
              <ShoppingCart className="mr-2 h-4 w-4" />
              View Deal
            </Link>
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Merchant */}
        <p className="mb-1 text-sm font-medium text-primary">
          {coupon.merchant_name}
        </p>

        {/* Title */}
        <Link href={`/coupons/${coupon.id}`}>
          <h3 className="mb-2 line-clamp-2 font-semibold transition-colors hover:text-primary">
            {coupon.title}
          </h3>
        </Link>

        {/* Short Description */}
        <p className="mb-3 line-clamp-2 text-sm text-muted-foreground">
          {coupon.short_description}
        </p>

        {/* Meta Info */}
        <div className="mb-4 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
          {coupon.location && (
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {coupon.location}
            </span>
          )}
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {daysLeft > 0 ? `${daysLeft} days left` : "Expires soon"}
          </span>
        </div>

        {/* Price */}
        <div className="flex items-end justify-between">
          <div>
            <span className="text-sm text-muted-foreground line-through">
              ${coupon.original_price}
            </span>
            <span className="ml-2 text-2xl font-bold text-primary">
              ${coupon.discounted_price}
            </span>
          </div>

          <Button asChild size="sm">
            <Link href={`/coupons/${coupon.id}`}>Buy Now</Link>
          </Button>
        </div>

        {/* Sold Count */}
        <div className="mt-3 flex items-center justify-between border-t border-border pt-3 text-xs text-muted-foreground">
          <span>{coupon.sold_count} bought</span>
          <span>{coupon.quantity - coupon.sold_count} remaining</span>
        </div>
      </div>
    </div>
  );
}

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { CouponCard } from "@/components/coupons/CouponCard";
import { Database } from "@/types/supabase";

export function FeaturedDeals({
  featuredCoupons,
}: {
  featuredCoupons: Database["public"]["Tables"]["coupons"]["Row"][];
}) {
  return (
    <section className="bg-muted/30 py-16">
      <div className="container mx-auto px-4">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <h2 className="mb-3 text-3xl font-bold">Featured Deals</h2>
            <p className="text-muted-foreground">
              Hand-picked offers you don&apos;t want to miss
            </p>
          </div>

          <Button asChild variant="ghost" className="gap-2">
            <Link href="/coupons">
              View All
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredCoupons.map((coupon, index) => (
            <div
              key={coupon.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CouponCard coupon={coupon} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

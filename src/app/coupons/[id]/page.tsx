"use client";

import {
  ArrowLeft,
  Calendar,
  CheckCircle,
  Clock,
  Heart,
  MapPin,
  Share2,
  Shield,
  ShoppingCart,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";
import { Coupon } from "@/types";
import { Spinner } from "@/components/ui/spinner";

const CouponDetailsPage = () => {
  // const { isAuthenticated, login } = useAuth();
  const { id } = useParams();
  const supabase = createClient();
  const [coupon, setCoupon] = useState<Coupon | null>(null);
  const [isCouponLoading, setIsCouponLoading] = useState(true);

  useEffect(() => {
    setIsCouponLoading(true);

    const fetchCoupon = async () => {
      const { data, error } = await supabase
        .from("coupons")
        .select("*, category(name)")
        .eq("id", id)
        .single();

      if (error) {
        console.error(error);
      } else {
        setCoupon(data);
      }

      setIsCouponLoading(false);
    };

    fetchCoupon();
  }, [supabase, id]);

  if (isCouponLoading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <Spinner />
      </div>
    );
  }

  if (!coupon) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="mb-4 text-2xl font-bold">Coupon not found</h1>

        <Button asChild>
          <Link href="/coupons">Browse All Coupons</Link>
        </Button>
      </div>
    );
  }

  const daysLeft = Math.ceil(
    (new Date(coupon.expires_at).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
  );

  const handleBuy = () => {
    // if (!isAuthenticated) {
    //   login();
    //   return;
    // }

    toast("You will be redirected to complete your purchase with Stripe.");
    // TODO: Integrate with Stripe
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link
          href="/coupons"
          className="inline-flex items-center text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to All Deals
        </Link>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="relative mb-6 overflow-hidden rounded-xl">
            <Image
              width={1000}
              height={500}
              src={coupon.image_url}
              alt={coupon.title}
              className="aspect-video w-full object-cover"
            />
            <div className="absolute left-4 top-4">
              <Badge className="bg-primary text-lg text-primary-foreground shadow-lg">
                -{coupon.discount_percentage}% OFF
              </Badge>
            </div>
          </div>

          <div className="mb-6">
            <div className="mb-2 flex items-center gap-2">
              <Badge>{coupon.category.name}</Badge>

              {coupon.location && (
                <span className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="mr-1 h-4 w-4" />
                  {coupon.location}
                </span>
              )}
            </div>

            <h1 className="mb-2 text-3xl font-bold">{coupon.title}</h1>

            <p className="text-lg text-primary">{coupon.merchant_name}</p>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>About This Deal</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{coupon.description}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Terms & Conditions</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {coupon?.terms_and_conditions}
              </p>

              <Separator className="my-4" />

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-primary" />

                  <span>
                    Valid from:{" "}
                    {new Date(coupon.valid_from).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-primary" />

                  <span>
                    Valid until:{" "}
                    {new Date(coupon.valid_until).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <Card className="shadow-lg">
              <CardContent className="p-6">
                <div className="mb-6 text-center">
                  <div className="mb-1 text-lg text-muted-foreground line-through">
                    ${coupon.original_price}
                  </div>

                  <div className="text-4xl font-bold text-primary">
                    ${coupon.discounted_price}
                  </div>

                  <div className="mt-1 text-sm text-success">
                    You save ${coupon.original_price - coupon.discounted_price}
                  </div>
                </div>

                <Button size="lg" className="mb-4 w-full" onClick={handleBuy}>
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Buy Now
                </Button>

                <div className="mb-6 flex gap-2">
                  <Button variant="outline" className="flex-1">
                    <Heart className="mr-2 h-4 w-4" />
                    Save
                  </Button>

                  <Button variant="outline" className="flex-1">
                    <Share2 className="mr-2 h-4 w-4" />
                    Share
                  </Button>
                </div>

                <Separator className="mb-6" />

                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Sold</span>

                    <span className="font-semibold">{coupon.sold_count}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Remaining</span>

                    <span className="font-semibold">
                      {coupon.quantity - coupon.sold_count}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="flex items-center text-muted-foreground">
                      <Clock className="mr-1 h-4 w-4" />
                      Time left
                    </span>

                    <span className="font-semibold text-primary">
                      {daysLeft > 0 ? `${daysLeft} days` : "Expires soon"}
                    </span>
                  </div>
                </div>

                <Separator className="my-6" />

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Shield className="h-4 w-4 text-success" />
                    Secure payment with Stripe
                  </div>

                  <div className="flex items-center gap-2 text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-success" />
                    Instant delivery to email
                  </div>

                  <div className="flex items-center gap-2 text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-success" />
                    Downloadable PDF coupon
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CouponDetailsPage;

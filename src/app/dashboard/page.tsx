import { Card, CardContent } from "@/components/ui/card";
import {
  Calendar,
  CheckCircle,
  Clock,
  Download,
  ExternalLink,
  ShoppingBag,
  Ticket,
} from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { purchasedCoupons } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default async function Dashboard() {
  const user = { name: "John Doe" };

  const activeCoupons = purchasedCoupons.filter((p) => !p.isUsed);
  const usedCoupons = purchasedCoupons.filter((p) => p.isUsed);

  return (
    <div className="container mx-auto p-4">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">My Coupons</h1>
        <p className="text-muted-foreground">
          Welcome back, {user?.name}! Manage your purchased coupons here.
        </p>
      </div>

      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Ticket className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">{10}</p>
              <p className="text-sm text-muted-foreground">Total Coupons</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-success/10">
              <CheckCircle className="h-6 w-6 text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold">{5}</p>
              <p className="text-sm text-muted-foreground">Active</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
              <Clock className="h-6 w-6 text-muted-foreground" />
            </div>
            <div>
              <p className="text-2xl font-bold">{5}</p>
              <p className="text-sm text-muted-foreground">Used</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="active" className="space-y-6">
        <TabsList>
          <TabsTrigger value="active">
            Active ({activeCoupons.length})
          </TabsTrigger>
          <TabsTrigger value="used">Used ({usedCoupons.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          {activeCoupons.length > 0 ? (
            activeCoupons.map((purchase) => (
              <CouponPurchaseCard key={purchase.id} purchase={purchase} />
            ))
          ) : (
            <EmptyState />
          )}
        </TabsContent>

        <TabsContent value="used" className="space-y-4">
          {usedCoupons.length > 0 ? (
            usedCoupons.map((purchase) => (
              <CouponPurchaseCard key={purchase.id} purchase={purchase} />
            ))
          ) : (
            <div className="py-10 text-center text-muted-foreground">
              No used coupons yet.
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

function CouponPurchaseCard({
  purchase,
}: {
  purchase: (typeof purchasedCoupons)[0];
}) {
  const { coupon } = purchase;

  return (
    <Card className="overflow-hidden">
      <div className="flex flex-col sm:flex-row">
        {/* Image */}
        <div className="relative w-full sm:w-48">
          <Image
            src={coupon.imageUrl}
            alt={coupon.title}
            className="h-40 w-full object-cover sm:h-full"
          />
          {purchase.isUsed && (
            <div className="absolute inset-0 flex items-center justify-center bg-foreground/60">
              <Badge variant="secondary" className="text-lg">
                Used
              </Badge>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-4 sm:p-6">
          <div className="mb-2 flex items-start justify-between">
            <div>
              <Badge className="mb-2">{coupon.category}</Badge>
              <h3 className="text-lg font-semibold">{coupon.title}</h3>
              <p className="text-sm text-muted-foreground">
                {coupon.merchantName}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Coupon Code</p>
              <p className="font-mono text-lg font-bold text-primary">
                {purchase.code}
              </p>
            </div>
          </div>

          <div className="mb-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              Purchased: {new Date(purchase.purchasedAt).toLocaleDateString()}
            </span>

            {purchase.usedAt && (
              <span className="flex items-center gap-1">
                <CheckCircle className="h-4 w-4" />
                Used: {new Date(purchase.usedAt).toLocaleDateString()}
              </span>
            )}
          </div>

          <div className="mt-auto flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Download PDF
            </Button>

            <Link href={`/coupons/${coupon.id}`}>
              <Button variant="ghost" size="sm">
                <ExternalLink className="mr-2 h-4 w-4" />
                View Deal
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Card>
  );
}

function EmptyState() {
  return (
    <div className="py-20 text-center">
      <ShoppingBag className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
      <h3 className="mb-2 text-lg font-semibold">No coupons yet</h3>
      <p className="mb-4 text-muted-foreground">
        Start browsing and buy your first coupon!
      </p>

      <Link href="/coupons">
        <Button>Browse Coupons</Button>
      </Link>
    </div>
  );
}

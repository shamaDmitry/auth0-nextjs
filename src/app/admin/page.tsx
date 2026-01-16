import { isUserAdmin } from "@/actions/isUserAdmin";
import CouponModalButton from "@/components/admin/CouponModalButton";
import CouponTable from "@/components/admin/CouponTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { auth0 } from "@/lib/auth0";
import { protectRoute } from "@/lib/supabase/roles";
import { createClient } from "@/lib/supabase/server";
import { Coupon } from "@/types";
import { DollarSign, Ticket, TrendingUp, Users } from "lucide-react";
import { redirect } from "next/navigation";

async function AdminPage() {
  const supabase = await createClient();
  await protectRoute("admin");

  // const isAdmin = await isUserAdmin();

  // if (!isAdmin) {
  //   return redirect("/unauthorized");
  // }

  // const session = await auth0.getSession();
  const { data: coupons } = await supabase
    .from("coupons")
    .select("*, category(name, icon, slug, id)");

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between relative">
        <div>
          <h1 className="mb-2 text-3xl font-bold">
            Admin Dashboard{" "}
            {/* <span className="underline">{session?.user?.name}</span> */}
          </h1>

          <p className="text-muted-foreground">
            Manage your coupons and view analytics
          </p>
        </div>

        <CouponModalButton />
      </div>

      <div className="mb-8 grid gap-4 sm:grid-cols-4">
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Ticket className="h-6 w-6 text-primary" />
            </div>

            <div>
              <p className="text-2xl font-bold">22</p>
              <p className="text-sm text-muted-foreground">Total Coupons</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-success/20">
              <TrendingUp className="h-6 w-6 text-success" />
            </div>

            <div>
              <p className="text-2xl font-bold">1,234</p>
              <p className="text-sm text-muted-foreground">Total Sold</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/40">
              <DollarSign className="h-6 w-6 text-accent-foreground" />
            </div>

            <div>
              <p className="text-2xl font-bold">$12,345.67</p>

              <p className="text-sm text-muted-foreground">Total Revenue</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/10">
              <Users className="h-6 w-6 text-secondary-foreground" />
            </div>

            <div>
              <p className="text-2xl font-bold">1,234</p>
              <p className="text-sm text-muted-foreground">Total Users</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Coupons</CardTitle>
        </CardHeader>

        <CardContent>
          <CouponTable coupons={coupons} />
        </CardContent>
      </Card>
    </div>
  );
}

export default AdminPage;

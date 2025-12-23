import { auth0 } from "@/lib/auth0";

export default async function Dashboard() {
  const session = await auth0.getSession();
  const user = session?.user;

  return (
    <div className="container mx-auto p-4">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">My Coupons</h1>
        <p className="text-muted-foreground">
          Welcome back, {user?.name}! Manage your purchased coupons here.
        </p>
      </div>
    </div>
  );
}

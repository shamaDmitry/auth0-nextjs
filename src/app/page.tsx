// import { auth0 } from "@/lib/auth0";

import { CategorySection } from "@/components/home/CategorySection";
import { FeaturedDeals } from "@/components/home/FeaturedDeals";
import { HeroSection } from "@/components/home/HeroSection";

export default async function Home() {
  // const session = await auth0.getSession();
  // const user = session?.user;

  return (
    <div className="container mx-auto p-4">
      <HeroSection />

      <CategorySection />

      <FeaturedDeals />
    </div>
  );
}

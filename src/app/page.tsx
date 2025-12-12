// import { auth0 } from "@/lib/auth0";

import HeroSection from "@/components/home/HeroSection";

export default async function Home() {
  // const session = await auth0.getSession();
  // const user = session?.user;

  return (
    <div className="container mx-auto p-4">
      <HeroSection />
    </div>
  );
}

import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Sparkles, TrendingUp } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-hero py-20 lg:py-32">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-1/4 -top-1/4 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-1/4 -left-1/4 h-96 w-96 rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex animate-fade-in items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm">
            <Sparkles className="h-4 w-4 text-primary" />

            <span className="font-medium text-primary">
              New deals added daily
            </span>
          </div>

          <h1
            className="mb-6 text-4xl font-extrabold leading-tight tracking-tight md:text-5xl lg:text-6xl animate-fade-in"
            style={{ animationDelay: "100ms" }}
          >
            Discover Amazing
            <span className="text-brand-warm"> Deals </span>
            Near You
          </h1>

          <p
            className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground md:text-xl animate-fade-in"
            style={{ animationDelay: "200ms" }}
          >
            Save up to 70% on restaurants, spas, travel, and more. Join
            thousands of smart shoppers who never pay full price.
          </p>

          <div
            className="flex flex-col justify-center gap-4 sm:flex-row animate-fade-in"
            style={{ animationDelay: "300ms" }}
          >
            <Link href="/coupons">
              <Button>
                Browse All Deals
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>

            <Button variant="outline">How It Works</Button>
          </div>

          <div
            className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground animate-fade-in"
            style={{ animationDelay: "400ms" }}
          >
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-success" />
              <span>50,000+ deals redeemed</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              <span>Secure payments</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-accent" />
              <span>500+ trusted merchants</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

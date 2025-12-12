import { Mail, MapPin, Phone, Ticket } from "lucide-react";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-xl font-bold"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-primary">
                <Ticket className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-gradient-primary">CouponHub</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Discover amazing deals and save money on your favorite products
              and services.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link
                  href="/coupons"
                  className="transition-colors hover:text-primary"
                >
                  Browse Coupons
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="transition-colors hover:text-primary"
                >
                  My Account
                </Link>
              </li>
              <li>
                <Link href="#" className="transition-colors hover:text-primary">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="#" className="transition-colors hover:text-primary">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="mb-4 font-semibold">Categories</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link
                  href="/coupons?category=restaurants"
                  className="transition-colors hover:text-primary"
                >
                  Restaurants
                </Link>
              </li>
              <li>
                <Link
                  href="/coupons?category=beauty-spa"
                  className="transition-colors hover:text-primary"
                >
                  Beauty & Spa
                </Link>
              </li>
              <li>
                <Link
                  href="/coupons?category=travel"
                  className="transition-colors hover:text-primary"
                >
                  Travel
                </Link>
              </li>
              <li>
                <Link
                  href="/coupons?category=shopping"
                  className="transition-colors hover:text-primary"
                >
                  Shopping
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 font-semibold">Contact Us</h3>

            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                support@couponhub.com
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                1-800-COUPONS
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                San Francisco, CA
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © 2024 CouponHub. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <Link href="#" className="transition-colors hover:text-primary">
              Privacy Policy
            </Link>
            <Link href="#" className="transition-colors hover:text-primary">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

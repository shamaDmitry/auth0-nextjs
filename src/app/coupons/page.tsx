"use client";

import CouponFilters from "@/components/coupons/CouponFilters";
import { useState } from "react";
import { CouponFilters as FilterType } from "@/types";

const CouponsPage = () => {
  const initialCategory = "";

  const [filters, setFilters] = useState<FilterType>({
    search: "",
    category: initialCategory,
    priceRange: [0, 1000],
    sortBy: "newest",
  });

  const handleFiltersChange = (newFilters: FilterType) => {
    setFilters(newFilters);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">All Deals</h1>
        <p className="text-muted-foreground">
          Discover 11 amazing deals waiting for you
        </p>
      </div>

      <div className="mb-8">
        <CouponFilters
          filters={filters}
          onFiltersChange={handleFiltersChange}
        />
      </div>
    </div>
  );
};

export default CouponsPage;

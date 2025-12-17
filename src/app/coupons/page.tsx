"use client";

import CouponFilters from "@/components/coupons/CouponFilters";
import { useMemo, useState } from "react";
import { CouponFilters as FilterType, PaginationInfo } from "@/types";
import {
  coupons as allCoupons,
  generateMoreCoupons,
  categories,
} from "@/data/mockData";
import { CouponCard } from "@/components/coupons/CouponCard";
import { CouponsPagination } from "@/components/coupons/CouponsPagination";

const extendedCoupons = [...allCoupons, ...generateMoreCoupons(40)];

const ITEMS_PER_PAGE = 8;

const CouponsPage = () => {
  const initialCategory = "";

  const [filters, setFilters] = useState<FilterType>({
    search: "",
    category: initialCategory,
    priceRange: [0, 1000],
    sortBy: "newest",
    minDiscount: 0,
    verifiedOnly: false,
    expiringSoon: false,
  });

  const [currentPage, setCurrentPage] = useState(1);

  const filteredCoupons = useMemo(() => {
    let result = [...extendedCoupons];

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(
        (coupon) =>
          coupon.title.toLowerCase().includes(searchLower) ||
          coupon.description.toLowerCase().includes(searchLower) ||
          coupon.merchantName.toLowerCase().includes(searchLower)
      );
    }

    // Category filter
    if (filters.category) {
      const categoryName = categories.find(
        (c) => c.slug === filters.category
      )?.name;

      if (categoryName) {
        result = result.filter((coupon) => coupon.category === categoryName);
      }
    }

    // Price range filter
    result = result.filter(
      (coupon) =>
        coupon.discountedPrice >= filters.priceRange[0] &&
        coupon.discountedPrice <= filters.priceRange[1]
    );

    // Minimum discount filter
    if (filters.minDiscount && filters.minDiscount > 0) {
      result = result.filter(
        (coupon) => coupon.discountPercentage >= filters.minDiscount!
      );
    }

    if (filters.verifiedOnly) {
      result = result.filter((coupon) => coupon.soldCount >= 10);
    }

    // Expiring soon filter (within 7 days)
    if (filters.expiringSoon) {
      const sevenDaysFromNow = new Date();

      sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 7);

      result = result.filter((coupon) => {
        const expiryDate = new Date(coupon.expiresAt);

        return expiryDate <= sevenDaysFromNow && expiryDate >= new Date();
      });
    }

    // Sort
    switch (filters.sortBy) {
      case "newest":
        result.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      case "popular":
        result.sort((a, b) => b.soldCount - a.soldCount);
        break;
      case "price-low":
        result.sort((a, b) => a.discountedPrice - b.discountedPrice);
        break;
      case "price-high":
        result.sort((a, b) => b.discountedPrice - a.discountedPrice);
        break;
      case "discount":
        result.sort((a, b) => b.discountPercentage - a.discountPercentage);
        break;
    }

    return result;
  }, [filters]);

  const totalPages = Math.ceil(filteredCoupons.length / ITEMS_PER_PAGE);

  const paginatedCoupons = filteredCoupons.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const pagination: PaginationInfo = {
    currentPage,
    totalPages,
    totalItems: filteredCoupons.length,
    itemsPerPage: ITEMS_PER_PAGE,
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleFiltersChange = (newFilters: FilterType) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">All Deals</h1>
        <p className="text-muted-foreground">
          Discover{" "}
          <span className="font-bold text-primary">
            {filteredCoupons.length}
          </span>{" "}
          amazing deals waiting for you
        </p>
      </div>

      <div className="mb-8">
        <CouponFilters
          filters={filters}
          onFiltersChange={(newFilters) => {
            return handleFiltersChange(newFilters);
          }}
        />
      </div>

      {paginatedCoupons.length > 0 ? (
        <>
          <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {paginatedCoupons.map((coupon, index) => (
              <div
                key={coupon.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <CouponCard coupon={coupon} />
              </div>
            ))}
          </div>

          <CouponsPagination
            pagination={pagination}
            onPageChange={handlePageChange}
          />
        </>
      ) : (
        <div className="py-20 text-center">
          <p className="text-lg text-muted-foreground">
            No coupons found matching your criteria.
          </p>
        </div>
      )}
    </div>
  );
};

export default CouponsPage;

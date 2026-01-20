"use client";

import CouponFilters from "@/components/coupons/CouponFilters";
import { useEffect, useMemo, useState } from "react";
import { CouponFilters as FilterType, PaginationInfo } from "@/types";

import { CouponCard } from "@/components/coupons/CouponCard";
import { CouponsPagination } from "@/components/coupons/CouponsPagination";
import { createClient } from "@/lib/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { Database } from "@/types/supabase";

const ITEMS_PER_PAGE = 4;

const CouponsPage = () => {
  const initialCategory = "";
  const supabase = createClient();

  const [categories, setCategories] = useState<
    Database["public"]["Tables"]["categories"]["Row"][]
  >([]);
  const [isCategoriesLoading, setIsCategoriesLoading] = useState(true);

  const [coupons, setCoupons] = useState<
    Database["public"]["Tables"]["coupons"]["Row"][]
  >([]);

  const [isCouponsLoading, setIsCouponsLoading] = useState(true);

  useEffect(() => {
    setIsCategoriesLoading(true);
    setIsCouponsLoading(true);

    const fetchCaregories = async () => {
      const { data, error } = await supabase.from("categories").select("*");

      if (error) {
        console.error(error);
      } else {
        setCategories(data);
      }

      setIsCategoriesLoading(false);
    };

    const fetchCoupons = async () => {
      const { data, error } = await supabase
        .from("coupons")
        .select("*, category(name, icon)");

      if (error) {
        console.error(error);
      } else {
        setCoupons(data);
      }

      setIsCouponsLoading(false);
    };

    fetchCoupons();
    fetchCaregories();
  }, [supabase]);

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
    let result = [...coupons];

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(
        (coupon) =>
          coupon.title.toLowerCase().includes(searchLower) ||
          coupon.description.toLowerCase().includes(searchLower) ||
          coupon.merchant_name.toLowerCase().includes(searchLower)
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
        coupon.discounted_price >= filters.priceRange[0] &&
        coupon.discounted_price <= filters.priceRange[1]
    );

    // Minimum discount filter
    if (filters.minDiscount && filters.minDiscount > 0) {
      result = result.filter(
        (coupon) => coupon.discount_percentage >= filters.minDiscount!
      );
    }

    if (filters.verifiedOnly) {
      result = result.filter((coupon) => coupon.sold_count >= 10);
    }

    // Expiring soon filter (within 7 days)
    if (filters.expiringSoon) {
      const sevenDaysFromNow = new Date();

      sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 7);

      result = result.filter((coupon) => {
        const expiryDate = new Date(coupon.expires_at || "");

        return expiryDate <= sevenDaysFromNow && expiryDate >= new Date();
      });
    }

    // Sort
    switch (filters.sortBy) {
      case "newest":
        result.sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
        break;
      case "popular":
        result.sort((a, b) => b.sold_count - a.sold_count);
        break;
      case "price-low":
        result.sort((a, b) => a.discounted_price - b.discounted_price);
        break;
      case "price-high":
        result.sort((a, b) => b.discounted_price - a.discounted_price);
        break;
      case "discount":
        result.sort((a, b) => b.discount_percentage - a.discount_percentage);
        break;
    }

    return result;
  }, [coupons, filters, categories]);

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
          loading={isCategoriesLoading}
          categories={categories}
          filters={filters}
          onFiltersChange={(newFilters) => {
            handleFiltersChange(newFilters);
          }}
        />
      </div>

      {isCouponsLoading && paginatedCoupons.length === 0 && (
        <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <Skeleton />
        </div>
      )}

      {paginatedCoupons.length > 0 ? (
        <>
          <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {paginatedCoupons.map((coupon, index) => (
              <div
                key={coupon.id}
                className="animate"
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

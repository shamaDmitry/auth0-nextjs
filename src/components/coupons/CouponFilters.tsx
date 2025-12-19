"use client";

import React, { FC, useState } from "react";
import { Category, CouponFilters as FilterType } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";
// import { categories } from "@/data/mockData";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
interface CouponFiltersProps {
  loading: boolean;
  filters: FilterType;
  categories: Category[];
  onFiltersChange: (filters: FilterType) => void;
}

const CouponFilters: FC<CouponFiltersProps> = ({
  loading,
  filters,
  categories,
  onFiltersChange,
}) => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleSearchChange = (value: string) => {
    onFiltersChange({ ...filters, search: value });
  };

  const handleCategoryChange = (category: string) => {
    onFiltersChange({ ...filters, category });
  };

  const handleSortChange = (sortBy: FilterType["sortBy"]) => {
    onFiltersChange({ ...filters, sortBy });
  };

  const handlePriceRangeChange = (value: number[]) => {
    onFiltersChange({ ...filters, priceRange: [value[0], value[1]] });
  };

  const handleMinDiscountChange = (value: number) => {
    onFiltersChange({ ...filters, minDiscount: value });
  };

  const handleVerifiedOnlyChange = (checked: boolean) => {
    onFiltersChange({ ...filters, verifiedOnly: checked });
  };

  const handleExpiringOnlyChange = (checked: boolean) => {
    onFiltersChange({ ...filters, expiringSoon: checked });
  };

  const clearFilters = () => {
    onFiltersChange({
      search: "",
      category: "",
      priceRange: [0, 1000],
      sortBy: "newest",
      minDiscount: 0,
      verifiedOnly: false,
      expiringSoon: false,
    });
  };

  const hasActiveFilters =
    filters.search ||
    filters.category ||
    filters.minDiscount ||
    filters.verifiedOnly ||
    filters.expiringSoon;

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            placeholder="Search coupons..."
            value={filters.search}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>

        <Select value={filters.sortBy} onValueChange={handleSortChange}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="popular">Most Popular</SelectItem>
            <SelectItem value="price-low">Price: Low to High</SelectItem>
            <SelectItem value="price-high">Price: High to Low</SelectItem>
            <SelectItem value="discount">Biggest Discount</SelectItem>
          </SelectContent>
        </Select>

        <Button
          variant="outline"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="gap-2"
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filters
        </Button>
      </div>

      {showAdvanced && (
        <div className="rounded-lg border bg-card p-4 space-y-6 animate-in slide-in-from-top-2 duration-200">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-3">
              <div className="flex gap-3 items-center">
                <Label className="text-sm font-medium whitespace-nowrap">
                  Price Range
                </Label>

                <Slider
                  value={filters.priceRange}
                  onValueChange={handlePriceRangeChange}
                  max={1000}
                  min={0}
                  step={10}
                  className="w-full"
                />

                <Button
                  variant={"destructive"}
                  size={"icon-xs"}
                  onClick={() =>
                    onFiltersChange({
                      ...filters,
                      priceRange: [0, 1000],
                    })
                  }
                >
                  <X />
                </Button>
              </div>

              <div className="flex justify-between text-sm text-muted-foreground">
                <span>${filters.priceRange[0]}</span>
                <span>${filters.priceRange[1]}</span>
              </div>
            </div>

            <div className="space-y-3">
              <Label className="text-sm font-medium">Minimum Discount</Label>

              <Slider
                value={[filters.minDiscount || 0]}
                onValueChange={(value) => handleMinDiscountChange(value[0])}
                max={90}
                min={0}
                step={5}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>{filters.minDiscount || 0}% off or more</span>
              </div>
            </div>

            <div className="space-y-4">
              <Label className="text-sm font-medium">Additional Filters</Label>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="verified"
                    checked={filters.verifiedOnly || false}
                    onCheckedChange={handleVerifiedOnlyChange}
                  />
                  <Label htmlFor="verified" className="text-sm cursor-pointer">
                    Verified deals only
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="expiring"
                    checked={filters.expiringSoon || false}
                    onCheckedChange={handleExpiringOnlyChange}
                  />
                  <Label htmlFor="expiring" className="text-sm cursor-pointer">
                    Expiring soon (within 7 days)
                  </Label>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        <Badge
          variant={!filters.category ? "default" : "outline"}
          className="cursor-pointer transition-colors hover:bg-primary hover:text-primary-foreground"
          onClick={() => handleCategoryChange("")}
        >
          All
        </Badge>

        {loading &&
          new Array(5)
            .fill(0)
            .map((item, index) => (
              <Skeleton
                key={index}
                className="h-5 w-24 rounded-full bg-primary/30"
              />
            ))}

        {!loading &&
          categories.map((category) => (
            <Badge
              key={category.id}
              variant={
                filters.category === category.slug ? "default" : "outline"
              }
              className="cursor-pointer transition-colors hover:bg-primary hover:text-primary-foreground"
              onClick={() => handleCategoryChange(category.slug)}
            >
              <span className="mr-1">{category.icon}</span>
              {category.name}
            </Badge>
          ))}
      </div>

      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-muted-foreground">Active filters:</span>

          {filters.search && (
            <Badge variant="secondary" className="gap-1">
              Search: {filters.search}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => handleSearchChange("")}
              />
            </Badge>
          )}

          {filters.category && (
            <Badge variant="secondary" className="gap-1">
              {categories.find((c) => c.slug === filters.category)?.name}

              <Button
                className="size-5"
                variant={"destructive"}
                size={"icon-sm"}
                onClick={() => handleCategoryChange("")}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}

          {(filters.priceRange[0] > 0 || filters.priceRange[1] < 1000) && (
            <Badge variant="secondary" className="gap-1">
              ${filters.priceRange[0]} - ${filters.priceRange[1]}
              <Button
                className="size-5"
                variant={"destructive"}
                size={"icon-sm"}
                onClick={() => handlePriceRangeChange([0, 1000])}
              >
                <X className="h-3 w-3 cursor-pointer" />
              </Button>
            </Badge>
          )}

          {filters.minDiscount && filters.minDiscount > 0 ? (
            <Badge variant="secondary" className="gap-1">
              {filters.minDiscount}%+ off
              <Button
                className="size-5"
                variant={"destructive"}
                size={"icon-sm"}
                onClick={() => handleMinDiscountChange(0)}
              >
                <X className="h-3 w-3 cursor-pointer" />
              </Button>
            </Badge>
          ) : null}

          {filters.verifiedOnly && (
            <Badge variant="secondary" className="gap-1">
              Verified only
              <Button
                className="size-5"
                variant={"destructive"}
                size={"icon-sm"}
                onClick={() => handleVerifiedOnlyChange(false)}
              >
                <X className="h-3 w-3 cursor-pointer" />
              </Button>
            </Badge>
          )}

          {filters.expiringSoon && (
            <Badge variant="secondary" className="gap-1">
              Expiring soon
              <Button
                className="size-5"
                variant={"destructive"}
                size={"icon-sm"}
                onClick={() => handleExpiringOnlyChange(false)}
              >
                <X className="h-3 w-3 cursor-pointer" />
              </Button>
            </Badge>
          )}

          <Button variant="destructive" size="sm" onClick={clearFilters}>
            Clear all
          </Button>
        </div>
      )}
    </div>
  );
};

export default CouponFilters;

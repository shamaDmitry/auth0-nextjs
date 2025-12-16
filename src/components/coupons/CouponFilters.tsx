"use client";

import React, { FC, useState } from "react";
import { CouponFilters as FilterType } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Search, X } from "lucide-react";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";
import { categories } from "@/data/mockData";

interface CouponFiltersProps {
  filters: FilterType;
  onFiltersChange: (filters: FilterType) => void;
}

const CouponFilters: FC<CouponFiltersProps> = ({
  filters,
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

  const clearFilters = () => {
    onFiltersChange({
      search: "",
      category: "",
      priceRange: [0, 1000],
      sortBy: "newest",
    });
  };

  const hasActiveFilters = filters.search || filters.category;

  return (
    <div className="space-y-4">
      {/* Search and Sort Row */}
      <div className="flex flex-col gap-4 sm:flex-row">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search coupons..."
            value={filters.search}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Sort */}
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

        {/* Advanced Filters Toggle */}
        <Button
          variant="outline"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="gap-2"
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filters
        </Button>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2">
        <Badge
          variant={!filters.category ? "default" : "outline"}
          className="cursor-pointer transition-colors hover:bg-primary hover:text-primary-foreground"
          onClick={() => handleCategoryChange("")}
        >
          All
        </Badge>

        {categories.map((category) => (
          <Badge
            key={category.id}
            variant={filters.category === category.slug ? "default" : "outline"}
            className="cursor-pointer transition-colors hover:bg-primary hover:text-primary-foreground"
            onClick={() => handleCategoryChange(category.slug)}
          >
            <span className="mr-1">{category.icon}</span>
            {category.name}
          </Badge>
        ))}
      </div>

      {/* Active Filters */}
      {hasActiveFilters && (
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          {filters.search && (
            <Badge variant="secondary" className="gap-1">
              Search: {filters.search}
              <Button
                variant={"ghost"}
                size={"sm"}
                onClick={(e) => {
                  console.log("eeee", e);

                  return handleSearchChange("");
                }}
              >
                <X className="h-3 w-3 cursor-pointer" />
              </Button>
            </Badge>
          )}

          {filters.category && (
            <Badge variant="secondary" className="gap-1">
              {categories.find((c) => c.slug === filters.category)?.name}

              <Button
                variant={"ghost"}
                size={"sm"}
                onClick={() => handleCategoryChange("")}
              >
                <X className="h-3 w-3 cursor-pointer" />
              </Button>
            </Badge>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-destructive"
          >
            Clear all
          </Button>
        </div>
      )}
    </div>
  );
};

export default CouponFilters;

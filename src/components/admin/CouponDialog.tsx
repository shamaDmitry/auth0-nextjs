"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useAdminStore } from "@/stores/useAdminStore";
import CouponForm from "./CouponForm";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import { Category } from "@/types";

const CouponDialog = () => {
  const supabase = createClient();
  const { isCouponModalOpen, setIsCouponModalOpen } = useAdminStore();

  const [categories, setCategories] = useState<Category[]>([]);
  const [, setIsCategoriesLoading] = useState(true);

  useEffect(() => {
    setIsCategoriesLoading(true);

    const fetchCaregories = async () => {
      const { data, error } = await supabase.from("categories").select("*");

      if (error) {
        console.error(error);
      } else {
        setCategories(data);
      }

      setIsCategoriesLoading(false);
    };

    fetchCaregories();
  }, [supabase]);

  return (
    <Dialog open={isCouponModalOpen} onOpenChange={setIsCouponModalOpen}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create New Coupon</DialogTitle>

          <DialogDescription>
            Fill in the details below to create a new coupon.
          </DialogDescription>
        </DialogHeader>

        <CouponForm categories={categories} />
      </DialogContent>
    </Dialog>
  );
};

export default CouponDialog;

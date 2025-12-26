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
  const {
    isCouponModalOpen,
    setIsCouponModalOpen,
    editingCoupon,
    closeModals,
  } = useAdminStore();

  const [categories, setCategories] = useState<Category[]>([]);
  const [, setIsCategoriesLoading] = useState(true);

  useEffect(() => {
    setIsCategoriesLoading(true);

    const fetchCategories = async () => {
      const { data, error } = await supabase.from("categories").select("*");

      if (error) {
        console.error(error);
      } else {
        setCategories(data);
      }

      setIsCategoriesLoading(false);
    };

    fetchCategories();
  }, [supabase]);

  const isEditing = !!editingCoupon;

  return (
    <Dialog
      open={isCouponModalOpen}
      onOpenChange={(open) => {
        if (!open) {
          closeModals();
        } else {
          setIsCouponModalOpen(true);
        }
      }}
    >
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Edit Coupon" : "Create New Coupon"}
          </DialogTitle>

          <DialogDescription>
            {isEditing
              ? "Update the details below to modify this coupon."
              : "Fill in the details below to create a new coupon."}
          </DialogDescription>
        </DialogHeader>

        <CouponForm categories={categories} editingCoupon={editingCoupon} />
      </DialogContent>
    </Dialog>
  );
};

export default CouponDialog;

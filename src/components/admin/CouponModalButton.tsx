"use client";

import { Button } from "@/components/ui/button";
import { useAdminStore } from "@/stores/useAdminStore";
import { Plus } from "lucide-react";

const CouponModalButton = () => {
  const { setIsCouponModalOpen } = useAdminStore();

  return (
    <Button variant="hero" onClick={() => setIsCouponModalOpen(true)}>
      <Plus className="size-4" />
      Create Coupon
    </Button>
  );
};

export default CouponModalButton;

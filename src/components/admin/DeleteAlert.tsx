"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useAdminStore } from "@/stores/useAdminStore";
import { deleteCoupon } from "@/actions/couponActions";
import { toast } from "sonner";
import { useTransition } from "react";
import { Loader2 } from "lucide-react";

const DeleteAlert = () => {
  const { isDeleteModalOpen, deletingCouponId, closeModals } = useAdminStore();
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (!deletingCouponId) return;

    startTransition(async () => {
      const result = await deleteCoupon(deletingCouponId);

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success("Coupon deleted successfully");
        closeModals();
      }
    });
  };

  return (
    <AlertDialog
      open={isDeleteModalOpen}
      onOpenChange={(open) => {
        if (!open) closeModals();
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>

          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this
            coupon and remove all associated data.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>

          <AlertDialogAction onClick={handleDelete} disabled={isPending}>
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteAlert;

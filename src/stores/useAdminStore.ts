import { Database } from "@/types/supabase";
import { create } from "zustand";

interface AdminState {
  isCouponModalOpen: boolean;
  setIsCouponModalOpen: (isCouponModalOpen: boolean) => void;

  isDeleteModalOpen: boolean;
  setIsDeleteModalOpen: (isDeleteModalOpen: boolean) => void;

  editingCoupon: Database["public"]["Tables"]["coupons"]["Row"] | null;
  setEditingCoupon: (
    coupon: Database["public"]["Tables"]["coupons"]["Row"] | null
  ) => void;

  deletingCouponId: string | null;
  setDeletingCouponId: (id: string | null) => void;

  openCreateModal: () => void;
  openEditModal: (
    coupon: Database["public"]["Tables"]["coupons"]["Row"]
  ) => void;
  openDeleteModal: (couponId: string) => void;
  closeModals: () => void;
}

export const useAdminStore = create<AdminState>((set) => ({
  isCouponModalOpen: false,
  setIsCouponModalOpen: (isCouponModalOpen) => set({ isCouponModalOpen }),

  isDeleteModalOpen: false,
  setIsDeleteModalOpen: (isDeleteModalOpen) => set({ isDeleteModalOpen }),

  editingCoupon: null,
  setEditingCoupon: (coupon) => set({ editingCoupon: coupon }),

  deletingCouponId: null,
  setDeletingCouponId: (id) => set({ deletingCouponId: id }),

  openCreateModal: () => set({ isCouponModalOpen: true, editingCoupon: null }),

  openEditModal: (coupon) => {
    return set({ isCouponModalOpen: true, editingCoupon: coupon });
  },

  openDeleteModal: (couponId) =>
    set({ isDeleteModalOpen: true, deletingCouponId: couponId }),

  closeModals: () =>
    set({
      isCouponModalOpen: false,
      isDeleteModalOpen: false,
      editingCoupon: null,
      deletingCouponId: null,
    }),
}));

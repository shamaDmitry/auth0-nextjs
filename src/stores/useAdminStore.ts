import { create } from "zustand";

interface AdminState {
  isCouponModalOpen: boolean;
  setIsCouponModalOpen: (isCouponModalOpen: boolean) => void;

  isDeleteModalOpen: boolean;
  setIsDeleteModalOpen: (isDeleteModalOpen: boolean) => void;
}

export const useAdminStore = create<AdminState>((set) => ({
  isCouponModalOpen: false,
  setIsCouponModalOpen: (isCouponModalOpen) => set({ isCouponModalOpen }),

  isDeleteModalOpen: false,
  setIsDeleteModalOpen: (isDeleteModalOpen) => set({ isDeleteModalOpen }),
}));

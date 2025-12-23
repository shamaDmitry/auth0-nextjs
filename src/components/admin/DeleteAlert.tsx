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

interface DeleteAlertProps {
  deleteAction: () => void;
}

const DeleteAlert = ({ deleteAction }: DeleteAlertProps) => {
  const { isDeleteModalOpen, setIsDeleteModalOpen } = useAdminStore();

  return (
    <AlertDialog
      open={isDeleteModalOpen}
      onOpenChange={() => setIsDeleteModalOpen(false)}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>

          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>

          <AlertDialogAction onClick={deleteAction}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteAlert;

"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { FC } from "react";
import { Coupon } from "@/types";
import Image from "next/image";
import { Button } from "../ui/button";
import { Edit, Trash2 } from "lucide-react";
import CouponDialog from "@/components/admin/CouponDialog";
import { useAdminStore } from "@/stores/useAdminStore";
import DeleteAlert from "@/components/admin/DeleteAlert";

interface CouponTableProps {
  coupons: Coupon[];
}

const CouponTable: FC<CouponTableProps> = ({ coupons }) => {
  const { setIsCouponModalOpen, setIsDeleteModalOpen } = useAdminStore();

  return (
    <>
      <CouponDialog />

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Sold</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {coupons.map((coupon) => (
            <TableRow key={coupon.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Image
                    width={40}
                    height={40}
                    src={coupon.image_url}
                    alt={coupon.title}
                    className="h-10 w-10 rounded-lg object-cover"
                  />

                  <div>
                    <p className="font-medium">{coupon.title}</p>

                    <p className="text-sm text-muted-foreground">
                      {coupon.merchant_name}
                    </p>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="outline">
                  <span className="mr-1">{coupon.category.icon}</span>
                  {coupon.category.name}
                </Badge>
              </TableCell>
              <TableCell>
                <span className="text-muted-foreground line-through">
                  ${coupon.original_price}
                </span>
                <span className="ml-2 font-semibold text-primary">
                  ${coupon.discounted_price}
                </span>
              </TableCell>
              <TableCell>
                {coupon.sold_count}/{coupon.quantity}
              </TableCell>
              <TableCell>
                <Badge
                  variant={coupon.is_active ? "default" : "secondary"}
                  className={coupon.is_active ? "bg-success" : ""}
                >
                  {coupon.is_active ? "Active" : "Inactive"}
                </Badge>
              </TableCell>

              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      return setIsCouponModalOpen(true);
                    }}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setIsDeleteModalOpen(true);
                    }}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>

                  <DeleteAlert
                    deleteAction={() => {
                      console.log("delete ", coupon.id);
                    }}
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default CouponTable;

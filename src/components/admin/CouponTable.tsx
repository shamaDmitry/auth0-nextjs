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
import { Database } from "@/types/supabase";

interface CouponTableProps {
  coupons: Database["public"]["Tables"]["coupons"]["Row"][];
}

const CouponTable: FC<CouponTableProps> = ({ coupons }) => {
  const { openEditModal, openDeleteModal } = useAdminStore();

  return (
    <>
      <CouponDialog />

      <DeleteAlert />

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Sold</TableHead>
            <TableHead>Validity</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {coupons.map((coupon) => {
            return (
              <TableRow key={coupon.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    {coupon.image_url ? (
                      <Image
                        width={40}
                        height={40}
                        src={coupon.image_url}
                        alt={coupon.title}
                        className="h-10 w-10 rounded-lg object-cover"
                      />
                    ) : (
                      <div className="h-10 w-10 rounded-lg bg-secondary/10"></div>
                    )}

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
                    {/* <span className="mr-1">{coupon.category?.icon}</span> */}
                    <span className="mr-1">{coupon.category}</span>
                    {/* {coupon.category?.name} */}
                    {coupon.category?.name}
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
                  <div className="text-xs">
                    <p>
                      From:{" "}
                      {coupon.valid_from
                        ? new Date(coupon.valid_from).toLocaleDateString()
                        : "-"}
                    </p>
                    <p>
                      Until:{" "}
                      {coupon.valid_until
                        ? new Date(coupon.valid_until).toLocaleDateString()
                        : "-"}
                    </p>
                  </div>
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
                      onClick={() => openEditModal(coupon)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>

                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => openDeleteModal(coupon.id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
};

export default CouponTable;

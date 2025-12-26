"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler, Resolver } from "react-hook-form";
import { z } from "zod/v4";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAdminStore } from "@/stores/useAdminStore";
import { FC, useEffect, useTransition } from "react";
import { Category, Coupon } from "@/types";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { createCoupon, updateCoupon } from "@/actions/couponActions";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface CouponFormProps {
  categories: Category[];
  editingCoupon?: Coupon | null;
}

interface FormValues {
  title: string;
  description: string;
  originalPrice: number;
  discountedPrice: number;
  category: string;
  quantity: number;
  validFrom: string;
  validUntil: string;
  merchantName: string;
  location?: string;
  imageUrl: string;
  terms: string;
}

const formSchema = z
  .object({
    title: z
      .string()
      .min(5, { message: "Title must be at least 5 characters." })
      .max(50),
    description: z.string().min(10).max(500),
    originalPrice: z.number().min(1, "Original price must be at least 1"),
    discountedPrice: z.number().min(1, "Discounted price must be at least 1"),
    category: z.string().min(1, { message: "Please select a category." }),
    quantity: z.number().min(1, "Quantity must be at least 1"),
    validFrom: z.string().optional(),
    // .min(1, { message: "Please provide a valid from date." })
    validUntil: z.string().optional(),
    // .min(1, { message: "Please provide a valid until date." })
    merchantName: z.string().min(2).max(100),
    location: z.string().max(100).optional(),
    imageUrl: z
      .string()
      // url({ message: "Please enter a valid URL." })
      .optional(),
    terms: z.string().min(10).max(1000),
  })
  .refine(
    (data) => {
      if (!data.validFrom || !data.validUntil) return true;
      return new Date(data.validFrom) <= new Date(data.validUntil);
    },
    {
      message: "Valid from date must be before or equal to valid until date",
      path: ["validFrom"],
    }
  )
  .refine(
    (data) => {
      if (!data.validUntil) return true;
      return new Date(data.validUntil) >= new Date();
    },
    {
      message: "Valid until date must be in the future",
      path: ["validUntil"],
    }
  )
  .refine(
    (data) => {
      return data.discountedPrice < data.originalPrice;
    },
    {
      message: "Discounted price must be less than original price",
      path: ["discountedPrice"],
    }
  );

const CouponForm: FC<CouponFormProps> = ({ categories, editingCoupon }) => {
  const { closeModals } = useAdminStore();
  const [isPending, startTransition] = useTransition();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema) as Resolver<FormValues>,
    defaultValues: {
      title: "",
      description: "",
      originalPrice: 0,
      discountedPrice: 0,
      category: "",
      quantity: 0,
      validFrom: "",
      validUntil: "",
      merchantName: "",
      location: "",
      imageUrl: "",
      terms: "",
    },
  });

  useEffect(() => {
    if (editingCoupon) {
      form.reset({
        title: editingCoupon.title,
        description: editingCoupon.description,
        originalPrice: editingCoupon.original_price,
        discountedPrice: editingCoupon.discounted_price,
        category: editingCoupon.category?.slug || "",
        quantity: editingCoupon.quantity,
        validFrom: editingCoupon.valid_from?.split("T")[0] || "",
        validUntil: editingCoupon.valid_until?.split("T")[0] || "",
        merchantName: editingCoupon.merchant_name,
        location: editingCoupon.location || "",
        imageUrl: editingCoupon.image_url,
        terms: editingCoupon.terms_and_conditions,
      });
    } else {
      form.reset({
        title: "",
        description: "",
        originalPrice: 0,
        discountedPrice: 0,
        category: "",
        quantity: 0,
        validFrom: "",
        validUntil: "",
        merchantName: "",
        location: "",
        imageUrl: "",
        terms: "",
      });
    }
  }, [editingCoupon, form]);

  const onSubmit: SubmitHandler<FormValues> = (values) => {
    console.log("submit", values);

    startTransition(async () => {
      const result = editingCoupon
        ? await updateCoupon(editingCoupon.id, values)
        : await createCoupon(values);

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(
          editingCoupon
            ? "Coupon updated successfully"
            : "Coupon created successfully"
        );

        closeModals();
      }
    });
  };

  const preFill = () => {
    form.reset({
      title: "NEW COUPON",
      description:
        "Get 2 movie tickets, a large popcorn, and 2 drinks for an unbeatable price. Valid for any showing at Premium Cinemas locations.",
      originalPrice: 50,
      discountedPrice: 23,
      category: "shopping",
      quantity: 110,
      validFrom: "",
      validUntil: "",
      merchantName: "merchant xyz",
      location: "",
      imageUrl: "",
      terms: "Too small: expected string to have >=10 characters",
    });
  };

  return (
    <>
      {!editingCoupon && <Button onClick={preFill}>pre-fill</Button>}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="grid gap-2">
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="50% Off Fine Dining Experience"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="grid gap-2">
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe the coupon offer..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="originalPrice"
                render={({ field }) => (
                  <FormItem className="grid gap-2">
                    <FormLabel>Original Price ($)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="100"
                        {...field}
                        onChange={(e) =>
                          field.onChange(e.target.valueAsNumber || 0)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="discountedPrice"
                render={({ field }) => (
                  <FormItem className="grid gap-2">
                    <FormLabel>Discounted Price ($)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="50"
                        {...field}
                        onChange={(e) =>
                          field.onChange(e.target.valueAsNumber || 0)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => {
                  console.log("field", field);

                  return (
                    <FormItem className="grid gap-2">
                      <FormLabel>Category</FormLabel>

                      <Select
                        onValueChange={(value) => field.onChange(value)}
                        value={
                          field.value || editingCoupon?.category?.slug || ""
                        }
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>

                        <SelectContent>
                          {categories.length === 0 && (
                            <div className="px-2 py-1 text-sm">
                              Nothing is here
                            </div>
                          )}

                          {categories.map((cat) => (
                            <SelectItem key={cat.id} value={cat.slug}>
                              <span className="mr-1">{cat.icon}</span>{" "}
                              {cat.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />

              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem className="grid gap-2">
                    <FormLabel>Quantity</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="100"
                        {...field}
                        onChange={(e) =>
                          field.onChange(e.target.valueAsNumber || 0)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="validFrom"
                render={({ field }) => (
                  <FormItem className="grid gap-2">
                    <FormLabel>Valid From</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="validUntil"
                render={({ field }) => (
                  <FormItem className="grid gap-2">
                    <FormLabel>Valid Until</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="merchantName"
              render={({ field }) => (
                <FormItem className="grid gap-2">
                  <FormLabel>Merchant Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Restaurant XYZ" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem className="grid gap-2">
                  <FormLabel>Location (optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Downtown" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem className="grid gap-2">
                  <FormLabel>Image URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="terms"
              render={({ field }) => (
                <FormItem className="grid gap-2">
                  <FormLabel>Terms & Conditions</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter terms and conditions..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="pt-4 gap-4 flex justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={closeModals}
              disabled={isPending}
            >
              Cancel
            </Button>

            <Button type="submit" variant="hero" disabled={isPending}>
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}

              {editingCoupon ? "Update Coupon" : "Create Coupon"}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default CouponForm;

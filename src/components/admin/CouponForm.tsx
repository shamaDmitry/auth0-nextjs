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
import { Category } from "@/types";
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
import { Database } from "@/types/supabase";

interface CouponFormProps {
  categories: Category[];
  editingCoupon?: Database["public"]["Tables"]["coupons"]["Row"] | null;
}

interface FormValues {
  title: string;
  description: string;
  original_price: number;
  discounted_price: number;
  category: string;
  quantity: number;
  valid_from: string;
  valid_until: string;
  merchant_name: string;
  location?: string;
  image_url: string;
  terms: string;
}

const formSchema = z
  .object({
    title: z
      .string()
      .min(5, { message: "Title must be at least 5 characters." })
      .max(50),
    description: z.string().min(10).max(500),
    original_price: z.number().min(1, "Original price must be at least 1"),
    discounted_price: z.number().min(1, "Discounted price must be at least 1"),
    category: z.string().min(1, { message: "Please select a category." }),
    quantity: z.number().min(1, "Quantity must be at least 1"),
    valid_from: z.string().optional(),
    // .min(1, { message: "Please provide a valid from date." })
    valid_until: z.string().optional(),
    // .min(1, { message: "Please provide a valid until date." })
    merchant_name: z.string().min(2).max(100),
    location: z.string().max(100).optional(),
    image_url: z
      .string()
      // url({ message: "Please enter a valid URL." })
      .optional(),
    terms: z.string().min(10).max(1000),
  })
  .refine(
    (data) => {
      if (!data.valid_from || !data.valid_until) return true;
      return new Date(data.valid_from) <= new Date(data.valid_until);
    },
    {
      message: "Valid from date must be before or equal to valid until date",
      path: ["valid_from"],
    }
  )
  .refine(
    (data) => {
      if (!data.valid_until) return true;
      return new Date(data.valid_until) >= new Date();
    },
    {
      message: "Valid until date must be in the future",
      path: ["valid_until"],
    }
  )
  .refine(
    (data) => {
      return data.discounted_price < data.original_price;
    },
    {
      message: "Discounted price must be less than original price",
      path: ["discounted_price"],
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
      original_price: 0,
      discounted_price: 0,
      category: "",
      quantity: 0,
      valid_from: "",
      valid_until: "",
      merchant_name: "",
      location: "",
      image_url: "",
      terms: "",

      // title: string;
      // description: string;
      // original_price: number;
      // discounted_price: number;
      // category: string;
      // quantity: number;
      // valid_from: string;
      // valid_until: string;
      // merchant_name: string;
      // location?: string;
      // image_url: string;
      // terms: string;
    },
  });

  useEffect(() => {
    if (editingCoupon) {
      form.reset({
        title: editingCoupon.title,
        description: editingCoupon.description,
        original_price: editingCoupon.original_price,
        discounted_price: editingCoupon.discounted_price,
        category: editingCoupon.category || "",
        quantity: editingCoupon.quantity,
        valid_from: editingCoupon.valid_from?.split("T")[0] || "",
        valid_until: editingCoupon.valid_until?.split("T")[0] || "",
        merchant_name: editingCoupon.merchant_name,
        location: editingCoupon.location || "",
        image_url: editingCoupon.image_url || "",
        terms: editingCoupon.terms_and_conditions || "",
      });
    } else {
      form.reset({
        title: "",
        description: "",
        original_price: 0,
        discounted_price: 0,
        category: "",
        quantity: 0,
        valid_from: "",
        valid_until: "",
        merchant_name: "",
        location: "",
        image_url: "",
        terms: "",
      });
    }
  }, [editingCoupon, form]);

  const onSubmit: SubmitHandler<FormValues> = (values) => {
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
      original_price: 50,
      discounted_price: 23,
      category: "shopping",
      quantity: 110,
      valid_from: "",
      valid_until: "",
      merchant_name: "merchant xyz",
      location: "",
      image_url: "",
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
                name="original_price"
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
                name="discounted_price"
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
                  return (
                    <FormItem className="grid gap-2">
                      <FormLabel>Category</FormLabel>

                      <Select
                        onValueChange={(value) => field.onChange(value)}
                        value={field.value || editingCoupon?.category || ""}
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
                name="valid_from"
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
                name="valid_until"
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
              name="merchant_name"
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
              name="image_url"
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

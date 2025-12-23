"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
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
import { FC } from "react";
import { Category } from "@/types";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface CouponFormProps {
  categories: Category[];
}

const formSchema = z.object({
  title: z
    .string()
    .min(5, {
      message: "Title must be at least 5 characters.",
    })
    .max(50),
});

const CouponForm: FC<CouponFormProps> = ({ categories }) => {
  const { setIsCouponModalOpen } = useAdminStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-4 py-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => {
              return (
                <FormItem className="grid gap-2">
                  <FormLabel>Title</FormLabel>

                  <FormControl>
                    <Input
                      id="title"
                      placeholder="50% Off Fine Dining Experience"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe the coupon offer..."
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="originalPrice">Original Price ($)</Label>
              <Input
                id="originalPrice"
                type="number"
                placeholder="100"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="discountedPrice">Discounted Price ($)</Label>
              <Input
                id="discountedPrice"
                type="number"
                placeholder="50"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>

              <Select required>
                <SelectTrigger className="w-full" id="category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>

                <SelectContent>
                  {categories.length === 0 && (
                    <div className="px-2 py-1 text-sm">Nothing is here</div>
                  )}

                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.slug}>
                      <span className="mr-1">{cat.icon}</span> {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="quantity">Quantity</Label>

              <Input id="quantity" type="number" placeholder="100" required />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="validFrom">Valid From</Label>
              <Input id="validFrom" type="date" required />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="validUntil">Valid Until</Label>
              <Input id="validUntil" type="date" required />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="merchantName">Merchant Name</Label>
            <Input id="merchantName" placeholder="Restaurant XYZ" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="location">Location (optional)</Label>
            <Input id="location" placeholder="Downtown" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="imageUrl">Image URL</Label>
            <Input id="imageUrl" placeholder="https://..." required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="terms">Terms & Conditions</Label>
            <Textarea
              id="terms"
              placeholder="Enter terms and conditions..."
              required
            />
          </div>
        </div>

        <div className="pt-4 gap-4 flex justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsCouponModalOpen(false)}
          >
            Cancel
          </Button>

          <Button type="submit" variant="hero">
            Create Coupon
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CouponForm;

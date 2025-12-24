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
  description: z.string().min(10).max(500),
  originalPrice: z.number().min(1),
  discountedPrice: z.number().min(1),
  category: z.string().nonempty({ message: "Please select a category." }),
  quantity: z.number().min(1),
  validFrom: z.string(),
  validUntil: z.string(),
  merchantName: z.string().min(2).max(100),
  location: z.string().max(100).optional(),
  imageUrl: z.url(),
  terms: z.string().min(10).max(1000),
});

const CouponForm: FC<CouponFormProps> = ({ categories }) => {
  const { setIsCouponModalOpen } = useAdminStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
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

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => {
              return (
                <FormItem className="grid gap-2">
                  <FormLabel>Description</FormLabel>

                  <FormControl>
                    <Textarea
                      id="description"
                      placeholder="Describe the coupon offer..."
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="originalPrice"
              render={({ field }) => {
                return (
                  <FormItem className="grid gap-2">
                    <FormLabel>Original Price ($)</FormLabel>

                    <FormControl>
                      <Input
                        id="originalPrice"
                        type="number"
                        placeholder="100"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <FormField
              control={form.control}
              name="discountedPrice"
              render={({ field }) => {
                return (
                  <FormItem className="grid gap-2">
                    <FormLabel>Discounted Price ($)</FormLabel>

                    <FormControl>
                      <Input
                        id="discountedPrice"
                        type="number"
                        placeholder="50"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                );
              }}
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

                    <FormControl>
                      <Select>
                        <SelectTrigger
                          className="w-full"
                          id="category"
                          {...field}
                        >
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>

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
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => {
                return (
                  <FormItem className="grid gap-2">
                    <FormLabel>Quantity</FormLabel>

                    <FormControl>
                      <Input
                        id="quantity"
                        type="number"
                        placeholder="100"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="validFrom"
              render={({ field }) => {
                return (
                  <FormItem className="grid gap-2">
                    <FormLabel>Valid From</FormLabel>

                    <FormControl>
                      <Input id="validFrom" type="date" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <FormField
              control={form.control}
              name="validUntil"
              render={({ field }) => {
                return (
                  <FormItem className="grid gap-2">
                    <FormLabel>Valid Until</FormLabel>

                    <FormControl>
                      <Input id="validUntil" type="date" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </div>

          <FormField
            control={form.control}
            name="merchantName"
            render={({ field }) => {
              return (
                <FormItem className="grid gap-2">
                  <FormLabel>Merchant Name</FormLabel>

                  <FormControl>
                    <Input
                      id="merchantName"
                      placeholder="Restaurant XYZ"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => {
              return (
                <FormItem className="grid gap-2">
                  <FormLabel>Location (optional)</FormLabel>

                  <FormControl>
                    <Input id="location" placeholder="Downtown" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => {
              return (
                <FormItem className="grid gap-2">
                  <FormLabel>Image URL</FormLabel>

                  <FormControl>
                    <Input id="imageUrl" placeholder="https://..." {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            control={form.control}
            name="terms"
            render={({ field }) => {
              return (
                <FormItem className="grid gap-2">
                  <FormLabel>Terms & Conditions</FormLabel>

                  <FormControl>
                    <Textarea
                      id="terms"
                      placeholder="Enter terms and conditions..."
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              );
            }}
          />
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

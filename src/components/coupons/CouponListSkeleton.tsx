import { Skeleton } from "@/components/ui/skeleton";

const CouponListSkeleton = () => {
  return (
    <div className="flex flex-col gap-2">
      <Skeleton className="bg-primary/30 aspect-4/3 h-[200px]" />

      <Skeleton className="h-7 w-9/12" />

      <div className="flex gap-4">
        <Skeleton className="h-5 w-1/2" />
        <Skeleton className="h-5 w-1/2" />
      </div>
    </div>
  );
};

export default CouponListSkeleton;

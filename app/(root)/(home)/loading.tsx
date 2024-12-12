// app/(your-path)/loading.tsx
import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div className="grid size-full grid-cols-3 place-items-start gap-x-8 p-4 max-2xl:grid-cols-2 max-md:gap-y-5 max-sm:grid-cols-2  max-[375px]:grid-cols-1">
      <Skeleton className="size-full" />
      <Skeleton className="size-full" />
      <Skeleton className="size-full" />
    </div>
  );
};

export default Loading;

import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div className="flex size-full flex-col items-start gap-4 p-4">
      <div className="space-y-3">
        <h1 className="text-light_dark text-4xl font-extrabold leading-[45px] tracking-[-1px] max-md:text-xl">
          Top Artists
        </h1>
        <p className="text-base leading-[24px] text-[#6B6B6B]">
          Explore the most popular artists
        </p>
      </div>
      <div className="grid size-full grid-cols-4 gap-x-3 gap-y-2  py-4 max-lg:grid-cols-3 max-lg:p-2 max-md:grid-cols-2 max-md:p-0 max-sm:grid-cols-1">
        <Skeleton className="size-full" />
        <Skeleton className="size-full" />
        <Skeleton className="size-full" />
        <Skeleton className="size-full" />
      </div>
      <h2 className="self-center font-extralight">
        This Page Only Contains Top 4 Artists
      </h2>
    </div>
  );
};

export default Loading;

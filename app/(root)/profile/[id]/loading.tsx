import { Tabs } from "@radix-ui/react-tabs";
import React from "react";

import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div className="flex size-full flex-col bg-white p-4 text-black transition-colors duration-300 dark:bg-[#121212] dark:text-white">
      <div className="flex w-full flex-col items-center gap-4">
        <div className="flex flex-col items-center gap-4">
          {/* Profile Picture */}
          <Skeleton className="size-[128px] rounded-full" />
          {/* User Info */}
          <div className="flex flex-col items-center justify-center">
            <Skeleton className="text-center text-[22px] font-bold leading-tight tracking-[-0.015em]" />

            <Skeleton className="text-center text-base font-normal leading-normal text-[#6B6B6B] dark:text-[#A9A9A9]" />
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="flex flex-wrap gap-3 px-4 py-3">
        <div className="flex min-w-[111px] flex-1 basis-[fit-content] flex-col items-center gap-2 rounded-lg border border-[#DEDEDE] bg-white p-3 text-center dark:border-[#333333] dark:bg-[#1E1E1E]">
          <Skeleton className="text-2xl font-bold leading-tight"></Skeleton>
          <div className="flex items-center gap-2">
            <p className="text-sm font-normal leading-normal text-[#6B6B6B] dark:text-[#A9A9A9]">
              Total Saves
            </p>
          </div>
        </div>
        <div className="flex min-w-[111px] flex-1 basis-[fit-content] flex-col items-center gap-2 rounded-lg border border-[#DEDEDE] bg-white p-3 text-center dark:border-[#333333] dark:bg-[#1E1E1E]">
          <Skeleton className="text-2xl font-bold leading-tight" />

          <div className="flex items-center gap-2">
            <p className="text-sm font-normal leading-normal text-[#6B6B6B] dark:text-[#A9A9A9]">
              Collections
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="about" className="w-full">
        <Skeleton className="flex border-b border-[#DEDEDE] px-4 dark:border-[#333333]">
          <Skeleton className="flex-1 pb-[13px] pt-4 text-center">
            About
          </Skeleton>
          <Skeleton className="flex-1 pb-[13px] pt-4 text-center">
            Collections
          </Skeleton>
        </Skeleton>
      </Tabs>
    </div>
  );
};

export default Loading;

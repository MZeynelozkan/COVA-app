import Image from "next/image";
import React from "react";

import { Input } from "../ui/input";

const GlobalSearch = () => {
  return (
    <div className="flex h-[40px] w-full max-w-[160px] items-center gap-2 rounded-[12px] bg-[#EDEDED] px-4 py-2">
      <Image
        alt="search"
        width={24}
        height={24}
        src="assets/icons/search.svg"
      />
      <Input
        className="rounded-none border-none bg-transparent pl-0 text-[16px] text-[#6B6B6B] focus-visible:ring-0 focus-visible:ring-offset-0"
        placeholder="Search"
      />
    </div>
  );
};

export default GlobalSearch;

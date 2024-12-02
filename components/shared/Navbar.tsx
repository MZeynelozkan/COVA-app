import Image from "next/image";
import React from "react";

import GlobalSearch from "../search/GlobalSearch";
import { ModeToggle } from "../theme/ModeToggle";

const Navbar = () => {
  return (
    <div className="flex h-[65px] w-full items-center justify-between border-b px-10 py-3">
      <div className="flex h-[23] w-full max-w-[166px] items-center gap-4">
        <Image
          alt="company logo"
          width={16}
          height={16}
          src="/assets/images/Logo.svg"
        />
        <h1 className="text-[18px] font-bold leading-[23px] text-black dark:text-black">
          Collectify
        </h1>
      </div>
      <div className="mr-[40px] flex items-center gap-8">
        <GlobalSearch />
        <ModeToggle />
      </div>
    </div>
  );
};

export default Navbar;

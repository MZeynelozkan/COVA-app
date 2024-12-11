"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import MobileNavbar from "./MobileNavbar";
import GlobalSearch from "../search/GlobalSearch";
import { ModeToggle } from "../theme/ModeToggle";

const Navbar = () => {
  return (
    <div className="background-light_dark fixed z-50 flex h-[65px] w-full items-center justify-between border-b px-10 py-3">
      <Link
        href="/"
        className="flex h-[23] w-full max-w-[166px] items-center gap-4"
      >
        <Image
          alt="company logo"
          width={16}
          height={16}
          src="/assets/images/Logo.svg"
          className="dark:invert"
        />
        <h1 className="text-[18px] font-bold leading-[23px] text-black dark:text-white">
          COVA
        </h1>
      </Link>
      <div className="mr-[40px] flex items-center gap-8 max-sm:hidden">
        <GlobalSearch />
        <ModeToggle />
      </div>
      <div className="sm:hidden">
        <ModeToggle />
      </div>
      <MobileNavbar />
    </div>
  );
};

export default Navbar;

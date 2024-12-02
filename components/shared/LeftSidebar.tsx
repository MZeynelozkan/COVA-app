"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

import { sidebarLinks } from "@/constants/constants";

import { Button } from "../ui/button";

const LeftSidebar = () => {
  const pathname = usePathname();

  // active state
  const linksWithActiveState = sidebarLinks.map((item) => {
    const isActive =
      (pathname.includes(item.route) && item.route.length > 1) ||
      pathname === item.route;

    return { ...item, isActive };
  });

  return (
    <div className="flex size-full h-[calc(100vh-65px)] max-w-[320px] flex-col justify-between px-4 pb-5 pt-9">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          {/** TODO: bunu Next image olarak degis */}
          <Image
            width={40}
            height={40}
            alt="profile image"
            src="/assets/icons/profile.png"
          />
          <div className="flex flex-col">
            <h2 className="text-base font-[500]">Navigation</h2>
            <p className="text-sm leading-[21px] text-[#6B6B6B]">
              Explore Content
            </p>
          </div>
        </div>
        <div className="space-y-2">
          {linksWithActiveState.map((item) =>
            item.route ? (
              <Link
                href={item.route}
                key={item.label}
                className={`${
                  item.isActive
                    ? "bg-[#EDEDED] text-black"
                    : "text-gray-700 hover:bg-gray-200"
                } flex items-center gap-4 rounded-lg px-3 py-2`}
              >
                <Image
                  src={item.imgURL}
                  alt={item.label}
                  width={20}
                  height={20}
                />
                <span>{item.label}</span>
              </Link>
            ) : null
          )}
        </div>
      </div>
      <div className=" flex  flex-col gap-3">
        <Button className="rounded-[24px] px-5 py-0 text-[16px] font-bold">
          Login
        </Button>
        <Button className="rounded-[24px] bg-[#EDEDED] px-5 py-0 text-[16px] font-bold text-black hover:bg-[#EDEDED]">
          Sign Up
        </Button>
      </div>
    </div>
  );
};

export default LeftSidebar;

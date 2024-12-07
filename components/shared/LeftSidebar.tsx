"use client";

import { Loader } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import React from "react";
import { FaUser } from "react-icons/fa";
import { MdOutlineLogout } from "react-icons/md";

import { sidebarLinks } from "@/constants/constants";

import { Button } from "../ui/button";

const LeftSidebar = () => {
  const { data: session, status } = useSession(); // Access status for loading state

  const { image, name } = session?.user || {};

  const pathname = usePathname();

  // active state
  const linksWithActiveState = sidebarLinks.map((item) => {
    const isActive =
      (pathname.includes(item.route) && item.route.length > 1) ||
      pathname === item.route;

    return { ...item, isActive };
  });

  return (
    <div className="sticky top-0 flex h-dvh w-full max-w-[320px] flex-col justify-between overflow-y-auto px-4 pb-5 pt-24 max-lg:w-[60px] max-lg:px-2 max-sm:hidden">
      <div className="flex flex-1 flex-col gap-4 max-[1023px]:items-center">
        <div className="flex items-center gap-3">
          {/** Display Loader if image is not yet available */}
          {status === "loading" || !image ? (
            <Loader className="animate-spin" />
          ) : (
            <Image
              width={40}
              className="rounded-full"
              height={40}
              alt="profile image"
              src={image || "/assets/icons/profile.png"}
            />
          )}
          <div className="flex flex-col max-lg:hidden">
            <h2 className="text-base font-[500]">{name || "Guest"}</h2>
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
                    ? "bg-sidebarLinks-light_dark  text-black"
                    : "text-gray-700 hover:bg-gray-200 dark:hover:bg-transparent"
                } text-light_dark flex items-center gap-4 rounded-lg px-3 py-2`}
              >
                <Image
                  src={item.imgURL}
                  alt={item.label}
                  width={20}
                  height={20}
                  className="dark:invert"
                />
                <span className="max-lg:hidden">{item.label}</span>
              </Link>
            ) : null
          )}
        </div>
      </div>
      {status === "loading" ? ( // Show loader while session is being fetched
        <div className="flex justify-center py-4">
          <Loader className="animate-spin" />
        </div>
      ) : !session ? (
        <div className="flex flex-col gap-3">
          <Link href="/sign-in">
            <Button className="w-full rounded-[24px] px-5 py-0 text-[16px] font-bold max-lg:hidden">
              Login
            </Button>
            <FaUser
              className="ml-4 hidden dark:text-white max-lg:block"
              width={20}
            />
          </Link>
        </div>
      ) : (
        <>
          <Link href="/create">
            <Button className="mb-5 w-full rounded-[24px] bg-blue-400 px-5 py-0 text-[16px] font-bold text-black hover:bg-[#EDEDED] max-lg:hidden">
              Create Collection
            </Button>
          </Link>
          <MdOutlineLogout
            onClick={() => signOut()}
            className="hidden h-4 w-5 self-center hover:cursor-pointer max-lg:block"
          />
          <Button
            onClick={() => signOut()}
            className="mb-5 rounded-[24px] bg-[#EDEDED] px-5 py-0 text-[16px] font-bold text-black hover:bg-[#EDEDED] max-lg:hidden"
          >
            Sign Out
          </Button>
        </>
      )}
    </div>
  );
};

export default LeftSidebar;

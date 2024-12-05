"use client";

import { Loader } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import React from "react";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { sidebarLinks } from "@/constants/constants";

import { Button } from "../ui/button";

const MobileNavbar = () => {
  const { data: session, status } = useSession(); // Access session and status
  const pathname = usePathname();

  // Destructure user data with fallbacks
  const { image, name } = session?.user || {};

  // Active state kontrolü
  const linksWithActiveState = sidebarLinks.map((item) => {
    const isActive =
      (pathname.includes(item.route) && item.route.length > 1) ||
      pathname === item.route;

    return { ...item, isActive };
  });

  return (
    <div className="sm:hidden">
      <Sheet>
        <SheetTrigger className="p-2 text-gray-700 dark:text-white">
          {/* Menü açma ikonu */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 5.25h16.5m-16.5 7.5h16.5m-16.5 7.5h16.5"
            />
          </svg>
        </SheetTrigger>
        <SheetContent
          side="left"
          className="overflow-y-auto bg-white dark:bg-gray-900"
        >
          {/* Profil Bölümü */}
          <div className="flex items-center gap-3 border-b border-gray-200 p-4 dark:border-gray-700">
            {status === "loading" || !image ? (
              <Loader className="animate-spin" />
            ) : (
              <Image
                width={40}
                height={40}
                alt="profile image"
                src={image || "/assets/icons/profile.png"} // Fallback image
                className="rounded-full"
              />
            )}
            <div className="flex flex-col">
              <h2 className="text-base font-[500] text-black dark:text-white">
                {status === "loading" ? "Loading..." : name || "Guest"}
              </h2>
              <p className="text-sm leading-[21px] text-gray-500 dark:text-gray-400">
                Explore Content
              </p>
            </div>
          </div>

          {/* Linkler */}
          <div className="flex flex-col gap-4 p-4">
            <div className="space-y-2">
              {linksWithActiveState.map((item) =>
                item.route ? (
                  <Link
                    href={item.route}
                    key={item.label}
                    className={`${
                      item.isActive
                        ? "bg-sidebarLinks-light_dark text-black dark:text-white"
                        : "text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-800"
                    } flex items-center gap-4 rounded-lg px-3 py-2`}
                  >
                    <Image
                      src={item.imgURL}
                      alt={item.label}
                      width={20}
                      height={20}
                      className="dark:invert"
                    />
                    <span>{item.label}</span>
                  </Link>
                ) : null
              )}
            </div>
          </div>

          {/* Login ve Sign Up Butonları */}
          <div className="flex flex-col gap-3 border-t border-gray-200 p-4 dark:border-gray-700">
            {status === "loading" ? (
              <div className="flex justify-center py-4">
                <Loader className="animate-spin" />
              </div>
            ) : !session ? (
              <>
                <Link href="/sign-in">
                  <Button className="w-full rounded-[24px] px-5 py-2 text-[16px] font-bold">
                    Login
                  </Button>
                </Link>
                <Button className="rounded-[24px] bg-[#EDEDED] px-5 py-2 text-[16px] font-bold text-black hover:bg-gray-300 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700">
                  Sign Up
                </Button>
              </>
            ) : (
              <Button
                onClick={() => signOut()}
                className="mb-5 rounded-[24px] bg-[#EDEDED] px-5 py-0 text-[16px] font-bold text-black hover:bg-[#EDEDED]"
              >
                Sign Out
              </Button>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNavbar;

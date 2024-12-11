"use client";

import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState, Suspense } from "react";

import { useDebounce } from "@/hooks/useDebounce";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";

import GlobalResult from "./GlobalResult";
import { Input } from "../ui/input";

const GlobalSearch = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchContainerRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const [query, setQuery] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  // Debounce search input
  const debouncedSearch = useDebounce(search, 300);

  useEffect(() => {
    // Update query state based on URL searchParams
    setQuery(searchParams.get("q"));
    setSearch(searchParams.get("q") || "");
  }, [searchParams]);

  useEffect(() => {
    const handleOutsideClick = (event: any) => {
      if (
        searchContainerRef.current &&
        // @ts-ignore
        !searchContainerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
        setSearch("");
      }
    };

    setIsOpen(false);

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [pathname]);

  useEffect(() => {
    if (debouncedSearch) {
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "q",
        value: debouncedSearch,
      });
      router.push(newUrl);
    } else {
      if (query) {
        const newUrl = removeKeysFromQuery({
          params: searchParams.toString(),
          keysToRemove: ["q"],
        });
        router.push(newUrl, { scroll: false });
      }
    }
  }, [debouncedSearch, router, pathname, searchParams, query]);

  return (
    <div
      ref={searchContainerRef}
      className="relative flex h-[40px] w-full max-w-[160px] items-center gap-2 rounded-[12px] bg-[#EDEDED] px-4 py-2"
    >
      <Image
        alt="search"
        width={24}
        height={24}
        src="assets/icons/search.svg"
      />
      <Input
        className="rounded-none border-none bg-transparent pl-0 text-[16px] text-[#6B6B6B] focus-visible:ring-0 focus-visible:ring-offset-0"
        placeholder="Search"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          if (!isOpen) setIsOpen(true);
          if (e.target.value === "" && isOpen) setIsOpen(false);
        }}
      />
      {isOpen && (
        <Suspense fallback={<div>Loading...</div>}>
          <GlobalResult />
        </Suspense>
      )}
    </div>
  );
};

export default GlobalSearch;

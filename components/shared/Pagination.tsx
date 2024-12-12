"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

import { formUrlQuery } from "@/lib/utils";

import { Button } from "../ui/button";

interface Props {
  pageNumber: number;
  isNext: boolean;
}

const Pagination = ({ pageNumber, isNext }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleNavigation = (direction: string) => {
    const nextPageNumber =
      direction === "prev" ? pageNumber - 1 : pageNumber + 1;

    // formUrlQuery fonksiyonunu kullanarak yeni URL'yi oluştur
    const updatedUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "page",
      value: nextPageNumber.toString(),
    });

    // Yeni URL ile sayfayı yönlendir
    router.push(updatedUrl);
  };

  return (
    <div className="flex items-center justify-center gap-4 py-4">
      <Button
        disabled={pageNumber === 1}
        onClick={() => handleNavigation("prev")}
        className="rounded-md border border-gray-400 bg-gray-100 px-4 py-2 text-black transition-colors 
          hover:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
      >
        Prev
      </Button>

      <div className="rounded-md bg-gray-900 px-4 py-2 text-lg font-semibold text-white dark:bg-gray-100 dark:text-black">
        {pageNumber}
      </div>

      <Button
        disabled={!isNext}
        onClick={() => handleNavigation("next")}
        className="rounded-md border border-gray-400 bg-gray-100 px-4 py-2 text-black transition-colors 
          hover:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;

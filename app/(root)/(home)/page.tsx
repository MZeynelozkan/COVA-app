import React from "react";

import ItemCard from "@/components/cards/ItemCard";
import Pagination from "@/components/shared/Pagination";
import { getCollections } from "@/lib/actions/collection.action";
import { SearchParamsProps } from "@/types/types";

const Page = async ({ searchParams }: SearchParamsProps) => {
  const { collections, isNext } = await getCollections({
    pageSize: 3,
    page: searchParams.page ? +searchParams.page : 1,
  });

  return (
    <div className="flex size-full flex-col gap-2">
      <div className="grid size-full grid-cols-3 place-items-start gap-x-8 p-4 max-2xl:grid-cols-2 max-md:gap-y-5 max-sm:grid-cols-1  max-[375px]:grid-cols-1">
        {collections.map((item, index) => (
          <ItemCard
            key={index}
            user={item.user}
            type={item.type}
            specification={item.specification!}
            saved={item.savedCount}
            coverImg={item.coverImg!}
            createdAt={item.createdAt}
            id={item.id}
          />
        ))}
      </div>
      <Pagination
        isNext={isNext}
        pageNumber={searchParams.page ? +searchParams.page : 1}
      />
    </div>
  );
};

export default Page;

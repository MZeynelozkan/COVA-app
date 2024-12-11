import React from "react";

import { getUserCollections } from "@/lib/actions/user.action";
import { SearchParamsProps } from "@/types/types";

import ItemCard from "../cards/ItemCard";

interface Props extends SearchParamsProps {
  userId: string;
}

const CollectionTab = async ({ searchParams, userId }: Props) => {
  const { collections } = await getUserCollections({
    userId,
    page: searchParams.page ? +searchParams.page : 1,
  });
  return (
    <>
      {collections?.map((item, index) => (
        <ItemCard
          key={index}
          createdAt={item.createdAt}
          coverImg={item.coverImg!}
          saved={item.savedCount}
          type={item.type}
          specification={item.specification!}
          id={item.id}
        />
      ))}
    </>
  );
};

export default CollectionTab;

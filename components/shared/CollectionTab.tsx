import React from "react";

import { getUserCollections } from "@/lib/actions/user.action";
import { SearchParamsProps } from "@/types/types";

import ItemCard from "../cards/ItemCard";

interface Props extends SearchParamsProps {
  userId: string;
  viewerId?: string;
  viewerRole?: string;
  viewerUser?: string;
}

const CollectionTab = async ({
  searchParams,
  userId,
  viewerId,
  viewerRole,
  viewerUser,
}: Props) => {
  const { collections } = await getUserCollections({
    userId,
    page: searchParams.page ? +searchParams.page : 1,
    viewerId,
    viewerRole,
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
          viewerUser={viewerUser}
        />
      ))}
    </>
  );
};

export default CollectionTab;

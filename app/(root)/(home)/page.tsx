import React from "react";

import ItemCard from "@/components/cards/ItemCard";
import { getCollections } from "@/lib/actions/collection.action";

const Home = async () => {
  const collections = await getCollections({
    pageSize: 3,
  });

  return (
    <div className="grid size-full grid-cols-3 place-items-start gap-x-8 p-4 max-2xl:grid-cols-2 max-md:gap-y-5 max-sm:grid-cols-2  max-[375px]:grid-cols-1">
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
  );
};

export default Home;

import React from "react";

import ItemCard from "@/components/cards/ItemCard";
import { getCollections } from "@/lib/actions/collection.action";

const Home = async () => {
  const collections = await getCollections({
    pageSize: 4,
    page: 1,
    type: "ART",
  });

  console.log(collections);

  return (
    <div className=" grid size-full grid-cols-3 place-items-start gap-x-8 p-4 max-2xl:grid-cols-2 max-md:gap-y-5 max-sm:grid-cols-2  max-[375px]:grid-cols-1">
      {Array.from({ length: 3 }).map((item, index) => (
        <ItemCard key={index} />
      ))}
    </div>
  );
};

export default Home;

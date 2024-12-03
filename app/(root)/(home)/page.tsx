import React from "react";

import ItemCard from "@/components/cards/ItemCard";

const Home = () => {
  return (
    <div className=" grid flex-1 grid-cols-3 place-items-start gap-x-8 p-4 max-2xl:grid-cols-2 max-md:gap-y-5  max-sm:grid-cols-2 max-[375px]:grid-cols-1">
      {Array.from({ length: 3 }).map((item, index) => (
        <ItemCard key={index} />
      ))}
    </div>
  );
};

export default Home;

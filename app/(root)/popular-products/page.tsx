import React from "react";

import ProductCollectionCards from "@/components/cards/ProductCollectionCars";

const Page = () => {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="space-y-3">
        <h1 className="text-light_dark text-4xl font-extrabold leading-[45px] tracking-[-1px] max-md:text-xl">
          Products Collections
        </h1>
        <p className="text-base leading-[24px] text-[#6B6B6B]">
          Explore the product collections
        </p>
      </div>
      {Array.from({ length: 2 }).map((item, index) => (
        <ProductCollectionCards key={index} />
      ))}
    </div>
  );
};

export default Page;

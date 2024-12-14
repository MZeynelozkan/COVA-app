import React from "react";

import ProductCollectionCards from "@/components/cards/ProductCollectionCars";
import { getTopProductCollections } from "@/lib/actions/collection.action";

const Page = async () => {
  const products = await getTopProductCollections({
    type: "PRODUCT",
    path: "/popular-products",
  });

  console.log(products);

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
      {products.map((item, index) => (
        <ProductCollectionCards
          id={item.id}
          savingCount={item.savedCount!}
          specification={item.specification!}
          title={item.name}
          productCount={item.items.length}
          key={index}
        />
      ))}
    </div>
  );
};

export default Page;

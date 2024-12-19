import React from "react";

import ProductCollectionCards from "@/components/cards/ProductCollectionCars";
import { getTopCollections } from "@/lib/actions/collection.action";

export async function generateMetadata() {
  const products = await getTopCollections({
    type: "PRODUCT",
    path: "/product-collections",
  });

  return {
    title: "Products Collections",
    description: "Explore the product collections",
    keywords: products.map((item) => item.name).join(", "),
    openGraph: {
      title: "Products Collections",
      description: "Explore the product collections",
      images: products.map(
        (item) => item.items[0]?.image || "https://via.placeholder.com/300"
      ), // Fallback image
    },
  };
}

const Page = async () => {
  const products = await getTopCollections({
    type: "PRODUCT",
    path: "/product-collections",
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

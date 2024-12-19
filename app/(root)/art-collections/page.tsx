import React from "react";

import ArtCollectionCard from "@/components/cards/ArtCollectionCard";
import { getArtCollections } from "@/lib/actions/collection.action";

export async function generateMetadata() {
  const arts = await getArtCollections();

  return {
    title: "Arts Collections",
    description: "Explore the arts collections",
    keywords: arts.map((item) => item.name).join(", "),
    openGraph: {
      title: "Arts Collections",
      description: "Explore the arts collections",
      images: arts.map(
        (item) => item.image || "https://via.placeholder.com/300"
      ), // Fallback image
    },
  };
}

const Page = async () => {
  const arts = await getArtCollections();

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="space-y-3">
        <h1 className="text-light_dark text-4xl font-extrabold leading-[45px] tracking-[-1px] max-md:text-xl">
          Arts Collections
        </h1>
        <p className="text-base leading-[24px] text-[#6B6B6B]">
          Explore the arts collections
        </p>
      </div>
      {arts.map((item, index) => (
        <ArtCollectionCard
          title={item.name}
          savingCount={item.savedCount}
          artCount={item.items.length}
          id={item.id}
          specification={item.specification!}
          key={index}
        />
      ))}
    </div>
  );
};

export default Page;

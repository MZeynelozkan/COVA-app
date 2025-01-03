import React from "react";

import ArtistCard from "@/components/cards/ArtistCard";
import { getTopArtists } from "@/lib/actions/user.action";

export async function generateMetadata() {
  const topArtists = await getTopArtists();

  return {
    title: "Top Artists",
    description: "Explore the most popular artists",
    keywords: topArtists.map((artist) => artist.name).join(", "),
    openGraph: {
      title: "Top Artists",
      description: "Explore the most popular artists",
      images: topArtists.map(
        (artist) => artist.image || "https://via.placeholder.com/300"
      ), // Fallback image
    },
  };
}

const Page = async () => {
  const topArtists = await getTopArtists();

  return (
    <div className="flex size-full flex-col items-start gap-4 p-4">
      <div className="space-y-3">
        <h1 className="text-light_dark text-4xl font-extrabold leading-[45px] tracking-[-1px] max-md:text-xl">
          Top Artists
        </h1>
        <p className="text-base leading-[24px] text-[#6B6B6B]">
          Explore the most popular artists
        </p>
      </div>
      <div className="grid size-full grid-cols-4 gap-x-3 gap-y-2 py-4 max-lg:grid-cols-3 max-lg:p-2 max-md:grid-cols-2 max-md:p-0 max-sm:grid-cols-1">
        {topArtists.map((item, index) => (
          <ArtistCard
            key={index}
            image={item.image!}
            name={item.name!}
            totalCollectionCount={item.collections.length}
            totalSavedCount={item.collections.reduce(
              (total, collection) => total + collection.savedCount,
              0
            )}
            userId={item.id!}
          />
        ))}
      </div>
      <h2 className="self-center font-extralight">
        This Page Only Contains Top 4 Artists
      </h2>
    </div>
  );
};

export default Page;

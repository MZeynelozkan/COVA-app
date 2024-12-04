import React from "react";

import ArtCollectionCard from "@/components/cards/ArtCollectionCard";

const page = () => {
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
      {Array.from({ length: 2 }).map((item, index) => (
        <ArtCollectionCard key={index} />
      ))}
    </div>
  );
};

export default page;

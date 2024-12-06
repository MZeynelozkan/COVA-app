import Image from "next/image";
import React from "react";

import { Card, CardHeader, CardContent } from "../ui/card";

const ArtistCard = () => {
  return (
    <Card className="flex  size-full  flex-col gap-3  border-none pb-3 shadow-none">
      <CardHeader className="relative h-0 w-full pb-[100%]">
        {" "}
        {/* Aspect Ratio */}
        <Image
          src="/assets/icons/img1.png"
          alt="img"
          layout="fill"
          objectFit="cover"
          className="rounded-[12px]"
        />
      </CardHeader>
      <CardContent className="flex flex-col gap-1  p-0">
        <p className="text-light_dark text-base font-bold leading-[24px]">
          Creator Name
        </p>
        <p className="font-normal leading-[21px] text-[#6B6B6B] dark:text-white">
          500 likes • 20 collections
        </p>
        <p className="font-normal leading-[21px] text-[#6B6B6B] dark:text-white">
          Most popular: Abstract
        </p>
      </CardContent>
    </Card>
  );
};

export default ArtistCard;

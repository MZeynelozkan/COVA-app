import Image from "next/image";
import Link from "next/link";
import React from "react";

import { Card, CardHeader, CardContent } from "../ui/card";

interface Props {
  totalSavedCount?: number;
  totalCollectionCount: number;
  name: string;
  image: string;
  userId: string;
}

const ArtistCard = ({
  totalCollectionCount,
  totalSavedCount,
  name,
  image,
  userId,
}: Props) => {
  return (
    <Link href={`/profile/${userId}`}>
      <Card className="flex  size-full max-w-[499px] flex-col gap-3  border-none pb-3 shadow-none">
        <CardHeader className="relative h-0 w-full pb-[100%]">
          {" "}
          {/* Aspect Ratio */}
          <Image
            src={image ?? "/assets/icons/img1.png"}
            alt="img"
            layout="fill"
            objectFit="cover"
            className="rounded-[12px]"
          />
        </CardHeader>
        <CardContent className="flex flex-col gap-1  p-0">
          <p className="text-light_dark text-base font-bold leading-[24px]">
            {name}
          </p>
          <p className="font-normal leading-[21px] text-[#6B6B6B] dark:text-white">
            {totalSavedCount} likes • {totalCollectionCount} collections
          </p>
          <p className="font-normal leading-[21px] text-[#6B6B6B] dark:text-white">
            Most popular: Abstract
          </p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ArtistCard;

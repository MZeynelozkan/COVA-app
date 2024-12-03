import Image from "next/image";

import { Card, CardContent, CardHeader } from "@/components/ui/card";

const ItemCard = () => {
  return (
    <Card className="flex size-full max-w-[499px] flex-col gap-3  border-none pb-3 shadow-none">
      <CardHeader className="relative h-0 w-full pb-[120%]">
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
      <CardContent className="p-0">
        <p className="text-light_dark text-base leading-[24px]">Creator Name</p>
        <p className="font-normal leading-[21px] text-[#6B6B6B] dark:text-white">
          Posted Times
        </p>
      </CardContent>
    </Card>
  );
};

export default ItemCard;

import { User } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";

interface Props {
  user: User;
  createdAt: Date;
  type: string;
  coverImg: string;
  saved: number;
  specification: string;
  id: string;
}

const ItemCard = ({ user, createdAt, id, type, coverImg, saved }: Props) => {
  const formattedDate = createdAt ? formatDate(createdAt) : "Unknown date";

  return (
    <Link className="size-full" href={`/collection/${id}`}>
      <Card className="flex size-full max-w-[499px] flex-col gap-3 border-none pb-3 shadow-none">
        <CardHeader className="relative h-0 w-full pb-[140%]">
          {/* Görsel Bölümü */}
          <Image
            src={coverImg ?? "/assets/icons/img1.png"}
            alt="img"
            fill
            style={{ objectFit: "cover" }}
            className="rounded-[12px]"
          />
        </CardHeader>
        <CardContent className="p-2">
          {/* Üst Bilgiler */}
          <div className="flex items-center justify-between">
            <p className="text-base leading-[24px] text-gray-800 dark:text-gray-200">
              {user.name}
            </p>
            <h2 className="font-bold text-gray-800 dark:text-gray-100">
              Type: {type}
            </h2>
          </div>

          {/* Alt Bilgiler */}
          <div className="mt-3 flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
            <p className="flex items-center gap-1">
              <span className="font-medium text-gray-900 dark:text-gray-100">
                {saved === 0 ? "No saves" : saved}
              </span>
              {saved > 0 && (
                <span className="text-gray-600 dark:text-gray-400">
                  {saved === 1 ? "save" : "saves"}
                </span>
              )}
            </p>
            <p>
              <span className="font-medium text-gray-900 dark:text-gray-100">
                Posted:
              </span>{" "}
              {formattedDate}
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ItemCard;

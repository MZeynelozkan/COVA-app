import Link from "next/link";
import React from "react";

import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { getCollectionById } from "@/lib/actions/collection.action";
import { ParamsProps } from "@/types/types";

const Page = async ({ params }: ParamsProps) => {
  const session = await auth();
  const { id } = params;

  const collection = await getCollectionById({ id });

  console.log(collection);

  return (
    <div className="flex size-full flex-col p-4">
      <div className="flex flex-wrap items-center justify-between">
        <h1 className="text-light_dark text-4xl font-extrabold leading-[45px] tracking-[-1px] max-md:text-xl">
          {collection.name}
        </h1>

        {session?.user?.id === collection.userId && (
          <Link href="/add">
            <Button className="flex w-full items-center rounded-[24px] p-5">
              Add <span className="font-bold">{collection.type}</span>
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Page;

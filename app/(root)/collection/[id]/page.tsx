import Image from "next/image"; // Import Image component from Next.js
import Link from "next/link";
import React from "react";

import AddYourCollection from "@/components/interaction/AddYourCollection";
import Save from "@/components/interaction/Save";
import { Button } from "@/components/ui/button";
import { getCollectionById } from "@/lib/actions/collection.action";
import { getUser } from "@/lib/actions/user.action";
import { ParamsProps } from "@/types/types";

const Page = async ({ params }: ParamsProps) => {
  const { id } = params;
  const user = await getUser();

  const collection = await getCollectionById({ id });
  console.log("user", user);

  return (
    <div className="flex size-full min-h-screen flex-col bg-white p-6 dark:bg-gray-900">
      <div className="flex flex-wrap items-center justify-between">
        <h1 className="flex items-center gap-2 text-4xl font-extrabold leading-[45px] tracking-[-1px] dark:text-white max-md:text-2xl">
          {collection.name}{" "}
          <span>
            {user?.id && (
              <Save
                collectionId={id}
                userId={user?.id}
                hasSaved={user.savedCollections.some((item) => item.id === id)}
                saved={collection.savedCount}
              />
            )}
          </span>
        </h1>

        {user?.id === collection.userId && collection.items.length <= 10 && (
          <Link href={`/collection/${id}/add`}>
            <Button className="flex w-full items-center rounded-[24px] bg-blue-600 p-5 text-white dark:bg-blue-700">
              Add <span className="font-bold">{collection.type}</span>
            </Button>
          </Link>
        )}
      </div>
      <div className="mt-6 flex flex-wrap items-center justify-between gap-5 max-md:justify-center">
        {collection.items.map((item, index) => (
          <div
            key={item.id}
            className="w-full max-w-[300px] overflow-hidden rounded-lg bg-white shadow-lg dark:bg-gray-800"
          >
            <div className="relative h-72 w-full">
              {" "}
              {/* Fixed height container for images */}
              <Image
                src={item.image || "https://via.placeholder.com/300"} // Fallback image URL
                alt={item.name}
                layout="fill" // Make the image fill its parent container
                objectFit="cover" // Ensure the image covers the container without distortion
                className="rounded-t-lg"
              />
            </div>
            <div className="p-4">
              <div className="flex justify-between">
                <h2 className="text-lg font-semibold dark:text-white">
                  {item.name}
                </h2>
                <AddYourCollection
                  userCollections={user?.collections || []}
                  userId={user?.id!}
                  item={item}
                  collectionId={id}
                />
              </div>
              <Link href={item.link} target="_blank" passHref>
                <span className="text-blue-500 hover:underline dark:text-blue-400">
                  View Item
                </span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;

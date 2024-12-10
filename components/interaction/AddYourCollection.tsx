"use client";

import { Collection, Item } from "@prisma/client";
import React from "react";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { addItemYourCollection } from "@/lib/actions/user.action";

interface Props {
  userCollections: Collection[];
  userId: string;
  item: Item;
}

const AddYourCollection = ({ userCollections, userId, item }: Props) => {
  const handleAddToCollection = async (collectionId: string) => {
    try {
      // Server action'ı çağırıyoruz
      await addItemYourCollection({
        collectionId,
        userId,
        itemId: item.id,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger className="rounded-lg px-4 py-2 text-white">
          <PiDotsThreeOutlineVerticalFill className="invert dark:invert-0" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="rounded-lg bg-white p-2 shadow-lg">
          {userCollections.map((collection) => (
            <DropdownMenuItem
              key={collection.id}
              className="cursor-pointer hover:bg-gray-100"
              onClick={() => handleAddToCollection(collection.id)}
            >
              {collection.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default AddYourCollection;

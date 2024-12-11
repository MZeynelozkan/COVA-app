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
import {
  addItemYourCollection,
  removeItemYourCollection,
} from "@/lib/actions/item.action";

interface Props {
  userCollections: Collection[];
  userId: string;
  item: Item;
  collectionId: string;
}

const AddYourCollection = ({
  userCollections,
  userId,
  item,
  collectionId,
}: Props) => {
  console.log(collectionId, item.id, userId);
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

  const handleDelete = async (collectionId: string) => {
    try {
      removeItemYourCollection({ collectionId, userId, itemId: item.id });
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

          {userId ===
            userCollections.find((c) => c.id === collectionId)?.userId && (
            <DropdownMenuItem
              onClick={() => handleDelete(collectionId)}
              className="cursor-pointer hover:bg-gray-100"
            >
              Delete
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default AddYourCollection;

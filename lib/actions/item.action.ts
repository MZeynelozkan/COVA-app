"use server";

import { revalidatePath } from "next/cache";

import prisma from "@/prisma";

import { getCollectionById } from "./collection.action";
import { CreateItemParams, GetItemsByCollectionIdParams } from "./shared.types";

export async function createItem(params: CreateItemParams) {
  const { collectionId, name, link, image: imageUrl } = params;

  const collection = await getCollectionById({ id: collectionId });

  if (collection.items.length > 10) return;

  try {
    await prisma.item.create({
      data: {
        name,
        link,
        image: imageUrl,
        collectionId,
      },
    });

    revalidatePath(`/collection/${collectionId}`);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getItemsByCollectionId(
  params: GetItemsByCollectionIdParams
) {
  const { collectionId } = params;

  try {
    const items = await prisma.item.findMany({
      where: {
        collectionId,
      },
    });

    return items;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

"use server";

import { revalidatePath } from "next/cache";

import prisma from "@/prisma";

import { CreateItemParams, GetItemsByCollectionIdParams } from "./shared.types";

export async function createItem(params: CreateItemParams) {
  const { collectionId, name, link, image: imageUrl } = params;

  try {
    // 1. Yeni öğeyi oluştur ve koleksiyonla ilişkilendir
    const newItem = await prisma.item.create({
      data: {
        name,
        link,
        image: imageUrl,
        collections: {
          connect: { id: collectionId }, // Koleksiyonla ilişki kur
        },
      },
    });

    // 2. Sayfayı yeniden doğrula
    revalidatePath(`/collection/${collectionId}`);

    return newItem;
  } catch (error) {
    console.error("Error creating item:", error);
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
        collections: {
          some: { id: collectionId }, // Koleksiyonla ilişkili öğeleri al
        },
      },
    });

    return items;
  } catch (error) {
    console.error("Error fetching items by collectionId:", error);
    throw error;
  }
}

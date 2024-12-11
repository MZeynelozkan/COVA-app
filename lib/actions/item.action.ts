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

export async function addItemYourCollection(params: {
  collectionId: string;
  userId: string;
  itemId: string;
}) {
  const { collectionId, userId, itemId } = params;

  try {
    // 1. Kullanıcının koleksiyonu var mı kontrol et
    const collection = await prisma.collection.findFirst({
      where: {
        id: collectionId,
        userId, // Koleksiyonun bu kullanıcıya ait olduğundan emin ol
      },
    });

    if (!collection) {
      throw new Error("Koleksiyon bulunamadı veya bu kullanıcıya ait değil.");
    }

    // 2. Eklenmek istenen item var mı kontrol et
    const item = await prisma.item.findUnique({
      where: { id: itemId },
    });

    if (!item) {
      throw new Error("Eklenmek istenen öğe bulunamadı.");
    }

    // 3. Öğeyi koleksiyonla ilişkilendir
    await prisma.collection.update({
      where: { id: collectionId },
      data: {
        items: {
          connect: { id: itemId }, // İlgili item'ı koleksiyonla ilişkilendir
        },
      },
    });

    revalidatePath(`/collection/${collectionId}`);

    // 4. Başarılı geri dönüş
    return { message: "Öğe başarıyla koleksiyona eklendi.", collection, item };
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function removeItemYourCollection(params: {
  collectionId: string;
  userId: string;
  itemId: string;
}) {
  const { collectionId, userId, itemId } = params;

  try {
    // 1. Kullanıcının koleksiyonu var mı kontrol et
    const collection = await prisma.collection.findFirst({
      where: {
        id: collectionId,
        userId, // Koleksiyonun bu kullanıcıya aitloggundan emin ol
      },
    });

    if (!collection) {
      throw new Error(
        "Koleksiyon bulunamadı veya bu kullanıcıya aitloggundan emin ol."
      );
    }

    // 2. Silmek istenen item var mı kontrol et
    const item = await prisma.item.findUnique({
      where: { id: itemId },
    });

    if (!item) {
      throw new Error("Silmek istenen öğe bulunamadı.");
    }

    // 3. Öğeyi koleksiyondan sil
    await prisma.collection.update({
      where: { id: collectionId },
      data: {
        items: {
          disconnect: { id: itemId }, // İlgili item'ı koleksiyondan sil
        },
      },
    });

    revalidatePath(`/collection/${collectionId}`);

    // 4. Basarılı geri dönüş
    return {
      message: "Öğe başarıyla koleksiyondan silindi.",
      collection,
      item,
    };
  } catch (error: any) {
    return { error: error.message };
  }
}

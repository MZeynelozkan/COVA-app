/* eslint-disable no-unused-vars */
"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/prisma";

import {
  CreateCollectionParams,
  GetCollectionById,
  GetCollectionsParams,
  SaveCollectionParams,
} from "./shared.types";

export async function createCollection(params: CreateCollectionParams) {
  const { name, coverImg, userId, specification, type } = params;

  try {
    const newCollection = await prisma.collection.create({
      data: {
        coverImg,
        name,
        userId,
        specification,
        type,
      },
    });

    if (!newCollection) {
      return null;
    }

    if (newCollection) {
      revalidatePath("/");
    }

    return newCollection;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getCollections(params: GetCollectionsParams) {
  const { page = 1, pageSize = 3, type = "ART" } = params;

  try {
    const collections = await prisma.collection.findMany({
      include: {
        user: true,
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: [
        {
          savedCount: "desc",
        },
        {
          createdAt: "desc",
        },
      ],
    });

    return collections;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getCollectionById(params: { id: string }) {
  const { id } = params;

  try {
    // Koleksiyonu ve ilişkili item'ları almak için 'include' kullanmak
    const collection = await prisma.collection.findUnique({
      where: { id },
      include: {
        items: {
          select: {
            id: true,
            name: true,
            image: true,
            link: true,
            createdAt: true,
          },
        },
      },
    });

    if (!collection) {
      throw new Error(`Collection with ID ${id} not found`);
    }

    return collection;
  } catch (error) {
    console.error("Error fetching collection:", error);
    throw error;
  }
}

export async function saveCollections(params: SaveCollectionParams) {
  const { collectionId, userId } = params;

  try {
    await prisma.collection.updateMany({
      where: {
        id: collectionId,
      },
      data: {
        savedCount: {
          increment: 1,
        },
      },
    });

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        savedCollections: {
          connect: {
            id: collectionId,
          },
        },
      },
    });

    revalidatePath(`/`);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function unsaveCollections(params: SaveCollectionParams) {
  const { collectionId, userId } = params;

  try {
    await prisma.collection.updateMany({
      where: { id: collectionId },
      data: {
        savedCount: {
          decrement: 1,
        },
      },
    });

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        savedCollections: {
          disconnect: {
            id: collectionId,
          },
        },
      },
    });

    revalidatePath(`/`);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

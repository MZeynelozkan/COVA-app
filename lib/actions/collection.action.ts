"use server";

import { revalidatePath } from "next/cache";

import prisma from "@/prisma";

import {
  CreateCollectionParams,
  GetCollectionById,
  GetCollectionsParams,
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

    revalidatePath("/");

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

export async function getCollectionById(params: GetCollectionById) {
  const { id } = params;

  try {
    // Koleksiyonu ve ilişkili item'ları al
    const collection = await prisma.collection.findUnique({
      where: { id },
      include: {
        items: true,
      },
    });

    if (!collection) {
      throw new Error(`Collection with ID ${id} not found`);
    }

    return collection;
  } catch (error) {
    console.error("Error fetching collection:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

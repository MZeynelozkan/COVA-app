"use server";

import { revalidatePath } from "next/cache";

import prisma from "@/prisma";

import { CreateCollectionParams, GetCollectionsParams } from "./shared.types";

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
  const { page = 1, pageSize = 4, type = "ART" } = params;

  try {
    const collections = await prisma.collection.findMany({
      where: {
        type: {
          equals: type,
        },
      },
    });

    return collections;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

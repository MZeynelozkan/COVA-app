"use server";

import { prisma } from "@/prisma";

import getSession from "../getSession";

export async function getUser() {
  const session = await getSession();

  if (!session || !session.user?.email) {
    return null;
  }

  try {
    const userFull = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
      include: {
        collections: true,
        savedCollections: true,
      },
    });

    return userFull; // Return userFull
  } catch (error) {
    console.error(error);
    throw error; // Throw error to signal failure
  }
}

export async function getUserById(userId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        collections: true,
        savedCollections: true,
      },
    });

    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getUserCollections(params: {
  userId: string;
  page: number;
  pageSize?: number;
}) {
  const { userId, page, pageSize = 10 } = params;

  try {
    const collections = await prisma.collection.findMany({
      where: {
        userId,
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: {
        createdAt: "desc",
      },
    });

    const totalCollections = await prisma.collection.count({
      where: {
        userId,
      },
    });

    return {
      collections,
      totalPages: Math.ceil(totalCollections / pageSize),
      currentPage: page,
      totalCollections,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getTopArtists() {
  try {
    const topArtists = await prisma.user.findMany({
      orderBy: {
        collections: {
          _count: "desc", // Koleksiyonları savedCount'a göre topluyoruz
        },
      },
      take: 4,
      include: {
        collections: true,
      },
    });

    return topArtists;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

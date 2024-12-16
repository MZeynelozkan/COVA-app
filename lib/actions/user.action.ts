"use server";

import { revalidatePath } from "next/cache";

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
  viewerId?: string; // Profili görüntüleyen kullanıcının kimliği
  viewerRole?: string; // Görüntüleyen kullanıcının rolü
}) {
  const { userId, page, pageSize = 10, viewerId, viewerRole } = params;

  // Kullanıcı kendi profiline mi bakıyor? Veya admin mi?
  const isOwner = viewerId === userId;
  const isAdmin = viewerRole === "ADMIN"; // Admin olup olmadığına bakılır

  try {
    const collections = await prisma.collection.findMany({
      where: {
        userId,
        ...(isOwner || isAdmin
          ? {} // Kullanıcı kendi profiline veya adminse tüm koleksiyonları göster
          : { publicVisibility: true }), // Aksi halde yalnızca public olanlar
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
        ...(isOwner || isAdmin ? {} : { publicVisibility: true }),
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

export async function getALlUsers() {
  try {
    const users = await prisma.user.findMany({});

    return users;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function increaseViewCount(params: { collectionId: string }) {
  const { collectionId } = params;

  if (!collectionId) {
    throw new Error("collectionId is required");
  }

  try {
    const data = await prisma.collection.updateMany({
      where: { id: collectionId },
      data: {
        viewCount: {
          increment: 1,
        },
      },
    });

    revalidatePath(`/collection/${collectionId}`);

    return data;
  } catch (error) {
    console.error("Error increasing view count:", error);
    throw error; // Throw the error to handle it in the calling context
  }
}

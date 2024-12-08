"use server";

import prisma from "@/prisma";

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

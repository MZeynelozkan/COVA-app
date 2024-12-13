"use server";

import { prisma } from "@/prisma";

export async function updatePublicVisibility({
  collectionId,
  visibility,
  userRole,
}: {
  collectionId: string;
  visibility: boolean;
  userRole: string;
}) {
  if (userRole !== "ADMIN") {
    throw new Error("Bu işlemi yapmaya yetkiniz yok.");
  }

  try {
    await prisma.collection.update({
      where: { id: collectionId },
      data: { publicVisibility: visibility },
    });

    return { success: true, message: "Public visibility güncellendi." };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Bir hata oluştu." };
  }
}

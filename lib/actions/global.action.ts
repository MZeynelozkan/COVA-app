"use server";

import prisma from "@/prisma";

import { SearchParams } from "./shared.types";

export async function globalSearch(params: SearchParams) {
  try {
    const { query } = params;

    const modelsAndTypes = [
      {
        model: prisma.collection,
        type: "collection",
        searchField: "name",
      },
      {
        model: prisma.user,
        type: "user",
        searchField: "name",
      },
    ];

    // Paralel sorgular oluşturmak için Promise.all kullanımı
    const results = await Promise.all(
      modelsAndTypes.map(async ({ model, type, searchField }) => {
        const items = await model.findMany({
          where: {
            [searchField]: {
              contains: query,
              mode: "insensitive",
            },
          },
          select: {
            id: true,
            name: true,
          },
          take: 5,
        });

        // Modelin sonuçlarını uygun formatta döndür
        return items.map((item) => ({
          type,
          id: item.id,
          name: item.name,
        }));
      })
    );

    // Tüm sonuçları düz bir diziye dönüştür
    return JSON.stringify(results.flat());
  } catch (err) {
    console.error(err);
    throw new Error("Global search failed");
  }
}

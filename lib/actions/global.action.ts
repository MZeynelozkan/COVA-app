import { prisma } from "@/prisma";

import { SearchParams } from "./shared.types";

// Create a union type for the models to resolve the findMany signature issue
type PrismaModel = {
  collection: typeof prisma.collection;
  user: typeof prisma.user;
};

export async function globalSearch(params: SearchParams) {
  try {
    const { query } = params;

    // Explicitly typing models and types
    const modelsAndTypes: {
      model: PrismaModel[keyof PrismaModel];
      type: string;
      searchField: string;
    }[] = [
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

    const results: { type: string; id: number; name: string }[] = [];

    // for...of döngüsü ile sıralı sorgular çalıştırma
    for (const { model, type, searchField } of modelsAndTypes) {
      // @ts-ignore
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

      // Sonuçları uygun formatta ekle

      results.push(
        // @ts-ignore
        ...items.map((item) => ({
          type,
          id: item.id,
          name: item.name,
        }))
      );
    }

    // Tüm sonuçları JSON olarak döndür
    return JSON.stringify(results);
  } catch (err) {
    console.error(err);
    throw new Error("Global search failed");
  }
}

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

    const results = [];

    // for...of döngüsü ile sıralı sorgular çalıştırma
    for (const { model, type, searchField } of modelsAndTypes) {
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

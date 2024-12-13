"use server";

import { prisma } from "@/prisma";

import { SearchParams } from "./shared.types";

export async function globalSearch(params: SearchParams) {
  try {
    const { query } = params;

    const modelsAndTypes = [
      {
        model: prisma.collection,
        type: "collection",
        searchField: "name",
        additionalFilter: { publicVisibility: true }, // Yalnızca public olanları dahil et
      },
      {
        model: prisma.user,
        type: "user",
        searchField: "name",
        additionalFilter: {}, // Kullanıcılar için ek filtre gerekmez
      },
    ];

    const results = [];

    for (const {
      model,
      type,
      searchField,
      additionalFilter,
    } of modelsAndTypes) {
      // @ts-ignore
      const items = await model.findMany({
        where: {
          [searchField]: {
            contains: query,
            mode: "insensitive",
          },
          ...additionalFilter,
        },
        select: {
          id: true,
          name: true,
        },
        take: 5,
      });

      results.push(
        // @ts-ignore
        ...items.map((item) => ({
          type,
          id: item.id,
          name: item.name,
        }))
      );
    }

    return JSON.stringify(results);
  } catch (err) {
    console.error(err);
    throw new Error("Global search failed");
  }
}

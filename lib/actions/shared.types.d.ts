import { Prisma } from "@prisma/client";

export interface CreateCollectionParams {
  name: string;
  userId: string;
  specification: string;
  type: Prisma.CollectionType;
  coverImg: string;
}

export interface GetCollectionsParams {
  page?: number;
  pageSize: number;
  type: Prisma.CollectionType;
}

export interface GetCollectionById {
  id: string;
}

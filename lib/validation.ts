import { CollectionType } from "@prisma/client";
import { z } from "zod";

export const formSchema = z.object({
  name: z.string().min(5).max(20),
  type: z.enum([
    CollectionType.ART,
    CollectionType.PRODUCT,
    CollectionType.MUSIC,
  ]),
  specification: z.string().min(0).max(10),
  coverImg: z.string().min(0),
});

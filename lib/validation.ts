import { CollectionType } from "@prisma/client";
import { z } from "zod";

export const formSchema = z.object({
  name: z.string().min(5).max(40).trim(),
  type: z.enum([
    CollectionType.ART,
    CollectionType.PRODUCT,
    CollectionType.MUSIC,
  ]),
  specification: z.string().min(0).max(20).trim(),
  coverImg: z.string().min(0),
});

export const itemSchema = z.object({
  name: z.string().min(5).max(40),
  link: z.string().min(5).url({ message: "Invalid URL" }),
  image: z.string().min(10),
});

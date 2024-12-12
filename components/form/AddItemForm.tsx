"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { CldUploadButton, CloudinaryUploadWidgetInfo } from "next-cloudinary";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { createItem } from "@/lib/actions/item.action";
import { itemSchema } from "@/lib/validation";

import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface Props {
  collectionId: string;
  type?: string;
  path?: string;
}

const AddItemForm = ({ collectionId }: Props) => {
  const [coverImg, setCoverImg] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const parsedCollectionId = JSON.parse(collectionId);

  const form = useForm<z.infer<typeof itemSchema>>({
    resolver: zodResolver(itemSchema),
    defaultValues: {
      name: "",
      link: "",
      image: "",
    },
  });

  useEffect(() => {
    form.setValue("image", coverImg);
  }, [coverImg, form]);

  async function onSubmit(values: z.infer<typeof itemSchema>) {
    const { name, link, image } = values;

    try {
      await createItem({ collectionId: parsedCollectionId, name, image, link });
      setTimeout(() => {
        router.push(`/collection/${parsedCollectionId}`);
      }, 2000); // 2 saniye gecikme
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="mx-auto max-w-xl p-6">
      {/* Title Section */}
      <h1 className="mb-6 text-center text-3xl font-bold text-black dark:text-white">
        Add Item
      </h1>

      {/* Cloudinary upload button */}
      <div className="mb-6 flex flex-col gap-4">
        <h2 className="text-lg font-semibold text-black dark:text-white">
          Image Upload
        </h2>
        <CldUploadButton
          className={`h-[56px] rounded-md bg-black font-bold text-white ${
            loading ? "opacity-50" : ""
          }`}
          uploadPreset="ml_default"
          onSuccess={(result, { widget }) => {
            const imageUrl = (result?.info as CloudinaryUploadWidgetInfo).url;
            setCoverImg(imageUrl);
            setLoading(false);
          }}
          onClick={() => setLoading(true)}
        >
          {loading ? "Uploading..." : "Upload Image"}
        </CldUploadButton>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Name field */}
        <div>
          <label className="text-black dark:text-white">Name</label>
          <Input
            placeholder="Enter name"
            {...form.register("name")}
            className="border border-black bg-transparent text-black dark:border-white dark:text-white"
          />
          {form.formState.errors.name && (
            <p className="text-red-500">{form.formState.errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="text-black dark:text-white">Link</label>
          <Input
            placeholder="Enter Link"
            {...form.register("link")}
            className="border border-black bg-transparent text-black dark:border-white dark:text-white"
          />
          {form.formState.errors.link && (
            <p className="text-red-500">{form.formState.errors.link.message}</p>
          )}
        </div>

        {/* Hidden Cover Image field */}
        <div className="hidden">
          <Input
            placeholder="image URL"
            {...form.register("image")}
            readOnly
            className="border border-black bg-transparent text-black dark:border-white dark:text-white"
          />
        </div>

        {/* Submit Button */}
        <Button className="w-full rounded-md bg-black py-3 font-bold text-white transition hover:bg-gray-800 dark:hover:bg-gray-700">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default AddItemForm;

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { CldUploadButton, CloudinaryUploadWidgetInfo } from "next-cloudinary";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createCollection } from "@/lib/actions/collection.action";
import { formSchema } from "@/lib/validation";

interface Props {
  userId: string;
  type?: string;
  path?: string;
}

const CreateCollectionForm = ({ userId, type, path }: Props) => {
  const [coverImg, setCoverImg] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const parsedUserId = JSON.parse(userId);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      type: "ART", // Default type
      specification: "",
      coverImg: coverImg || "",
    },
  });

  useEffect(() => {
    form.setValue("coverImg", coverImg);
  }, [coverImg, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true); // Loading başlasın
    const { type, name, specification, coverImg } = values;

    try {
      await createCollection({
        coverImg,
        type,
        userId: parsedUserId,
        specification,
        name,
      });

      setTimeout(() => {
        setLoading(false); // Loading bitsin
        router.push("/");
      }, 2000); // 2 saniye delay
    } catch (error) {
      console.log(error);
      setLoading(false); // Hata durumunda da loading'i kapat
    }
  }

  return (
    <div className="relative mx-auto max-w-xl p-6">
      {/* Overlay ve Loader */}
      {loading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/50">
          <Loader className="animate-spin text-white" />
        </div>
      )}

      {/* Title Section */}
      <h1 className="mb-6 text-center text-3xl font-bold text-black dark:text-white">
        Create Collection
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

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Name field */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-black dark:text-white">
                  Name
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter name"
                    {...field}
                    className="border border-black bg-transparent text-black dark:border-white dark:text-white"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Specification field */}
          <FormField
            control={form.control}
            name="specification"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-black dark:text-white">
                  Specification
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter specification"
                    {...field}
                    className="border border-black bg-transparent text-black dark:border-white dark:text-white"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Type (Select) field */}
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-black dark:text-white">
                  Type
                </FormLabel>
                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ART">ART</SelectItem>
                      <SelectItem value="PRODUCT">PRODUCT</SelectItem>
                      <SelectItem value="MUSIC">MUSIC</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Cover Image field */}
          <FormField
            control={form.control}
            name="coverImg"
            render={({ field }) => (
              <FormItem className="hidden">
                <FormControl>
                  <Input
                    placeholder="Cover image URL"
                    {...field}
                    readOnly
                    className="border border-black bg-transparent text-black dark:border-white dark:text-white"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button
            disabled={loading}
            className="w-full rounded-md bg-black py-3 font-bold text-white transition hover:bg-gray-800 dark:hover:bg-gray-700"
          >
            {loading ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateCollectionForm;

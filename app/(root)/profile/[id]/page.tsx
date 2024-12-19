// Built-in modules
import Image from "next/image";
import React from "react";

// External modules
import { auth } from "@/auth";
import CollectionTab from "@/components/shared/CollectionTab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getUserById } from "@/lib/actions/user.action";
// eslint-disable-next-line import/order
import { formatDate } from "@/lib/utils";

// Components (Index & Object)

// Types
import { URLProps } from "@/types/types";

// Dynamic Metadata
export async function generateMetadata({ params }: { params: { id: string } }) {
  const user = await getUserById(params.id);

  return {
    title: `${user?.name}'s Profile | MyApp`,
    description: `${user?.name} joined on ${formatDate(
      user?.createdAt!
    )}. Explore their collections and saved items.`,
    openGraph: {
      title: `${user?.name}'s Profile`,
      description: `View ${user?.name}'s collections and more.`,
      images: [
        {
          url: user?.image
            ? user.image
            : "https://cdn.usegalileo.ai/sdxl10/f496ae30-5f5e-4a7c-a750-7cf9e72e4417.png",
          width: 128,
          height: 128,
          alt: `${user?.name}'s profile picture`,
        },
      ],
    },
  };
}

const Page = async ({ params, searchParams }: URLProps) => {
  const session = await auth();
  const { id } = params;
  const user = await getUserById(id);

  const totalSavedCount = user?.collections.reduce(
    (total, item) => total + (item.savedCount || 0),
    0
  );

  return (
    <div className="flex size-full flex-col bg-white p-4 text-black transition-colors duration-300 dark:bg-[#121212] dark:text-white">
      <div className="flex w-full flex-col items-center gap-4">
        <div className="flex flex-col items-center gap-4">
          {/* Profile Picture */}
          <Image
            alt="Profile Picture"
            src={
              user?.image ??
              "https://cdn.usegalileo.ai/sdxl10/f496ae30-5f5e-4a7c-a750-7cf9e72e4417.png"
            }
            width={128}
            height={128}
            className="rounded-full"
          />
          {/* User Info */}
          <div className="flex flex-col items-center justify-center">
            <p className="text-center text-[22px] font-bold leading-tight tracking-[-0.015em]">
              {user?.name}
            </p>

            <p className="text-center text-base font-normal leading-normal text-[#6B6B6B] dark:text-[#A9A9A9]">
              Joined {formatDate(user?.createdAt!)}
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="flex flex-wrap gap-3 px-4 py-3">
        <div className="flex min-w-[111px] flex-1 basis-[fit-content] flex-col items-center gap-2 rounded-lg border border-[#DEDEDE] bg-white p-3 text-center dark:border-[#333333] dark:bg-[#1E1E1E]">
          <p className="text-2xl font-bold leading-tight">{totalSavedCount}</p>
          <div className="flex items-center gap-2">
            <p className="text-sm font-normal leading-normal text-[#6B6B6B] dark:text-[#A9A9A9]">
              Total Saves
            </p>
          </div>
        </div>
        <div className="flex min-w-[111px] flex-1 basis-[fit-content] flex-col items-center gap-2 rounded-lg border border-[#DEDEDE] bg-white p-3 text-center dark:border-[#333333] dark:bg-[#1E1E1E]">
          <p className="text-2xl font-bold leading-tight">
            {user?.collections.length}
          </p>
          <div className="flex items-center gap-2">
            <p className="text-sm font-normal leading-normal text-[#6B6B6B] dark:text-[#A9A9A9]">
              Collections
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="about" className="w-full">
        <TabsList className="flex border-b border-[#DEDEDE] px-4 dark:border-[#333333]">
          <TabsTrigger
            value="about"
            className="flex-1 pb-[13px] pt-4 text-center"
          >
            About
          </TabsTrigger>
          <TabsTrigger
            value="collections"
            className="flex-1 pb-[13px] pt-4 text-center"
          >
            Collections
          </TabsTrigger>
        </TabsList>
        {/* Tab Content */}
        <TabsContent value="about"></TabsContent>
        <TabsContent
          className="grid grid-cols-2 gap-4 max-md:grid-cols-1"
          value="collections"
        >
          <CollectionTab
            userId={user?.id!}
            searchParams={searchParams}
            viewerId={session?.user?.id}
            viewerRole={session?.user?.role}
            viewerUser={JSON.stringify(session?.user)}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Page;

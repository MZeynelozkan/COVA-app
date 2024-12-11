import { redirect } from "next/navigation";
import React from "react";

import { auth } from "@/auth";
import AddItemForm from "@/components/form/AddItemForm";
import { ParamsProps } from "@/types/types";

const page = async ({ params }: ParamsProps) => {
  const session = await auth();
  const { id } = params;

  if (!session) redirect(`collection/${id}`);

  return (
    <div className="size-full">
      <AddItemForm collectionId={JSON.stringify(id)} />
    </div>
  );
};

export default page;

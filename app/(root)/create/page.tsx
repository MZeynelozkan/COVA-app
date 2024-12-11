import { redirect } from "next/navigation";
import React from "react";

import { auth } from "@/auth";
import CreateCollectionForm from "@/components/form/CreateCollectionForm";

const page = async () => {
  const session = await auth();

  if (!session) {
    redirect("/sign-in");
  }

  return (
    <div className="flex-1">
      <CreateCollectionForm userId={JSON.stringify(session.user?.id)} />
    </div>
  );
};

export default page;

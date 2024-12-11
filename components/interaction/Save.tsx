"use client";
import Image from "next/image";
import React from "react";

import {
  saveCollections,
  unsaveCollections,
} from "@/lib/actions/collection.action";

interface Props {
  hasSaved?: boolean;
  saved: number;
  collectionId: string;
  type?: string;
  userId: string;
}

const Save = ({ hasSaved, saved, collectionId, type, userId }: Props) => {
  const saveCollection = async () => {
    if (hasSaved) await unsaveCollections({ collectionId, userId });
    else await saveCollections({ collectionId, userId });
  };

  return (
    <div className="hover:cursor-pointer" onClick={saveCollection}>
      {hasSaved ? (
        <Image
          alt="saved"
          src="/assets/icons/star2.png"
          width={24}
          height={24}
        />
      ) : (
        <Image
          alt="saved"
          src="/assets/icons/star1.png"
          width={24}
          height={24}
        />
      )}
    </div>
  );
};

export default Save;

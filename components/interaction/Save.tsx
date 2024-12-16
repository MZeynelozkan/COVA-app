"use client";
import Image from "next/image";
import React, { useEffect } from "react";

import {
  saveCollections,
  unsaveCollections,
} from "@/lib/actions/collection.action";
import { increaseViewCount } from "@/lib/actions/user.action";

interface Props {
  hasSaved?: boolean;
  saved: number;
  collectionId: string;
  type?: string;
  userId: string;
}

const Save = ({ hasSaved, saved, collectionId, type, userId }: Props) => {
  useEffect(() => {
    if (collectionId) {
      const view = async () => {
        try {
          await increaseViewCount({ collectionId });
        } catch (error) {
          console.error("Failed to increase view count:", error);
        }
      };
      view();
    }
  }, [collectionId]);

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

"use client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import React from "react";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";

import { updatePublicVisibility } from "@/lib/actions/admin.action";

interface Props {
  collectionId: string; // Güncellenecek koleksiyonun ID'si
  userRole: string; // Kullanıcının rolü
}

const AdminDropdown = ({ collectionId, userRole }: Props) => {
  const handleVisibilityChange = async (visibility: boolean) => {
    try {
      const result = await updatePublicVisibility({
        collectionId,
        visibility,
        userRole,
      });

      if (result.success) {
        alert("Visibility güncellendi.");
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error(error);
      alert("Bir hata oluştu.");
    }
  };

  return (
    <div className="absolute right-0 top-2 z-50">
      <DropdownMenu>
        <DropdownMenuTrigger className="rounded-lg px-4 py-2 text-white">
          <PiDotsThreeOutlineVerticalFill className="text-white" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="rounded-lg bg-white p-2 shadow-lg">
          <DropdownMenuItem onClick={() => handleVisibilityChange(true)}>
            True
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleVisibilityChange(false)}>
            False
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default AdminDropdown;

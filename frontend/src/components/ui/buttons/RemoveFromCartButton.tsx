"use client";

import React from "react";
import { removeCourseFromCart } from "@/services/cartService";
import { Button } from "./Button";
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "next/navigation";

export interface RemoveFromCartButtonProps {
  courseId: number;
}
export default function RemoveFromCartButton({ courseId }: RemoveFromCartButtonProps) {
    const router = useRouter();
  const { token } = useAuthStore();
  const handle = async (e: React.MouseEvent) => {
    const response = await removeCourseFromCart(courseId, token!);
    router.refresh();
  };
  return <Button className="!w-full !px-2 !py-3 !text-base" onClick={handle}>Remove</Button>;
}

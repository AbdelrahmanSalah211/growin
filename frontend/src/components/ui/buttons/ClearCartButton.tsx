"use client";

import React from "react";
import { Button } from "./Button";
import { useAuthStore } from "@/stores/authStore";
import { clearCart } from "@/services/cartService";
import { useRouter } from "next/navigation";

export default function ClearCartButton() {
  const router = useRouter();
  const { token } = useAuthStore();
  const handle = async (e: React.MouseEvent) => {
    await clearCart(token!);
    router.refresh();
  };
  return (
    <Button className="!w-full px-4 !text-base" onClick={handle}>
      Clear cart
    </Button>
  );
}

"use client";

import React from "react";
import { Button } from "./Button";
import { useAuthStore } from "@/stores/authStore";
import { checkout } from "@/services/checkoutService";
import { useHydrateAuth } from "@/hooks/useHydrateAuth";
import { useRouter } from "next/navigation";

export default function CheckoutButton() {
  useHydrateAuth();
  const router = useRouter();
  const { token } = useAuthStore();
  const handle = async (e: React.MouseEvent) => {
    const data = await checkout(token!);
    router.push(data.redirect_url);
  };
  return (
    <Button onClick={handle} className="!w-full">
      Checkout
    </Button>
  );
}

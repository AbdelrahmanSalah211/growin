"use client";

import { useState, MouseEvent, ReactNode } from "react";
import { addCourseToCart } from "@/services/cartService";
import { Button } from "./Button";
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "next/navigation";

export interface AddToCartButtonProps {
  courseId: number;
}
export default function AddToCartButton({ courseId }: AddToCartButtonProps) {
  const [buttonText, setButtonText] = useState<string>("Add to cart");
  const { token } = useAuthStore();
  const router = useRouter();
  const handle = async (e: MouseEvent) => {
    e.preventDefault();
    if (token) {
      const data = await addCourseToCart({ courseId: courseId }, token!);
      const isAdded = data.find((course: any) => course.courseId === courseId);
      if (isAdded) setButtonText("Added");
    }else{
      window.location.href = "/auth/login";
    }
  };
  return <Button onClick={handle}>{buttonText}</Button>;
}

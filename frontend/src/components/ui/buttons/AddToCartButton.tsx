"use client";

import { useState, MouseEvent, ReactNode } from "react";
import { addCourseToCart } from "@/services/cartService";
import { Button } from "./Button";
import { useAuthStore } from "@/stores/authStore";
import { CheckIcon } from "@/components/icons/CheckIcon";

export interface AddToCartButtonProps {
  courseId: number;
}
export default function AddToCartButton({ courseId }: AddToCartButtonProps) {
  const [buttonText, setButtonText] = useState<string>("Add to cart");
  const { token } = useAuthStore();
  const handle = async (e: MouseEvent) => {
    const data = await addCourseToCart({ courseId: courseId }, token!);
    const isAdded = data.find((course: any) => course.courseId === courseId);
    if (isAdded) setButtonText("Added");
  };
  return <Button onClick={handle}>{buttonText}</Button>;
}

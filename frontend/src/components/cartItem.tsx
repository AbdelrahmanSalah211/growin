"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { useAuthStore } from "@/stores/authStore";
import { Course } from "@/interfaces/courses";

interface CartItemProps {
    item: Course;
}

export function CartItem({ item }: CartItemProps) {
    const { token: accessToken } = useAuthStore();
    const { remove } = useCartStore();

    const handleRemove = () => {
        console.log("accessToken:", accessToken);
        console.log("item.id:", item.id);
        if (accessToken) {
            remove(item.id, accessToken);
        }
    };

    return (
        <div className="flex gap-4 items-center p-4 border-b">
            {/* Course Cover */}
            <div className="relative w-20 h-16 rounded overflow-hidden bg-gray-100">
                <Image
                    src={item.courseCover}
                    alt={item.title || "Course cover"}
                    fill
                    className="object-cover"
                />
            </div>

            {/* Course Info */}
            <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold truncate">{item.title}</h4>
                <p className="text-xs text-gray-500 truncate">
                    by {item.instructor?.username}
                </p>
                <p className="text-sm font-medium mt-1">
                    ${parseFloat(item.price as string).toFixed(2)}
                </p>
            </div>

            {/* Remove Button */}
            <button
                onClick={handleRemove}
                className="p-1 text-gray-500 hover:text-red-600 transition"
                aria-label="Remove course from cart"
            >
                <X size={16} />
            </button>
        </div>
    );
}

"use client";

import { useHydrateCart } from "@/hooks/useHydrateCart";
import { useCartStore } from "@/stores/cartStore";
import { useAuthStore } from "@/stores/authStore";
import { CartItem } from "../../../components/cartItem";
import Link from "next/link";
import EmptyCart from "@/components/emptyCart";

interface CartPageProps {
    onClose: () => void;
}

export default function CartPage({ onClose }: CartPageProps) {
    const accessToken = useAuthStore((state) => state.token) || "";
    useHydrateCart(accessToken);

    const { cart: items, clear } = useCartStore();
    console.log("Cart items:", items);

    // Calculate prices
    const subtotal = items.reduce(
        (acc, item) =>
            acc + parseFloat((item.price as unknown as string) || "0"),
        0
    );

    const taxRate = 0.1; // 10%
    const tax = subtotal * taxRate;
    const total = subtotal + tax;
    const itemCount = items.length;

    const handleClearCart = () => {
        if (accessToken) clear(accessToken);
    };

    return (
        <div className=" bg-background overflow-y-auto">
            {/* Header */}
            <div className="w-full bg-background py-6 text-center text-xl">
                <div className="container mx-auto px-4">
                    <h1 className="text-3xl font-bold text-gray-800">
                        Shopping Cart
                    </h1>
                </div>
            </div>

            {/* Courses count */}
            <div className="container mx-auto px-4 py-6 text-center">
                <h2 className="text-xl font-medium text-secondary-text font-sans">
                    {itemCount} Course{itemCount !== 1 ? "s" : ""} in Cart
                </h2>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 pb-8">
                <div className="flex flex-col lg:flex-row gap-8 justify-center">
                    {/* Cart Items Section */}
                    <div className="lg:w-2/3 max-w-4xl">
                        {items.length > 0 && (
                            <div className="flex justify-center items-center mb-6">
                                <button
                                    onClick={handleClearCart}
                                    className="text-error hover:text-red-800 text-sm font-medium font-sans"
                                >
                                    Clear All
                                </button>
                            </div>
                        )}

                        {items.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-12 text-center">
                                <EmptyCart />
                                <h3 className="text-xl font-medium text-primary-text mb-2 font-heading">
                                    Your cart is empty. Keep browsing to find a
                                    course!
                                </h3>
                                <Link
                                    href="/courses"
                                    className="mt-6 px-8 py-3 bg-primary text-white rounded-lg hover:bg-accent transition-colors font-medium font-sans shadow-md"
                                    onClick={onClose}
                                >
                                    Keep browsing
                                </Link>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {items.map((item, index) => (
                                    <CartItem
                                        key={`${item.id}-${index}`}
                                        item={item}
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Order Summary Section - Always visible but sticky on larger screens */}
                    {items.length > 0 && (
                        <div className="lg:w-1/3 max-w-md mx-auto lg:mx-0">
                            <div className="lg:sticky lg:top-24">
                                <div className="border border-border rounded-lg p-6 bg-surface shadow-md">
                                    <h3 className="text-lg font-semibold mb-4 text-primary-text font-heading text-center">
                                        Order Summary
                                    </h3>

                                    <div className="space-y-3">
                                        <div className="flex justify-between">
                                            <span className="text-secondary-text font-sans">
                                                Subtotal ({itemCount} items)
                                            </span>
                                            <span className="text-primary-text font-sans">
                                                ${subtotal.toFixed(2)}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-secondary-text font-sans">
                                                Tax
                                            </span>
                                            <span className="text-primary-text font-sans">
                                                ${tax.toFixed(2)}
                                            </span>
                                        </div>
                                        <div className="border-t border-border pt-3 mt-2">
                                            <div className="flex justify-between font-semibold text-lg">
                                                <span className="text-primary-text font-heading">
                                                    Total
                                                </span>
                                                <span className="text-primary-text font-heading">
                                                    ${total.toFixed(2)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <button className="w-full mt-6 bg-primary text-white py-3 rounded-lg hover:bg-accent transition-colors font-medium font-sans shadow-md">
                                        Proceed to Checkout
                                    </button>

                                    <p className="text-xs text-secondary-text mt-4 text-center font-sans">
                                        By completing your purchase, you agree
                                        to our Terms of Service
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

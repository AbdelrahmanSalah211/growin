// src/hooks/useHydrateCart.ts
import { useEffect } from "react";
import { useCartStore } from "@/stores/cartStore";

export function useHydrateCart(accessToken: string | null | undefined) {
    const fetchCart = useCartStore((state) => state.fetchCart);

    useEffect(() => {
        if (accessToken) {
            fetchCart(accessToken);
        }
    }, [accessToken, fetchCart]);
}

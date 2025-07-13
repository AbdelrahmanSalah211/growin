import { create } from "zustand";
import {
    addCourseToCart,
    getCart,
    removeCourseFromCart,
    clearCart,
} from "@/services/cartService";
import { Course } from "@/interfaces/courses";

interface CartState {
    cart: Course[];
    loading: boolean;
    fetchCart: (accessToken: string) => Promise<void>;
    add: (course: Course, accessToken: string) => Promise<void>;
    remove: (courseId: number, accessToken: string) => Promise<void>;
    clear: (accessToken: string) => Promise<void>;
}

export const useCartStore = create<CartState>((set, get) => ({
    cart: [],
    loading: false,

    fetchCart: async (accessToken) => {
        set({ loading: true });
        try {
            const data = await getCart(accessToken);

            // Normalize cart if backend returns different shape
            const normalized = data.map((item: any) => ({
                ...item,
                id: item.courseId ?? item.id,
                price:
                    typeof item.price === "string"
                        ? parseFloat(item.price)
                        : item.price,
            }));

            set({ cart: normalized });
        } catch (err) {
            console.error("Failed to fetch cart:", err);
        } finally {
            set({ loading: false });
        }
    },

    add: async (course, accessToken) => {
        await addCourseToCart({ courseId: course.id }, accessToken);
        set({ cart: [...get().cart, course] });
    },

    remove: async (courseId, accessToken) => {
        await removeCourseFromCart(courseId, accessToken);
        set({ cart: get().cart.filter((c) => c.id !== courseId) });
    },

    clear: async (accessToken) => {
        await clearCart(accessToken);
        set({ cart: [] });
    },
}));
